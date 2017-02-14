///<reference path="Logging.d.ts"/>

/**
 * NetSuite Search utilities here.
 *
 * @description Contains a lazy search implementation based on lazyjs.
 *
 *
 * Dependencies: Lazy.js, Logging.js
 */

///<reference path="node_modules/@types/lazy.js/index.d.ts"/>
///<reference path="EC_SharedLibrary_Common.d.ts"/>

/**
 * main namespace for lazy search functionality. Access the lazy search features (and the lazy specific logger)
 * through this namespace object.
 */
declare namespace lazy {
    /**
     * the native netsuite nlobjSearch object.
     */
    type nlobjSearch = Object

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
    type SearchFilterExpression = Array<any> | string

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
     * Makes a lazy search using "filter expression" syntax and parallel custom syntax for column "expressions"
     * @param  recordType netsuite record type to search (e.g. "transaction")
     * @param  filters filter expression or array of nlobjSearchFilters
     * @param  columns array of column expressions
     * Each column specification is [ <columnname>,<label>,<join>,<summary>]. columnname is required, the rest are optional.
     *
     * @example Creating a search matching on firstname, returning firstname and lastname columns
     * var search = EC.createSearch("customer",[['firstname','is','joe']], [["firstname"],["lastname"]]);
     */
    function createSearch(recordType:string, filters:Array<SearchFilterExpression>, columns:Array<Array<string>>)

    /**
     * Makes a lazy search using an existing saved search
     * @param recordType netsuite record type to search (e.g. "transaction")
     * @param id internal id of the saved search
     */
    function loadSearch(recordType:string, id:string | number):SearchResultSequence<Object>

    /**
     * Makes a lazy search based on an existing search object, enabling lazy paging through results.
     * @param searchObj netsuite search object, previously created perhaps
     * with nlapiCreateSearch
     */
    function fromSearch(searchObj:nlobjSearch):SearchResultSequence<Object>

    /**
     * Attempts to get a preliminary count of total records for the given search criteria. If you really need a
     * record count for a lazy search but don't want to load ALL the records of the search (not lazy!) execute this
     * method with the same filter set you use with EC.createSearch().
     * @param  recordtype the type of record you are searching e.g. 'itemfulfillment'
     * @param  filters query (filter expression or array of filter objs) you want to perform a count on
     */
    function getTotalRecordCount(recordtype:string, filters:Array<SearchFilterExpression>):number|Array<Object>

    /**
     * Custom logger named 'lazysearch' for this component
     */
    let log:LogManager.Logger
}