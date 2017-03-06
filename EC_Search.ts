/**
 * NetSuite Search utilities here.
 *
 * @description Contains a lazy search implementation based on lazyjs.
 *
 *
 * Dependencies: Lazy.js, Logging.js
 */

///<reference types="Lazy.js"/>
///<reference path="nlapi.d.ts"/>



// placeholder since the @types/lazy.js is for the old 0.3.2 version
// declare interface  Lazy {
//     (a?:any):any
//     Sequence : {
//         prototype:any
//         define:any
//     }
// }
// declare const Lazy:Lazy


/**
 * Custom LazyJS sequence that handles forward iteration through NetSuite search results
 */
interface SearchResultSequence<T> extends LazyJS.SequenceBase<T> {
    /**
     * converts netsuite search result sequence to simple javascript objects with property names taken from
     * the column label else column name. For joined columns, property name is "joinnamecolumnname" (join and
     * column concatenated) if no label was specified.
     * @param getText if true include xxxxText properties on the objects based on NetSuite result.getText()
     * @param useLabels set true to use custom column labels as property names by default. Otherwise uses
     * column internal id names to form the output object properties.
     * @returns javascript objects representing the search results
     */
    nsSearchResult2obj(getText?:string, useLabels?:boolean) : SearchResultSequence<T>
}

/**
 * Lazy.js calls console.warn() in some circumstances. This provides an implementation.
 */
if (!console) {
    var c  = {
        //noinspection JSUnusedGlobalSymbols
        warn: function (m) {
            log.error(m)
        }
    }
    var console = <Console>c
}


/**
 * main namespace for lazy search functionality. Access the lazy search features (and the lazy specific logger)
 * through this namespace object.
 */
namespace lazy {
    /**
     * NetSuite search filter expression.
     * A search filter expression is an array of strings of the form
     * [ fieldname, operator, value, join?, summary? ]
     *
     * or an array of nlobjSearchFilter objects
     *
     * @example
     *
     * [ 'firstname', 'contains', 'joe' ]
     */
    export type SearchFilterExpression = Array<any>


    // logger just for the lazysearch component
    export var log = LogManager.getLogger('lazy')

    /**
     * Utility to provides a useful output if you try to JSON.stringify() a NetSuite Lazy search object directly.
     * This exists to override the default JSON.stringify() behavior which seems to explode when run in NS against a
     * standard lazy search object (probably when trying to serialize the nlobjSearch which is on this.search)
     * Note this must be called with 'this' set to a nlobjSearch object
     */
    var toJSON = function () {
        return {
            recordType: this.getSearchType(),
            filters: this.getFilterExpression()
        }
    }

    /**
     * Makes a new search using "filter expression" syntax and parallel custom syntax for column "expressions"
     * @param {String} recordtype netsuite record type to search (e.g. "transaction")
     * @param {Array} filters filter expression or array of nlobjSearchFilters
     * @param {Array} columns array of column expressions
     * Each column specification is [ <columnname>,<label>,<join>,<summary>]. columnname is required, the rest are optional.
     * @returns {nlobjSearch} the newly created nlobjSearch object
     *
     * @example Creating a search matching on firstname, returning firstname and lastname columns
     * var search = mkSearch("customer",[['firstname','is','joe']], [["firstname"],["lastname"]])
     */
    export function mkSearch(recordtype, filters:SearchFilterExpression, columns) {

        // columns are specified as fixed position string expressions much like filter expressions with the array indexes below
        var NAME = 0, LABEL = 1, JOIN = 2, SUMMARY = 3
        var cols = _.map(columns, function (c) {
            // use column name if specified, else assume the "label" is the internal name of the column
            var tmp = new nlobjSearchColumn(c[NAME] || c[LABEL], c[JOIN], c[SUMMARY])
            tmp.setLabel(c[LABEL] || c[NAME])
            return tmp
        })
        return nlapiCreateSearch(recordtype, filters, cols)
    }


    /**
     * Iterator for Lazy.js for netsuite searching
     * @param sequence the sequence we're iterating
     * @constructor
     */
    function SearchIterator(sequence) {
        // current page of results
        this.search = sequence.search
        this.slice = []
        this.currentPage = 0
        this.currentIndex = 0
        this.isLastPage = false
        this.sliceSize = 1000
    }

