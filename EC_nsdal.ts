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
    withSublist<T>(listname: string, propNames: Array<string>): nsdal.Sublist & T

    /**
     * Saves this object to netsuite via nlapiSubmitRecord()
     * @param doSourcing see nlapiSubmitRecord
     * @param  ignoreMandatoryFields see nlapiSubmitRecord
     * @returns internal id of the newly created record
     */
    save(doSourcing?: boolean, ignoreMandatoryFields?: boolean): Number
}

namespace nsdal {

    /**
     * Represents a NetSuite sublist object.
     */
    export interface Sublist {
        /**
         * Adds a new empty line to the sublist
         * @returns the newly added line item object
         */
        addLine(): any

        /**
         * calls record.commitLineItem() for this sublist. When adding new lines you don't need to call this method
         */
        commitLine(): void
    }


    // these are functions that nlobjRecord defines which we want to expose on this object and pass through
    // to the underling nlobjRecord instance.
    export let functionsToPassThru = [
        "getId",
        "getRecordType",
        "getField",
        "getSubList",
        "getMatrixField",
        "getLineItemField",
        "getLineItemMatrixField",
        "getLineItemMatrixValue",
        "setFieldValue",
        "setFieldValues",
        "getFieldValue",
        "getFieldValues",
        "setFieldText",
        "setFieldTexts",
        "getFieldText",
        "getFieldTexts",
        "getMatrixValue",
        "setMatrixValue",
        "getAllFields",
        "getAllLineItemFields",
        "setLineItemValue",
        "getLineItemValue",
        "getLineItemText",
        "setCurrentLineItemValue",
        "getCurrentLineItemValue",
        "getCurrentLineItemText",
        "setCurrentLineItemMatrixValue",
        "getCurrentLineItemMatrixValue",
        "getMatrixCount",
        "getLineItemCount",
        "findLineItemValue",
        "findLineItemMatrixValue",
        "insertLineItem",
        "removeLineItem",
        "selectNewLineItem",
        "selectLineItem",
        "viewLineItemSubrecord",
        "viewCurrentLineItemSubrecord",
        "createCurrentLineItemSubrecord",
        "editCurrentLineItemSubrecord",
        "removeCurrentLineItemSubrecord",
        "createSubrecord",
        "editSubrecord",
        "viewSubrecord",
        "removeSubrecord",
        "commitLineItem"]

    let log = LogManager.getLogger('nsdal')

    /**
     * Generic property descriptor with algorithm for date handling. Surfaces dates as moment() instances
     * @param {string} fieldType the NS field type (e.g. 'date')
     * @param getter function for getting values
     * @param setter function for setting values
     * @returns {{get: Function, set: Function, enumerable: boolean}} an object property descriptor to be used
     * with Object.defineProperty
     */
    function dateTimeDescriptor(fieldType, getter, setter) {
        return {
            get: function () {
                let value = getter()
                // ensure we don't return moments for null, undefined, etc.
                return value ? moment(nlapiStringToDate(value, fieldType)) : value
            },
            set: function (value) {
                // allow null to flow through, but ignore undefined's
                if (value !== undefined)
                    setter(value ? nlapiDateToString(moment(value).toDate(), fieldType) : null)
            },
            enumerable: true //default is false
        }
    }

    /**
     * Generic property descriptor with algorithm for multiselect lists. Surfaces the multiselect as a native javascript
     * array with internalids of the values as the element values of the array.
     * @param getter function for getting values
     * @param setter function for setting values
     * @returns {{get: Function, set: Function, enumerable: boolean}} an object property descriptor to be used
     * with Object.defineProperty
     */
    function multiSelectDescriptor(getter, setter) {
        return {
            get: function () {
                let values = getter()
                // Server side values will be null if nothing is selected
                return values ? values : []
            },
            set: function (value) {
                // ignore undefined's
                if (value !== undefined) setter(value)
            },
            enumerable: true // default is false - this lets you JSON.stringify() this prop
        }
    }

    /**
     * Generic property descriptor with algorithm NS checkbox to native boolean.
     * @param getter function for getting values
     * @param setter function for setting values
     * @returns {{get: Function, set: Function, enumerable: boolean}} an object property descriptor to be used
     * with Object.defineProperty
     */
    function checkboxDescriptor(getter, setter) {
        return {
            get: function () {
                return getter() === 'T'
            },
            set: function (value) {
                // allow null to flow through, but ignore undefined's
                if (value !== undefined) setter(value === true ? 'T' : 'F')
            },
            enumerable: true // default is false - this lets you JSON.stringify() this prop
        }
    }

    /**
     * Generic property descriptor with basic default algorithm that exposes the field value directly with no
     * other processing.
     * @param getter function for getting values
     * @param setter function for setting values
     * @returns {{get: Function, set: Function, enumerable: boolean}} an object property descriptor to be used
     * with Object.defineProperty
     */
    function defaultDescriptor(getter, setter) {
        return {
            // get: getter,
            get: function () {
                return getter()
            },
            set: function (value) {

                // ignore undefined's
                if (value !== undefined) setter(value)
            },
            enumerable: true //default is false
        }
    }

