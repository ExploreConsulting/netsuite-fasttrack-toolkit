/**
 * Copyright Explore Consulting, LLC
 */
/**
 * ActiveRecord object. Supports direct property access for NS fields and has a save() method to persist changes.
 */
interface NSDALObject extends nlobjRecord {
    /**
     * provides array-like behavior for manipulating sublists (line items)
     * @param  listname the type of sublist. e.g. "addressbook"
     * @param  propNames field names you want to access from the sublist
     */
    withSublist<T>(listname: string, propNames: Array<keyof T>): nsdal.Sublist & T;
    /**
     * Saves this object to netsuite via nlapiSubmitRecord()
     * @param doSourcing see nlapiSubmitRecord
     * @param  ignoreMandatoryFields see nlapiSubmitRecord
     * @returns internal id of the newly created record
     */
    save(doSourcing?: boolean, ignoreMandatoryFields?: boolean): Number;
}
declare namespace nsdal {
    /**
     * Represents a NetSuite sublist object.
     */
    interface Sublist {
        /**
         * Adds a new empty line to the sublist
         * @returns the newly added line item object
         */
        addLine(): any;
        /**
         * calls record.commitLineItem() for this sublist. When adding new lines you don't need to call this method
         */
        commitLine(): void;
    }
    let functionsToPassThru: string[];
    /**
     * Creates a new netsuite record via nlapiCreateRecord() with the passed fields exposed as properties on the returned object.
     * @param typeName type of netsuite record to create
     * @param propNames string array of record field names to include as properties on the object
     * @param dynamic if true, creates the record in 'dynamic' mode
     * @returns {Object} a friendlier nlobjRecord.
     */
    function createObject<T>(typeName: string, propNames: Array<keyof T>, dynamic?: boolean): T & NSDALObject;
    /**
     * Loads a given record  via nlapiLoadRecord() and makes properties available.
     * @param  recordType the type of record you want to load
     * @param  id unique identifier for the record
     * @param  propNames string array of record field names to include as properties on the object
     * @returns {Object} a friendlier nlobjRecord
     */
    function loadObject<T>(recordType: string, id: string, propNames: Array<keyof T>): T & NSDALObject;
    /**
     * Wraps an existing netsuite record to expose properties. The record may have been obtained (for example) via an nlapiGetNewRecord()
     * call in a UserEvent script.
     *
     * @param  theRecord existing netsuite record to wrap in the ActiveRecord pattern
     * @param  propNames propNames string array of record field names to include as properties on the object
     * @returns {Object} a friendlier nlobjRecord
     */
    function fromRecord<T>(theRecord: nlobjRecord, propNames: Array<keyof T>): T & NSDALObject;
    /**
     * provides array-like behavior for manipulating sublists (line items)
     * @param  listname the type of sublist. e.g. "addressbook"
     * @param  propNames field names you want to access from the sublist
     */
    function withSublist<T>(listname: string, propNames: Array<keyof T>): Sublist & T;
}