    SearchIterator.prototype.moveNext = function () {
        var lastIndex = this.slice.length - 1
        if (this.isLastPage && this.currentIndex >= lastIndex) {
            log.debug("on last page, current index:" + this.currentIndex + " >= lastIndex:" + lastIndex)
            return false
        }
        else if (this.currentIndex < lastIndex) {
            this.currentIndex += 1
            return true
        }
        else {
            var newStartIndex = (this.sliceSize * this.currentPage)
            log.debug("loading results from " + newStartIndex + " to " + (newStartIndex + this.sliceSize))
            // if no results are found, NS returns null. Surface that as an empty sequence.
            this.slice = this.search.getResults(newStartIndex, newStartIndex + this.sliceSize) || []
            var sliceLength = this.slice.length
            this.isLastPage = sliceLength < this.sliceSize
            this.currentPage += 1
            this.currentIndex = 0
            return sliceLength > 0 // can't movenext on an empty collection!
        }
    }
    //noinspection JSUnusedGlobalSymbols
    SearchIterator.prototype.current = function () {
        return this.slice[this.currentIndex]
    }


    /**
     * creates a sequence backed by a netsuite ad-hoc search.
     * @example Searches transations by date, returning internal id and amount columns
     *  var s = Lazy().createSearch("transaction", [
     *          ["datecreated", "after", "12/01/2001"]
     *      ], [
     *          ["internalid"],
     *          ["amount"]
     *  ])
     */
    Lazy.Sequence.define(["createSearch"], {

        // defines a new NS search. The init function should not be an expensive call, but we have to
        // run the search before we can iterate.
        init: function (recordType, filters, columns) {
            var s = mkSearch(recordType, filters, columns)
            this.toJSON = toJSON.bind(s)
            this.search = s.runSearch()
        },
        // iterates over results
        getIterator: function () {
            return new SearchIterator(this)
        }
    })

    /**
     * creates a sequence backed by a netsuite saved search
     * @example Run search internalid 1234
     *  var s = Lazy().loadSearch("transaction", "1234")
     */
    Lazy.Sequence.define(["loadSearch"], {

        // defines a new NS search. The init function should not be an expensive call, but we have to
        // run the search before we can iterate.
        init: function (recordType, id) {
            var s = nlapiLoadSearch(recordType, id)
            this.toJSON = toJSON.bind(s)
            this.search = s.runSearch()
        },
        // iterates over results
        getIterator: function () {
            return new SearchIterator(this)
        }
    })

    /**
     * creates a sequence backed by previously loaded or created search object
     * @example Run search internalid 1234
     *  var s = Lazy().loadSearch("1234")
     */
    Lazy.Sequence.define(["fromSearch"], {

        // accepts a NS search.
        init: function (searchObj) {
            this.toJSON = toJSON.bind(searchObj)
            this.search = searchObj.runSearch()
        },
        // iterates over results
        getIterator: function () {
            return new SearchIterator(this)
        }
    })

    Lazy.Sequence.prototype.nsSearchResult2obj = function (getText, useLabels) {

        if (!this.search)
            throw new Error("this method must be applied to a sequence of NetSuite search results")
        var columns = this.search.getColumns()
        return this.map(function (r) {
            return Lazy(columns).reduce(function (acc, column) {
                // use column custom label only if specified, otherwise fall back to <join>internalid naming convention
                var thefield = (useLabels && column.getLabel()) ||
                    (column.getJoin() ? column.getJoin() + column.getName() : column.getName())
                acc[thefield] = r.getValue(column)
                if (getText === true) acc[thefield + "Text"] = r.getText(column)
                return acc
            }, {id: r.getId()}) // always include an 'id' field for row internal id
        })
    }

    export function createSearch (recordType, filters, columns) {
        return Lazy().createSearch(recordType, filters, columns)
    }

    export function loadSearch (recordType, id) {
        return Lazy().loadSearch(recordType, id)
    }

    export function fromSearch (searchObj) {
        return Lazy().fromSearch(searchObj)
    }

    export function getTotalRecordCount (recordtype, filters) {
        var countColumn = new nlobjSearchColumn('formulanumeric', null, 'sum').setFormula('1')
        var results = nlapiSearchRecord(recordtype, null, filters, countColumn)

        if (results && results.length === 1)
            return parseInt(results[0].getValue(countColumn) || '0')
        else {
            log.error('getTotalRecordCount()', 'failed to determine the number of records in the result set')
            return results
        }
    }
}