    /**
     * Returns an object derived from the nlobjRecord that allows simple property access for the body fields of an nlobjRecord
     *
     * e.g. to add a the comments and title properties for a contact record:
     * let contact = addProperties( mycontactobject, ['comments','title'] )
     * @param theRecord - the object to add properties to, generally just pass the result from something like nlapiGetNewRecord()
     * @param propNames - one or more strings of the body field names that will appear as properties on the object
     * @return {Object} new object with read/write properties for each field name.
     */
    function addFieldProperties(/*nlobjRecord*/ theRecord, /*Array*/ propNames) {
        // create a new object - for some reason the object returned from nlapiGetNewRecord() doesn't behave like an ECMAScript5 object
        // for instance, we can't call Object.create(theRecord) and expect theRecord set as the prototype. I suspect inheritance doesn't really
        // work with NetSuite's javascript, at least for their SuiteScript native objects.
        let obj = Object.create({})

        /**
         * Generic handler for dates since all dates are handled the same way by nsdal - only the type names change
         * @param {string} fieldType type of date field
         * @param {string} fieldname name of the field to create a date descriptor for
         * @returns {{get, set, enumerable}|*}
         */
        function dateHandler(fieldType, fieldname) {
            return dateTimeDescriptor(fieldType,
                theRecord.getFieldValue.bind(theRecord, fieldname),
                theRecord.setFieldValue.bind(theRecord, fieldname)
            )
        }

        // instances of field descriptors with the logic for handling body fields get/set values
        const bodyFieldDescriptors = {

            date: dateHandler.bind(theRecord, "date"),
            datetime: dateHandler.bind(theRecord, "datetime"),
            datetimetz: dateHandler.bind(theRecord, "datetimetz"),
            multiselect: function (fieldname) {
                return multiSelectDescriptor(
                    theRecord.getFieldValues.bind(theRecord, fieldname),
                    theRecord.setFieldValues.bind(theRecord, fieldname)
                )
            },
            checkbox: function (fieldname) {
                return checkboxDescriptor(
                    theRecord.getFieldValue.bind(theRecord, fieldname),
                    theRecord.setFieldValue.bind(theRecord, fieldname)
                )
            },
            defaultDesc: function (fieldname) {
                return defaultDescriptor(
                    theRecord.getFieldValue.bind(theRecord, fieldname),
                    theRecord.setFieldValue.bind(theRecord, fieldname)
                )
            }
        }

        // using standard property descriptors, define logic for each (body) field on the record.
        propNames.forEach(function (name) {
            try {
                let field

                // getField isn't supported in client scripts, so degrade gracefully to just the default descriptor
                if (!EC.isClientScript) {
                    // if getField doesn't return anything (some NS records seem to have this bug) then default rather
                    // than error out
                    field = theRecord.getField(name)
                }
                let fieldType = field ? field.type : "defaultDesc"
                let descriptor = (bodyFieldDescriptors[fieldType] || bodyFieldDescriptors["defaultDesc"])(name)
                Object.defineProperty(obj, name, descriptor)

            } catch (e) {
                // include the field name we were working with to aid diagnosing the error
                if (e.constructor === TypeError) {
                    log.error("addFieldProperties() error", "possibly invalid field name: '" + name + "'")
                }
                throw e
            }
        })

        // preserve the original non-javascript record reference,
        // as it doesn't behave quite like a native javascript object
        log.debug('adding [nlobjRecord] property to nsdal object')
        Object.defineProperty(obj, 'nlobjRecord',
            {
                value: theRecord,
                enumerable: false,
                writable: false,
                configurable: false
            })
        obj.save = save
        obj.withSublist = withSublist
        return obj
    }

    /**
     * Saves this object to netsuite via nlapiSubmitRecord()
     * @param doSourcing see nlapiSubmitRecord
     * @param  ignoreMandatoryFields see nlapiSubmitRecord
     * @returns internal id of the newly created record
     */
    function save(doSourcing?: boolean, ignoreMandatoryFields?: boolean) {
        // netsuite expects only the base type (nlobjRecord) to be passed to SubmitRecord()
        log.info('saving record', 'doSourcing:' + doSourcing + ' ignoreMandatoryFields:' + ignoreMandatoryFields)
        return nlapiSubmitRecord(this.nlobjRecord, doSourcing, ignoreMandatoryFields)
    }

    /**
     * Creates a new netsuite record via nlapiCreateRecord() with the passed fields exposed as properties on the returned object.
     * @param typeName type of netsuite record to create
     * @param propNames string array of record field names to include as properties on the object
     * @param dynamic if true, creates the record in 'dynamic' mode
     * @returns {Object} a friendlier nlobjRecord.
     */
    export function createObject<T>(typeName: string, propNames: Array<string>, dynamic = false): T & NSDALObject {
        let rec = dynamic ? nlapiCreateRecord(typeName, {recordmode: 'dynamic'}) : nlapiCreateRecord(typeName)
        return this.fromRecord(rec, propNames)
    }

