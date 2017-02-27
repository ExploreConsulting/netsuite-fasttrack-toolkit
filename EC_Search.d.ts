/// <reference path="nlapi.d.ts" />
/**
 * NetSuite Search utilities here.
 *
 * @description Contains a lazy search implementation based on lazyjs.
 *
 *
 * Dependencies: Lazy.js, Logging.js
 */
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
    nsSearchResult2obj(getText?: string, useLabels?: boolean): SearchResultSequence<T>;
}
/**
 * main namespace for lazy search functionality. Access the lazy search features (and the lazy specific logger)
 * through this namespace object.
 */
declare namespace lazy {
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
    type SearchFilterExpression = Array<any>;
    var log: LogManager.Logger;
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
    function mkSearch(recordtype: any, filters: SearchFilterExpression, columns: any): nlobjSearch;
    function createSearch(recordType: any, filters: any, columns: any): any;
    function loadSearch(recordType: any, id: any): any;
    function fromSearch(searchObj: any): any;
    function getTotalRecordCount(recordtype: any, filters: any): number | nlobjSearchResult[];
}
