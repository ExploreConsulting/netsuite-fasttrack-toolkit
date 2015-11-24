/**
 * Created by shawn on 10/3/15.
 */

///<reference path="nlapi.d.ts"/>


/**
 * ActiveRecord object. Supports direct property access for NS fields and has a save() method to persist changes.
 */
interface NSDALObject extends nlobjRecord {

    /**
     * provides array-like behavior for manipulating sublists (line items)
     * @param  listname the type of sublist. e.g. "addressbook"
     * @param  propNames field names you want to access from the sublist
     */
    withSublist<T>(listname:string, propNames:Array<string>) : Sublist & T

    /**
     * Saves this object to netsuite via nlapiSubmitRecord()
     * @param doSourcing see nlapiSubmitRecord
     * @param  ignoreMandatoryFields see nlapiSubmitRecord
     * @returns internal id of the newly created record
     */
    save(doSourcing?:boolean, ignoreMandatoryFields?:boolean) : Number
}


/**
 * Represents a NetSuite sublist object.
 */
interface Sublist  {
    /**
     * Adds a new empty line to the sublist
     * @returns the newly added line item object
     */
    addLine():any

    /**
     * calls record.commitLineItem() for this sublist. When adding new lines you don't need to call this method
     */
    commitLine():void
}

/**
 * Provides object-oriented view of some netsuite API interactions
 * nsdal takes a simple ActiveRecord facade approach to netsuite record objects. NetSuite's own object loading and persistence API seems to lend itself
 * most readily to an Active Record pattern.
 * By deriving from nlobjRecord all the original methods and properties are still available on the ActiveRecord object.
 */
declare interface nsdal {

    /**
     * Wraps an existing netsuite record to expose properties. The record may have been obtained (for example) via an nlapiGetNewRecord()
     * call in a UserEvent script.
     *
     * @param  theRecord existing netsuite record to wrap in the ActiveRecord pattern
     * @param  propNames propNames string array of record field names to include as properties on the object
     * @returns {Object} a friendlier nlobjRecord
     */
    fromRecord<T>(theRecord:nlobjRecord, propNames:Array<string>) : T & NSDALObject


    /**
     * Loads a given record  via nlapiLoadRecord() and makes properties available.
     * @param  recordType the type of record you want to load
     * @param  id unique identifier for the record
     * @param  propNames string array of record field names to include as properties on the object
     * @returns {Object} a friendlier nlobjRecord
     */
    loadObject<T>(recordType:string, id:string, propNames:Array<string>) : T & NSDALObject

    /**
     * Creates a new netsuite record via nlapiCreateRecord() with the passed fields exposed as properties on the returned object.
     * @param typeName type of netsuite record to create
     * @param propNames string array of record field names to include as properties on the object
     * @returns {Object} a friendlier nlobjRecord.
     */
    createObject<T>(typeName:string, propNames:Array<string>) : T & NSDALObject

    /**
     * is nsdal being used in a client script? Uses a combination of the execution context and whether
     * nlapiGetNewRecord is defined
     * @type {boolean} true if this is a client script, else false.
     */
    isClientScript:boolean
}

declare var nsdal:nsdal