    /**
     * Loads a given record  via nlapiLoadRecord() and makes properties available.
     * @param  recordType the type of record you want to load
     * @param  id unique identifier for the record
     * @param  propNames string array of record field names to include as properties on the object
     * @returns {Object} a friendlier nlobjRecord
     */
    export function loadObject<T>(recordType: string, id: string, propNames: Array<string>): T & NSDALObject {
        return this.fromRecord(nlapiLoadRecord(recordType, id), propNames)
    }

    /**
     * Wraps an existing netsuite record to expose properties. The record may have been obtained (for example) via an nlapiGetNewRecord()
     * call in a UserEvent script.
     *
     * @param  theRecord existing netsuite record to wrap in the ActiveRecord pattern
     * @param  propNames propNames string array of record field names to include as properties on the object
     * @returns {Object} a friendlier nlobjRecord
     */
    export function fromRecord<T>(theRecord: nlobjRecord, propNames: Array<string>): T & NSDALObject {
        let obj = addFieldProperties(theRecord, propNames)

        // pass through calls to nlobjRecord when invoked on this object
        _.each(functionsToPassThru, function (name) {
            let func = theRecord[name]
            if (func) // some methods aren't supported clientside
                obj[name] = func.bind(theRecord)
        })
        log.info('nsdal object loaded or created successfully')
        return obj
    }

    /**
     * provides array-like behavior for manipulating sublists (line items)
     * @param  listname the type of sublist. e.g. "addressbook"
     * @param  propNames field names you want to access from the sublist
     */
    export function withSublist<T>(listname: string, propNames: Array<string>): Sublist & T {

        // how big does our array representing the sublist need to be?
        let numLines = parseInt(this.getLineItemCount(listname))

        // add the parent array property named after the list (e.g. customer.addressbook)
        // not writable so the user can't reassign it to an object that doesn't understand netsuite
        Object.defineProperty(this, listname, {value: [], writable: false, enumerable: true})
        let list = this[listname]
        list.parent = this
        /** adds a new line item to the existing sublist list
         * @param {Number} linenum
         * @param {nsdal} recordObj
         * */
        list.addNewLineItem = function (linenum, recordObj) {
            // date handler leaves the line number field to be locked down at runtime.
            function dateHandler(fieldType, listname, fieldname, linenum) {
                return dateTimeDescriptor(fieldType,
                    this.getLineItemValue.bind(this, listname, fieldname, linenum),
                    this.setLineItemValue.bind(this, listname, fieldname, linenum)
                )
            }

            // instances of field descriptors with the logic for sublist field getter/setters for
            // sublist fields
            let sublistFieldDescriptors = {

                date: dateHandler.bind(recordObj, "date"),
                datetime: dateHandler.bind(recordObj, "datetime"),
                datetimetz: dateHandler.bind(recordObj, "datetimetz"),
                multiselect: function (listname, fieldname, line) {
                    return multiSelectDescriptor(
                        recordObj.getLineItemValues.bind(recordObj, fieldname, line),
                        recordObj.setLineItemValues.bind(recordObj, fieldname, line)
                    )
                },
                checkbox: function (listname, fieldname, line) {
                    return checkboxDescriptor(
                        recordObj.getLineItemValue.bind(recordObj, listname, fieldname, line),
                        recordObj.setLineItemValue.bind(recordObj, listname, fieldname, line)
                    )
                },
                defaultDesc: function (listname, fieldname, linenum) {
                    return defaultDescriptor(
                        recordObj.getLineItemValue.bind(recordObj, listname, fieldname, linenum),
                        recordObj.setLineItemValue.bind(recordObj, listname, fieldname, linenum)
                    )
                }
            }

            let newItem = Object.create({})

            propNames.forEach(function (name) {
                let fieldObj
                if (!EC.isClientScript) { // SSS_NOT_YET_SUPPORTED in client script
                    fieldObj = recordObj.getLineItemField(listname, name)
                }
                let fieldType = fieldObj ? fieldObj.type : "unknown"
                let descriptor = (sublistFieldDescriptors[fieldType] ||
                sublistFieldDescriptors["defaultDesc"])(listname, name, linenum)
                Object.defineProperty(newItem, name, descriptor)
            })

            this.push(newItem)
            return newItem
        }

        // add an object representing each existing line in the sublist
        for (let i = 1; i <= numLines; i++) {
            list.addNewLineItem(i, this)
        }

        /**
         * Adds a new empty line to the sublist
         * @returns the newly added line item object
         */
        list.addLine = function () {

            let currentLineCount = this.parent.getLineItemCount(listname)
            let insertLinePosition = parseInt(currentLineCount) + 1
            log.debug("Inserting Line Item", "sublist: '" + listname + "' line: " + insertLinePosition)

            this.parent.insertLineItem(listname, insertLinePosition)
            log.debug("Line count after adding:" + this.parent.getLineItemCount(listname))

            return this.addNewLineItem(insertLinePosition, this.parent)
        }
        /**
         * calls record.commitLineItem() for this sublist. When adding new lines you don't need to call this method
         */
        list.commitLine = function () {
            log.debug("Committing line on list '" + listname + "'")
            this.parent.commitLineItem(listname)
        }
        return this // for chaining
    }

}