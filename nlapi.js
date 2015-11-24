/**
 * @projectDescription 	SuiteScript JavaScript library summary.
 *
 * Note that there are some restrictions on API usage. Also note that the only 2 objects that can be
 * contructed are nlobjSearchFilter and nlobjSearchColumn. All other objects can only be created via
 * top-level function or method calls.
 *
 * The @governance tag refers to the usage governance for an API call
 * The @restricted tag refers to any known restrictions with a particular API call
 *
 * All Object arguments are Javascript Objects used as hash tables for specifying key-value pairs
 *
 * @since 	2005.0 Support scripting of current record in Client SuiteScript
 * @version	2007.0 Support scripting of records in user events, portlets, and scheduled scripts
 * @version	2008.1 Support scripting of web requests (Suitelets) and user interfaces (UI Object API)
 * @version	2009.1 Support scripting of file objects
 * @version	2009.2 Support scripting of setup records and assistant (multi-step) pages
 * @version	2009.2 converted JS template to use eclipse code completion friendly format
 * @version	2010.1 Suppport dynamic scripting
 */



/**
 * Return a new record using values from an existing record.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string} 	type The record type name.
 * @param {int} 	id The internal ID for the record.
 * @param {Object} 	initializeValues Contains an array of name/value pairs of defaults to be used during record initialization.
 * @return {nlobjRecord}  Returns an nlobjRecord object of a copied record.
 *
 * @since	2007.0
 */
function nlapiCopyRecord(type, id, initializeValues) { ; }

/**
 * Load an existing record from the system.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string} 	type The record type name.
 * @param {int} 	id The internal ID for the record.
 * @param {Object} 	initializeValues Contains an array of name/value pairs of defaults to be used during record initialization.
 * @return {nlobjRecord}  Returns an nlobjRecord object of an existing NetSuite record.
 *
 * @exception {SSS_INVALID_RECORD_TYPE}
 * @exception {SSS_TYPE_ARG_REQD}
 * @exception {SSS_INVALID_INTERNAL_ID}
 * @exception {SSS_ID_ARG_REQD}
 *
 * @since	2007.0
 */
function nlapiLoadRecord(type, id, initializeValues) { ; }

/**
 * Instantiate a new nlobjRecord object containing all the default field data for that record type.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string} type record type ID.
 * @param {Object} initializeValues Contains an array of name/value pairs of defaults to be used during record initialization.
 * @return {nlobjRecord}   Returns an nlobjRecord object of a new record from the system.
 *
 * @exception {SSS_INVALID_RECORD_TYPE}
 * @exception {SSS_TYPE_ARG_REQD}
 *
 * @since	2007.0
 */
function nlapiCreateRecord(type, initializeValues) { ; }

/**
 * Submit a record to the system for creation or update.
 * @governance 20 units for transactions, 4 for custom records, 8 for all other records
 *
 * @param {nlobjRecord} record nlobjRecord object containing the data record.
 * @param {boolean} 	[doSourcing] If not set, this argument defaults to false.
 * @param {boolean} 	[ignoreMandatoryFields] Disables mandatory field validation for this submit operation.
 * @return {string} internal ID for committed record.
 *
 * @exception {SSS_INVALID_RECORD_OBJ}
 * @exception {SSS_RECORD_OBJ_REQD}
 * @exception {SSS_INVALID_SOURCE_ARG}
 *
 * @since	2007.0
 */
function nlapiSubmitRecord(record, doSourcing, ignoreMandatoryFields) { ; }

/**
 * Delete a record from the system.
 * @governance 20 units for transactions, 4 for custom records, 8 for all other records
 *
 * @param {string} 	type The record type name.
 * @param {int} 	id The internal ID for the record.
 * @return {void}
 *
 * @exception {SSS_INVALID_RECORD_TYPE}
 * @exception {SSS_TYPE_ARG_REQD}
 * @exception {SSS_INVALID_INTERNAL_ID}
 * @exception {SSS_ID_ARG_REQD}
 *
 * @since	2007.0
 */
function nlapiDeleteRecord(type, id) { ; }

/**
 * Perform a record search using an existing search or filters and columns.
 * @governance 10 units
 * @restriction returns the first 1000 rows in the search
 *
 * @param {string} 		type record type ID.
 * @param {int, string} [id] The internal ID or script ID for the saved search to use for search.
 * @param {nlobjSearchFilter, nlobjSearchFilter[]} [filters] [optional] A single nlobjSearchFilter object - or - an array of nlobjSearchFilter objects.
 * @param {nlobjSearchColumn, nlobjSearchColumn[]} [columns] [optional] A single nlobjSearchColumn object - or - an array of nlobjSearchColumn objects.
 * @return {nlobjSearchResult[]} Returns an array of nlobjSearchResult objects corresponding to the searched records.
 *
 * @exception {SSS_INVALID_RECORD_TYPE}
 * @exception {SSS_TYPE_ARG_REQD}
 * @exception {SSS_INVALID_SRCH_ID}
 * @exception {SSS_INVALID_SRCH_FILTER}
 * @exception {SSS_INVALID_SRCH_FILTER_JOIN}
 * @exception {SSS_INVALID_SRCH_OPERATOR}
 * @exception {SSS_INVALID_SRCH_COL_NAME}
 * @exception {SSS_INVALID_SRCH_COL_JOIN}
 *
 * @since	2007.0
 */
function nlapiSearchRecord(type, id, filters, columns) { ; }

/**
 * Perform a global record search across the system.
 * @governance 10 units
 * @restriction returns the first 1000 rows in the search
 *
 * @param {string} keywords Global search keywords string or expression.
 * @return {nlobjSearchResult[]} Returns an Array of nlobjSearchResult objects containing the following four columns: name, type (as shown in the UI), info1, and info2.
 *
 * @since	2008.1
 */
function nlapiSearchGlobal(keywords) { ; }

/**
 * Perform a duplicate record search using Duplicate Detection criteria.
 * @governance 10 units
 * @restriction returns the first 1000 rows in the search
 *
 * @param {string} 		type The recordType you are checking duplicates for (for example, customer|lead|prospect|partner|vendor|contact).
 * @param {string[]} 	[fields] array of field names used to detect duplicate (for example, companyname|email|name|phone|address1|city|state|zipcode).
 * @param {int} 		[id] internal ID of existing record. Depending on the use case, id may or may not be a required argument.
 * @return {nlobjSearchResult[]} Returns an Array of nlobjSearchResult objects corresponding to the duplicate records.
 *
 * @since	2008.1
 */
function nlapiSearchDuplicate(type, fields, id) { ; }

/**
 * Create a new record using values from an existing record of a different type.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string} 	type The record type name.
 * @param {int} 	id The internal ID for the record.
 * @param {string} 	transformType The recordType you are transforming the existing record into.
 * @param {Object} 	[transformValues] An object containing transform default option/value pairs used to pre-configure transformed record
 * @return {nlobjRecord}
 *
 * @exception {SSS_INVALID_URL_CATEGORY}
 * @exception {SSS_CATEGORY_ARG_REQD}
 * @exception {SSS_INVALID_TASK_ID}
 * @exception {SSS_TASK_ID_REQD}
 * @exception {SSS_INVALID_INTERNAL_ID}
 * @exception {SSS_INVALID_EDITMODE_ARG}
 *
 * @since	2007.0
 */
function nlapiTransformRecord(type, id, transformType, transformValues) { ; }

/**
 * void a transaction based on type and id .
 * @governance 10 units for transactions
 *
 * @param {string} 	type The transaction type name.
 * @param {string} 	id The internal ID for the record.
 * @return {string}  if accounting preference is reversing journal, then it is new journal id,
 *                   otherwise, it is the input record id
 *
 * @since	2014.1
 */
function nlapiVoidTransaction (type, id) { }

/**
 * Fetch the value of one or more fields on a record. This API uses search to look up the fields and is much
 * faster than loading the record in order to get the field.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string} 	type The record type name.
 * @param {int} 	id The internal ID for the record.
 * @param {string, string[]} fields - field or fields to look up.
 * @param {boolean} [text] If set then the display value is returned instead for select fields.
 * @return {string, Object} single value or an Object of field name/value pairs depending on the fields argument.
 *
 * @since	2008.1
 */
function nlapiLookupField(type,id,fields, text) { ; }

/**
 * Submit the values of a field or set of fields for an existing record.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 * @restriction only supported for records and fields where DLE (Direct List Editing) is supported
 *
 * @param {string} 		type The record type name.
 * @param {int} 		id The internal ID for the record.
 * @param {string, string[]} fields field or fields being updated.
 * @param {string, string[]} values field value or field values used for updating.
 * @param {boolean} 	[doSourcing] If not set, this argument defaults to false and field sourcing does not occur.
 * @return {void}
 *
 * @since	2008.1
 */
function nlapiSubmitField(type,id,fields,values,doSourcing) { ; }

/**
 * Attach a single record to another with optional properties.
 * @governance 10 units
 *
 * @param {string} 	type1 The record type name being attached
 * @param {int} 	id1 The internal ID for the record being attached
 * @param {string} 	type2 The record type name being attached to
 * @param {int} 	id2 The internal ID for the record being attached to
 * @param {Object} 	[properties] Object containing name/value pairs used to configure attach operation
 * @return {void}
 *
 * @since	2008.2
 */
function nlapiAttachRecord(type1, id1, type2, id2, properties) { ; }

/**
 * Detach a single record from another with optional properties.
 * @governance 10 units
 *
 * @param {string} 	type1 The record type name being attached
 * @param {int} 	id1 The internal ID for the record being attached
 * @param {string} 	type2 The record type name being attached to
 * @param {int} 	id2 The internal ID for the record being attached to
 * @param {Object} 	[properties] Object containing name/value pairs used to configure detach operation
 * @return {void}
 *
 * @since	2008.2
 */
function nlapiDetachRecord(type1, id1, type2, id2, properties) { ; }


/**
 * Resolve a URL to a resource or object in the system.
 *
 * @param {string} type type specifier for URL: suitelet|tasklink|record|mediaitem
 * @param {string} subtype subtype specifier for URL (corresponding to type): scriptid|taskid|recordtype|mediaid
 * @param {string} [id] internal ID specifier (sub-subtype corresponding to type): deploymentid|n/a|recordid|n/a
 * @param {string} [pagemode] string specifier used to configure page (suitelet: external|internal, tasklink|record: edit|view)
 * @return {string}
 *
 * @since	2007.0
 */
function nlapiResolveURL(type, subtype, id, pagemode) { ; }

/**
 * Redirect the user to a page. Only valid in the UI on Suitelets and User Events. In Client scripts this will initialize the redirect URL used upon submit.
 *
 * @param {string} type type specifier for URL: suitelet|tasklink|record|mediaitem
 * @param {string} subtype subtype specifier for URL (corresponding to type): scriptid|taskid|recordtype|mediaid
 * @param {string} [id] internal ID specifier (sub-subtype corresponding to type): deploymentid|n/a|recordid|n/a
 * @param {string} [pagemode] string specifier used to configure page (suitelet: external|internal, tasklink|record: edit|view)
 * @param {Object} [parameters] Object used to specify additional URL parameters as name/value pairs
 * @return {void}
 *
 * @since	2007.0
 */
function nlapiSetRedirectURL(type, subtype, id, pagemode, parameters) { ; }

/**
 * Request a URL to an external or internal resource.
 * @restriction NetSuite maintains a white list of CAs that are allowed for https requests. Please see the online documentation for the complete list.
 * @governance 10 units
 *
 * @param {string} url 		A fully qualified URL to an HTTP(s) resource
 * @param {string, Object} 	[postdata] - string, document, or Object containing POST payload
 * @param {Object} 			[headers] - Object containing request headers.
 * @param {function} 		[callback] - available on the Client to support asynchronous requests. function is passed an nlobjServerResponse with the results.
 * @return {nlobjServerResponse}
 *
 * @exception {SSS_UNKNOWN_HOST}
 * @exception {SSS_INVALID_HOST_CERT}
 * @exception {SSS_REQUEST_TIME_EXCEEDED}
 *
 * @since	2007.0
 */
function nlapiRequestURL(url, postdata, headers, callback, method) { ; }

/**
 * Return context information about the current user/script.
 *
 * @return {nlobjContext}
 *
 * @since	2007.0
 */
function nlapiGetContext() { ; }

/**
 * Return the internal ID for the currently logged in user. Returns -4 when called from online forms or "Available without Login" Suitelets.
 *
 * @return {int}
 *
 * @since	2005.0
 */
function nlapiGetUser() { ; }

/**
 * Return the internal ID for the current user's role. Returns 31 (Online Form User) when called from online forms or "Available without Login" Suitelets.
 *
 * @return {int}
 *
 * @since	2005.0
 */
function nlapiGetRole() { ; }

/**
 * Return the internal ID for the current user's department.
 *
 * @return {int}
 *
 * @since	2005.0
 */
function nlapiGetDepartment() { ; }

/**
 * Return the internal ID for the current user's location.
 *
 * @return {int}
 *
 * @since	2005.0
 */
function nlapiGetLocation() { ; }

/**
 * Return the internal ID for the current user's subsidiary.
 *
 * @return {int}
 *
 * @since	2008.1
 */
function nlapiGetSubsidiary() { ; }

/**
 * Return the recordtype corresponding to the current page or userevent script.
 *
 * @return {string}
 *
 * @since	2007.0
 */
function nlapiGetRecordType() { ; }

/**
 * Return the internal ID corresponding to the current page or userevent script.
 *
 *  @return {int}
 *
 * @since	2007.0
 */
function nlapiGetRecordId() { ; }

/**
 * Send out an email and associate it with records in the system.
 * Supported base types are entity for entities, transaction for transactions, activity for activities and cases, record|recordtype for custom records
 * @governance 10 units
 * @restriction all outbound emails subject to email Anti-SPAM policies
 *
 * @param {int} 		from internal ID for employee user on behalf of whom this email is sent
 * @param {string, int} to email address or internal ID of user that this email is being sent to
 * @param {string} 		subject email subject
 * @param {string} 		body email body
 * @param {string, string[]} cc copy email address(es)
 * @param {string, string[]} bcc blind copy email address(es)
 * @param {Object} 		records Object of base types -> internal IDs used to associate email to records. i.e. {entity: 100, record: 23, recordtype: customrecord_surveys}
 * @param {nlobjFile[]} files array of nlobjFile objects (files) to include as attachments
 * @return {void}
 *
 * @since	2007.0
 */
function nlapiSendEmail(from, to, subject, body, cc, bcc, records, files) { ; }

/**
 * Sends a single on-demand campaign email to a specified recipient and returns a campaign response ID to track the email.
 * @governance 10 units
 * @restriction works in conjunction with the Lead Nurturing (campaigndrip) sublist only
 *
 * @param {int} campaigneventid internal ID of the campaign event
 * @param {int} recipientid internal ID of the recipient - the recipient must have an email
 * @return {int}
 *
 * @since	2010.1
 */
function nlapiSendCampaignEmail(campaigneventid, recipientid) { ; }

/**
 * Send out a fax and associate it with records in the system. This requires fax preferences to be configured.
 * Supported base types are entity for entities, transaction for transactions, activity for activities and cases, record|recordtype for custom records
 * @governance 10 units
 *
 * @param {int} 		from internal ID for employee user on behalf of whom this fax is sent
 * @param {string, int} to fax address or internal ID of user that this fax is being sent to
 * @param {string} 		subject fax subject
 * @param {string} 		body fax body
 * @param {Object} 		records Object of base types -> internal IDs used to associate fax to records. i.e. {entity: 100, record: 23, recordtype: customrecord_surveys}
 * @param {nlobjFile[]} files array of nlobjFile objects (files) to include as attachments
 * @return {void}
 *
 * @since	2008.2
 */
function nlapiSendFax(from, to, subject, body, records, files) { ; }

/**
 * Return field definition for a field.
 *
 * @param {string} fldnam the name of the field
 * @return {nlobjField}
 *
 * @since	2009.1
 */
function nlapiGetField(fldnam) { ; }

/**
 * Return field definition for a matrix field.
 *
 * @param {string} 	type	matrix sublist name
 * @param {string} 	fldnam matrix field name
 * @param {int} 	column matrix field column index (1-based)
 * @return {nlobjField}
 *
 * @since	2009.2
 */
function nlapiGetMatrixField(type, fldnam, column) { ; }

/**
 * Return field definition for a sublist field.
 *
 * @param {string} 	type	sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	[linenum] line number for sublist field (1-based) and only valid for sublists of type staticlist and list
 * @return {nlobjField}
 *
 * @since	2009.1
 */
function nlapiGetLineItemField(type, fldnam, linenum) { ; }

/**
 * Return an nlobjField containing sublist field metadata.
 *
 * @param {string} 	type	matrix sublist name
 * @param {string} 	fldnam matrix field name
 * @param {int} 	linenum line number (1-based)
 * @param {int} 	column matrix column index (1-based)
 * @return {nlobjField}
 *
 * @since	2009.2
 */
function nlapiGetLineItemMatrixField(type, fldnam, linenum, column) { ; }

/**
 * Return the value of a field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} fldnam the field name
 * @return {string}
 *
 * @since	2005.0
 */
function nlapiGetFieldValue(fldnam) { ; }

/**
 * Set the value of a field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} 	fldnam the field name
 * @param {string} 	value value used to set field
 * @param {boolean} [firefieldchanged]	if false then the field change event is suppressed (defaults to true)
 * @param {boolean} [synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since	2005.0
 */
function nlapiSetFieldValue(fldnam,value,firefieldchanged,synchronous) { ; }

/**
 * Return the display value of a select field's current selection on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} fldnam the field name
 * @return {string}
 *
 * @since	2005.0
 */
function nlapiGetFieldText(fldnam) { ; }

/**
 * Set the value of a field on the current record on a page using it's label.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} 	fldnam the field name
 * @param {string} 	txt display name used to lookup field value
 * @param {boolean} [firefieldchanged]	if false then the field change event is suppressed (defaults to true)
 * @param {boolean} [synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since	2005.0
 */
function nlapiSetFieldText(fldnam,txt,firefieldchanged,synchronous)	{ ; }

/**
 * Return the values of a multiselect field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} fldnam the field name
 * @return {string[]}
 *
 * @since	2005.0
 */
function nlapiGetFieldValues(fldnam) { ; }

/**
 * Set the values of a multiselect field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} 		fldnam field name
 * @param {string[]} 	values array of strings containing values for field
 * @param {boolean} 	[firefieldchanged] if false then the field change event is suppressed (defaults to true)
 * @param {boolean} 	[synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since	2005.0
 */
function nlapiSetFieldValues(fldnam,values,firefieldchanged,synchronous) { ; }

/**
 * Return the values (via display text) of a multiselect field on the current record.
 * @restriction supported in client and user event scripts only.
 * @param {string} fldnam field name
 * @return {string[]}
 *
 * @since	2009.1
 */
function nlapiGetFieldTexts(fldnam) { ; }

/**
 * Set the values (via display text) of a multiselect field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} 		fldnam field name
 * @param {string[]}	texts array of strings containing display values for field
 * @param {boolean}		[firefieldchanged]	if false then the field change event is suppressed (defaults to true)
 * @param {boolean} 	[synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since	2009.1
 */
function nlapiSetFieldTexts(fldnam,texts,firefieldchanged,synchronous) { ; }

/**
 * Get the value of a matrix header field
 *
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	column matrix column index (1-based)
 * @return {string}
 *
 * @since	2009.2
 */
function nlapiGetMatrixValue(type, fldnam, column) { ; }

/**
 * Set the value of a matrix header field
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	column matrix column index (1-based)
 * @param {string} 	value field value for matrix field
 * @param {boolean} [firefieldchanged]	if false then the field change event is suppressed (defaults to true)
 * @param {boolean} [synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since	2009.2
 */
function nlapiSetMatrixValue(type, fldnam, column, value, firefieldchanged, synchronous) { ; }

/**
 * Get the current value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	column matrix column index (1-based)
 * @return {string} value
 *
 * @since	2009.2
 */
function nlapiGetCurrentLineItemMatrixValue(type, fldnam, column) { ; }

/**
 * Set the current value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @restriction synchronous arg is only supported in Client SuiteScript
 *
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	column matrix column index (1-based)
 * @param {string} 	value matrix field value
 * @param {boolean} [firefieldchanged] if false then the field change event is suppressed (defaults to true)
 * @param {boolean} [synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since	2009.2
 */
function nlapiSetCurrentLineItemMatrixValue(type, fldnam, column, value, firefieldchanged, synchronous) { ; }

/**
 * Return the value of a sublist matrix field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	linenum line number (1-based)
 * @param {int} 	column column index (1-based)
 * @param {string} value
 *
 * @since	2009.2
 */
function nlapiGetLineItemMatrixValue(type, fldnam, linenum, column) { ; }

/**
 * Return the value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	linenum line number (1-based)
 * @return {string}
 *
 * @since 2005.0
 */
function nlapiGetLineItemValue(type,fldnam,linenum) { ; }

/**
 * Return the value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	linenum line number (1-based)
 * @return {string}
 *
 * @since 2013.2
 */
function nlapiGetLineItemDateTimeValue(type,fldnam,linenum) { ; }

/**
 * Return the value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	linenum line number (1-based)
 * @param {string} 	timezone value
 * @return {string}
 *
 * @since 2013.2
 */
function nlapiGetLineItemDateTimeValue(type,fldnam,linenum,timezone) { ; }

/**
 * Set the value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	linenum line number (1-based)
 * @param {string} value
 * @retun {void}
 *
 * @since 2005.0
 */
function nlapiSetLineItemValue(type,fldnam,linenum,value) { ; }

/**
 * Set the value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	linenum line number (1-based)
 * @param {string} datetime value
 * @retun {void}
 *
 * @since 2013.2
 */
function nlapiSetLineItemDateTimeValue(type,fldnam,linenum,value) { ; }

/**
 * Set the value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	linenum line number (1-based)
 * @param {string} datetime value
 * @param {string} timezone value
 * @retun {void}
 *
 * @since 2013.2
 */
function nlapiSetLineItemDateTimeValue(type,fldnam,linenum,value,timezone) { ; }

/**
 * Return the label of a select field's current selection for a particular line.
 *
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	linenum line number (1-based)
 * @return {string}
 *
 * @since 2005.0
 */
function nlapiGetLineItemText(type,fldnam,linenum) { ; }

/**
 * Return the 1st line number that a sublist field value appears in
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @param {string} val the value being queried for in a sublist field
 * @return {int}
 *
 * @since 2009.2
 */
function nlapiFindLineItemValue(type, fldnam, val) { ; }

/**
 * Return the 1st line number that a matrix field value appears in
 *
 * @param {string} 	type sublist name
 * @param {string} 	fldnam matrix field name
 * @param {int} 	column matrix column index (1-based)
 * @param {string} 	val the value being queried for in a matrix field
 * @return {int}
 *
 * @since 2009.2
 */
function nlapiFindLineItemMatrixValue(type, fldnam, column, val) { ; }

/**
 * Return the number of columns for a matrix field
 *
 * @param {string} type sublist name
 * @param {string} fldnam matrix field name
 * @return {int}
 *
 * @since 2009.2
 */
function nlapiGetMatrixCount(type, fldnam) { ; }

/**
 * Return the number of sublists in a sublist on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} type sublist name
 * @return {int}
 *
 * @since 2005.0
 */
function nlapiGetLineItemCount(type) { ; }

/**
 * Insert and select a new line into the sublist on a page or userevent.
 *
 * @param {string} type sublist name
 * @param {int} [line] line number at which to insert a new line.
 * @return{void}
 *
 * @since 2005.0
 */
function nlapiInsertLineItem(type, line) { ; }

/**
 * Remove the currently selected line from the sublist on a page or userevent.
 *
 * @param {string} type sublist name
 * @param {int} [line]	line number to remove.
 * @return {void}
 *
 * @since 2005.0
 */
function nlapiRemoveLineItem(type, line) { ; }

/**
 * Set the value of a field on the currently selected line.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @param {string} value field value
 * @param {boolean} [firefieldchanged]	if false then the field change event is suppressed (defaults to true)
 * @param {boolean} [synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since 2005.0
 */
function nlapiSetCurrentLineItemValue(type,fldnam,value,firefieldchanged,synchronous) { ; }

/**
 * Set the value of a field on the currently selected line.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @param {string} value field value
 * @return {void}
 *
 * @since 2013.2
 */
function nlapiSetCurrentLineItemDateTimeValue(type,fldnam,value) { ; }

/**
 * Set the value of a field on the currently selected line.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @param {string} value field value
 * @param {string} timezone value
 * @return {void}
 *
 * @since 2013.2
 */
function nlapiSetCurrentLineItemDateTimeValue(type,fldnam,value,timezone) { ; }

/**
 * Set the value of a field on the currently selected line using it's label.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @param {string} txt string containing display value or search text.
 * @param {boolean} [firefieldchanged]	if false then the field change event is suppressed (defaults to true)
 * @param {boolean} [synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since 2005.0
 */
function nlapiSetCurrentLineItemText(type,fldnam,txt,firefieldchanged,synchronous) { ; }

/**
 * Return the value of a field on the currently selected line.
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @return {string}
 *
 * @since 2005.0
 */
function nlapiGetCurrentLineItemValue(type,fldnam) { ; }

/**
 * Return the value of a field on the currently selected line.
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @return {string}
 *
 * @since 2013.2
 */
function nlapiGetCurrentLineItemDateTimeValue(type,fldnam) { ; }

/**
 * Return the value of a field on the currently selected line.
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @param {string} timezone value
 * @return {string}
 *
 * @since 2013.2
 */
function nlapiGetCurrentLineItemDateTimeValue(type,fldnam, timezone) { ; }

/**
 * Return the label of a select field's current selection on the currently selected line.
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @return {string}
 *
 * @since 2005.0
 */
function nlapiGetCurrentLineItemText(type,fldnam) { ; }

/**
 * Return the line number for the currently selected line.
 *
 * @param {string} type sublist name
 * @return {int}
 *
 * @since 2005.0
 */
function nlapiGetCurrentLineItemIndex(type) { ; }

/**
 * Disable a sublist field.
 * @restriction Only supported on sublists of type inlineeditor, editor and list (current field only)
 *
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {boolean} disable if true then field is disabled
 * @param {int} linenum line number for sublist field (1-based) and only valid for sublists of type list
 * @return {void}
 *
 * @since 2009.1
 */
function nlapiSetLineItemDisabled(type,fldnam,disable, linenum) { ; }

/**
 * Return field mandatoriness.
 *
 * @param {string} fldnam field name
 * @return {boolean}
 *
 * @since 2009.1
 */
function nlapiGetFieldMandatory(fldnam) { ; }

/**
 * Return sublist field mandatoriness.
 * @restriction Only supported on sublists of type inlineeditor or editor (current field only)
 *
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @return {boolean}
 *
 * @since 2009.1
 */
function nlapiGetLineItemMandatory(type,fldnam) { ; }

/**
 * Make a field mandatory.
 *
 * @param {string} 	fldnam field name
 * @param {boolean} mandatory if true then field is made mandatory
 * @return {void}
 *
 * @since 2009.1
 */
function nlapiSetFieldMandatory(fldnam,mandatory) { ; }

/**
 * Make a sublist field mandatory.
 * @restriction Only supported on sublists of type inlineeditor or editor (current field only)
 *
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {boolean} mandatory if true then field is made mandatory
 * @return {void}
 *
 * @since 2009.2
 */
function nlapiSetLineItemMandatory(type,fldnam,mandatory) { ; }

/**
 * Select an existing line in a sublist.
 *
 * @param {string} type sublist name
 * @param {int} linenum line number to select
 * @return {void}
 *
 * @since 2005.0
 */
function nlapiSelectLineItem(type, linenum) { ; }

/**
 * Save changes made on the currently selected line to the sublist.
 *
 * @param {string} type sublist name
 * @return {void}
 *
 * @since 2005.0
 */
function nlapiCommitLineItem(type) { ; }

/**
 * Cancel any changes made on the currently selected line.
 * @restriction Only supported for sublists of type inlineeditor and editor
 *
 * @param {string} type sublist name
 * @return {void}
 *
 * @since 2005.0
 */
function nlapiCancelLineItem(type) { ; }

/**
 * Select a new line in a sublist.
 * @restriction Only supported for sublists of type inlineeditor and editor
 *
 * @param {string} type sublist name
 * @return {void}
 *
 * @since 2005.0
 */
function nlapiSelectNewLineItem(type) { ; }

/**
 * Refresh the sublist table.
 * @restriction Only supported for sublists of type inlineeditor, editor, and staticlist
 * @restriction Client SuiteScript only.
 *
 * @param {string} type sublist name
 * @return{void}
 *
 * @since 2005.0
 */
function nlapiRefreshLineItems(type) { ; }

/**
 * Adds a select option to a scripted select or multiselect field.
 * @restriction Client SuiteScript only
 *
 * @param {string} fldnam field name
 * @param {string} value internal ID for select option
 * @param {string} text display text for select option
 * @param {boolean} [selected] if true then option will be selected by default
 * @return {void}
 *
 * @since 2008.2
 */
function nlapiInsertSelectOption(fldnam, value, text, selected) { ; }

/**
 * Removes a select option (or all if value is null) from a scripted select or multiselect field.
 * @restriction Client SuiteScript only
 *
 * @param {string} fldnam field name
 * @param {string} value internal ID of select option to remove
 * @return {void}
 *
 * @since 2008.2
 */
function nlapiRemoveSelectOption(fldnam, value) { ; }

/**
 * Adds a select option to a scripted select or multiselect sublist field.
 * @restriction Client SuiteScript only
 *
 * @param {string} type	sublist name
 * @param {string} fldnam sublist field name
 * @param {string} value internal ID for select option
 * @param {string} text display text for select option
 * @param {boolean} [selected] if true then option will be selected by default
 * @return {void}
 *
 * @since 2008.2
 */
function nlapiInsertLineItemOption(type, fldnam, value, text, selected) { ; }

/**
 * Removes a select option (or all if value is null) from a scripted select or multiselect sublist field.
 * @restriction Client SuiteScript only
 *
 * @param {string} type	sublist name
 * @param {string} fldnam sublist field name
 * @param {string} value internal ID for select option to remove
 * @return {void}
 *
 * @since 2008.2
 */
function nlapiRemoveLineItemOption(type, fldnam, value) { ; }

/**
 * Returns true if any changes have been made to a sublist.
 * @restriction Client SuiteScript only
 *
 * @param {string} type sublist name
 * @return {boolean}
 *
 * @since 2005.0
 */
function nlapiIsLineItemChanged(type) { ; }

/**
 * Return an record object containing the data being submitted to the system for the currenr record.
 * @restriction User Event scripts only
 *
 * @return {nlobjRecord}
 *
 * @since 2008.1
 */
function nlapiGetNewRecord() { ; }

/**
 * Return an record object containing the current record's data prior to the write operation.
 * @restriction beforeSubmit|afterSubmit User Event scripts only
 *
 * @return {nlobjRecord}
 *
 * @since 2008.1
 */
function nlapiGetOldRecord() { ; }

/**
 * Create an nlobjError object that can be used to abort script execution and configure error notification
 *
 * @param {string} 	code error code
 * @param {string} 	details error description
 * @param {boolean} [suppressEmail] if true then suppress the error notification emails from being sent out (false by default).
 * @return {nlobjError}
 *
 * @since 2008.2
 */
function nlapiCreateError(code,details,suppressEmail) { ; }

/**
 * Return a new entry form page.
 * @restriction Suitelets only
 *
 * @param {string} 	title page title
 * @param {boolean} [hideHeader] true to hide the page header (false by default)
 * @return {nlobjForm}
 *
 * @since 2008.2
 */
function nlapiCreateForm(title, hideHeader) { ; }

/**
 * Return a new list page.
 * @restriction Suitelets only
 *
 * @param {string} 	title page title
 * @param {boolean} [hideHeader] true to hide the page header (false by default)
 * @return {nlobjList}
 *
 * @since 2008.2
 */
function nlapiCreateList(title, hideHeader) { ; }

/**
 * Return a new assistant page.
 * @restriction Suitelets only
 *
 * @param {string} 	title page title
 * @param {boolean} [hideHeader] true to hide the page header (false by default)
 * @return {nlobjAssistant}
 *
 * @since 2009.2
 */
function nlapiCreateAssistant(title, hideHeader) { ; }

/**
 * Load a file from the file cabinet (via its internal ID or path).
 * @governance 10 units
 * @restriction Server SuiteScript only
 *
 * @param {string, int} id internal ID or relative path to file in the file cabinet (i.e. /SuiteScript/foo.js)
 * @return {nlobjFile}
 *
 * @since 2008.2
 */
function nlapiLoadFile(id) { ; }

/**
 * Add/update a file in the file cabinet.
 * @governance 20 units
 * @restriction Server SuiteScript only
 *
 * @param {nlobjFile} file a file object to submit
 * @return {int} return internal ID of file
 *
 * @since 2009.1
 */
function nlapiSubmitFile(file) { ; }

/**
 * Delete a file from the file cabinet.
 * @governance 20 units
 * @restriction Server SuiteScript only
 *
 * @param {int} id internal ID of file to be deleted
 * @return {id}
 *
 * @since 2009.1
 */
function nlapiDeleteFile(id) { ; }

/**
 * Instantiate a file object (specifying the name, type, and contents which are base-64 encoded for binary types.)
 * @restriction Server SuiteScript only
 *
 * @param {string} name file name
 * @param {string} type file type i.e. plainText, htmlDoc, pdf, word (see documentation for the list of supported file types)
 * @param {string} contents string containing file contents (must be base-64 encoded for binary types)
 * @return {nlobjFile}
 *
 * @since 2009.1
 */
function nlapiCreateFile(name, type, contents) { ; }

/**
 * Perform a mail merge operation using any template and up to 2 records and returns an nlobjFile with the results.
 * @restriction only supported for record types that are available in mail merge: transactions, entities, custom records, and cases
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {int} 	id internal ID of template
 * @param {string} 	baseType primary record type
 * @param {int} 	baseId internal ID of primary record
 * @param {string} 	[altType] secondary record type
 * @param {int} 	[altId] internal ID of secondary record
 * @param {Object} 	[fields] Object of merge field values to use in the mail merge (by default all field values are obtained from records) which overrides those from the record.
 * @return {nlobjFile}
 *
 * @since 2008.2
 */
function nlapiMergeRecord(id, baseType, baseId, altType, altId, fields) { ; }

/**
 * Print a record (transaction) gievn its type, id, and output format.
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {string} 	type print output type: transaction|statement|packingslip|pickingticket
 * @param {int} 	id internal ID of record to print
 * @param {string} 	[format] output format: html|pdf|default
 * @param {Object} 	[properties] Object of properties used to configure print
 * @return {nlobjFile}
 *
 * @since 2008.2
 */
function nlapiPrintRecord(type, id, format, properties) { ; }

/**
 * Generate a PDF from XML using the BFO report writer (see http://big.faceless.org/products/report/).
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {string} input string containing BFO compliant XHTML
 * @return {nlobjFile}
 *
 * @since 2009.1
 */
function nlapiXMLToPDF(input) { ; }

/**
 * Create a template renderer used to generate various outputs based on a template.
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {string} type	media type: pdf|html
 * @param {string} [engineType] [optional]: default is freemarker/html
 * @return {nlobjTemplateRenderer}
 *
 */
function nlapiCreateTemplateRenderer() { ; }

/**
 * Create an entry in the script execution log (note that execution log entries are automatically purged after 30 days).
 *
 * @param {string} type	log type: debug|audit|error|emergency
 * @param {string} title log title (up to 90 characters supported)
 * @param {string} [details] log details (up to 3000 characters supported)
 * @return {void}
 *
 * @since 2008.1
 */
function nlapiLogExecution(type, title, details) { ; }

/**
 * Queue a scheduled script for immediate execution and return the status QUEUED if successfull.
 * @restriction Server SuiteScript only
 * @governance 20 units
 *
 * @param {string, int}	script script ID or internal ID of scheduled script
 * @param {string, int} [deployment] script ID or internal ID of scheduled script deployment. If empty, the first "free" deployment (i.e. status = Not Scheduled or Completed) will be used
 * @param {Object} 		parameters Object of parameter name->values used in this scheduled script instance
 * @return {string}	QUEUED or null if no available deployments were found or the current status of the deployment specified if it was not available.
 *
 * @since 2008.1
 */
function nlapiScheduleScript(script, deployment, parameters) { ; }

/**
 * Return a URL with a generated OAuth token.
 * @restriction Suitelets and Portlets only
 * @governance 20 units
 *
 * @param {string} ssoAppKey
 * @return {string}
 *
 * @since 2009.2
 */
function nlapiOutboundSSO(ssoAppKey) { ; }

/**
 * Loads a configuration record
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {string} type
 * @return {nlobjConfiguration}
 *
 * @since 2009.2
 */
function nlapiLoadConfiguration(type) { ; }

/**
 * Commits all changes to a configuration record.
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {nlobjConfiguration} setup record
 * @return (void)
 *
 * @since 2009.2
 */
function nlapiSubmitConfiguration(setup) { ; }

/**
 * Convert a String into a Date object.
 *
 * @param {string} str date string in the user's date format, timeofday format, or datetime format
 * @param {string} format format type to use: date|datetime|timeofday with date being the default
 * @return {date}
 *
 * @since 2005.0
 */
function nlapiStringToDate(str, format) { ; }

/**
 * Convert a Date object into a String
 *
 * @param {date} 	d date object being converted to a string
 * @param {string} [formattype] format type to use: date|datetime|timeofday with date being the default
 * @return {string}
 *
 * @since 2005.0
 */
function nlapiDateToString(d, formattype) { ; }

/**
 * Add days to a Date object and returns a new Date
 *
 * @param {date} d date object used to calculate the new date
 * @param {int}	days the number of days to add to this date object.
 * @return {date}
 *
 * @since 2008.1
 */
function nlapiAddDays(d, days) { ; }

/**
 * Add months to a Date object and returns a new Date.
 *
 * @param {date} d date object used to calculate the new date
 * @param {int} months the number of months to add to this date object.
 * @return {date}
 *
 * @since 2008.1
 */
function nlapiAddMonths(d, months) { ; }

/**
 * Format a number for data entry into a currency field.
 *
 * @param {string} str numeric string used to format for display as currency using user's locale
 * @return {string}
 *
 * @since 2008.1
 */
function nlapiFormatCurrency(str) { ; }

/**
 * Encrypt a String using a SHA-1 hash function
 *
 * @param {string} s string to encrypt
 * @return {string}
 *
 * @since 2009.2
 */
function nlapiEncrypt(s) { ; }

/**
 * Escape a String for use in an XML document.
 *
 * @param {string} text string to escape
 * @return {string}
 *
 * @since 2008.1
 */
function nlapiEscapeXML(text) { ; }

/**
 * Convert a String into an XML document. Note that in Server SuiteScript XML is supported natively by the JS runtime using the e4x standard (http://en.wikipedia.org/wiki/E4X)
 * This makes scripting XML simpler and more efficient
 *
 * @param {string} str string being parsed into an XML document
 * @return {document}
 *
 * @since 2008.1
 */
function nlapiStringToXML(str) { ; }

/**
 * Convert an XML document into a String.  Note that in Server SuiteScript XML is supported natively by the JS runtime using the e4x standard (http://en.wikipedia.org/wiki/E4X)
 * This makes scripting XML data simpler and more efficient
 *
 * @param {document} xml document being serialized into a string
 * @return {string}
 *
 * @since 2008.1
 */
function nlapiXMLToString(xml) { ; }

/**
 * select a value from an XML node using XPath. Supports custom namespaces (nodes in default namespace can be referenced using "nlapi" as the prefix)
 *
 * @param {node} node node being queried
 * @param {string} xpath string containing XPath expression.
 * @return {string}
 *
 * @since 2008.2
 */
function nlapiSelectValue(node, xpath) { ; }

/**
 * Select an array of values from an XML node using XPath. Supports custom namespaces (nodes in default namespace can be referenced using "nlapi" as the prefix)
 *
 * @param {node} 	node node being queried
 * @param {string} 	xpath string containing XPath expression.
 * @return {string[]}
 *
 * @since 2008.1
 */
function nlapiSelectValues(node, xpath) { ; }

/**
 * Select a node from an XML node using XPath. Supports custom namespaces (nodes in default namespace can be referenced using "nlapi" as the prefix)
 *
 * @param {node} 	node node being queried
 * @param {string} 	xpath string containing XPath expression.
 * @return {node}
 *
 * @since 2008.1
 */
function nlapiSelectNode(node, xpath) { ; }

/**
 * Select an array of nodes from an XML node using XPath. Supports custom namespaces (nodes in default namespace can be referenced using "nlapi" as the prefix)
 *
 * @param {node} 	node node being queried
 * @param {string} 	xpath string containing XPath expression.
 * @return {node[]}
 *
 * @since 2008.1
 */
function nlapiSelectNodes(node, xpath) { ; }

/**
 * Calculate exchange rate between two currencies as of today or an optional effective date.
 * @governance 10 units
 *
 * @param {string, int} fromCurrency internal ID or currency code of currency we are converting from
 * @param {string, int} toCurrency internal ID or currency code of currency we are converting to
 * @param {string} [date] string containing date of effective exchange rate. defaults to today
 * @return {float}
 *
 * @since 2009.1
 */
function nlapiExchangeRate(fromCurrency, toCurrency, date) { ; }

/**
 * Initiates a workflow on-demand and returns the workflow instance ID for the workflow-record combination.
 * @governance 20 units
 *
 * @param {string} recordtype record type ID of the workflow base record
 * @param {int} id internal ID of the base record
 * @param {string, int} workflowid internal ID or script ID for the workflow definition
 * @return {int}
 *
 * @since 2010.1
 */
function nlapiInitiateWorkflow(recordtype, id, workflowid) { ; }

/**
 * Triggers a workflow on a record.
 * @governance 20 units
 *
 * @param {string} recordtype record type ID of the workflow base record
 * @param {int} id internal ID of the base record
 * @param {string, int} workflowid internal ID or script ID for the workflow definition
 * @param {string, int} actionid internal ID or script ID of the action script
 * @return {int}
 *
 * @since 2010.1
 */
function nlapiTriggerWorkflow(recordtype, id, workflowid, actionid) { ; }

/**
 * Create a subrecord on a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @retun {nlobjSubrecord}
 *
 * @since 2011.2
 */
function nlapiCreateCurrentLineSubrecord(type,fldnam) { ; }

/**
 * edit a subrecord on a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @retun {nlobjSubrecord}
 *
 * @since 2011.2
 */
function nlapiEditCurrentLineItemSubrecord(type,fldnam) { ; }

/**
 * remove a subrecord on a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @retun {void}
 *
 * @since 2011.2
 */
function nlapiRemoveCurrentLineItemSubrecord(type,fldnam) { ; }


/**
 * view a subrecord on a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @retun {nlobjSubrecord}
 *
 * @since 2011.2
 */
function nlapiViewCurrentLineItemSubrecord(type,fldnam) { ; }


/**
 * view a subrecord on a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @retun {nlobjSubrecord}
 *
 * @since 2011.2
 */
function nlapiViewLineItemSubrecord(type,fldnam,linenum) { ; }


/**
 * get a cache object.
 * @param {string} name of the cache
 * @return {nlobjCache}
 *
 * @since 2013.2
 */
function nlapiGetCache(name){;}

/**
 * create a subrecord on body field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	fldnam body field name
 * @retun {nlobjSubrecord}
 *
 * @since 2011.2
 */
function createSubrecord(fldnam) { ; }

/**
 * edit a subrecord on body field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	fldnam body field name
 * @retun {nlobjSubrecord}
 *
 * @since 2011.2
 */
function editSubrecord(fldnam) { ; }

/**
 * remove a subrecord on body field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	fldnam body field name
 * @retun {void}
 *
 * @since 2011.2
 */
function removeSubrecord(fldnam) { ; }

/**
 * view a subrecord on body field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	fldnam body field name
 * @retun {nlobjSubrecord}
 *
 * @since 2011.2
 */
function viewSubrecord(fldnam) { ; }


/**
 * Commit the subrecord after you finish modifying it.
 *
 * @return {void}
 *
 * @method
 * @memberOf nlobjSubrecord
 *
 * @since 2008.1
 */
nlobjSubrecord.prototype.commit = function() { ; }

/**
 * Cancel the any modification on subrecord.
 *
 * @return {void}
 *
 * @method
 * @memberOf nlobjSubrecord
 *
 * @since 2008.1
 */
nlobjSubrecord.prototype.cancel = function() { ; }

/**
 * Return a new instance of nlobjRecord used for accessing and manipulating record objects.
 *
 * @classDescription Class definition for business records in the system.
 * @return {nlobjRecord}
 * @constructor
 *
 * @since 2008.2
 */
function nlobjRecord() { ; }

/**
 * Return the internalId of the record or NULL for new records.
 *
 * @return {int} Return the integer value of the record ID.
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.1
 */
nlobjRecord.prototype.getId = function() { ; }

/**
 * Return the recordType corresponding to this record.
 *
 * @return {string} The string value of the record name internal ID
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.1
 */
nlobjRecord.prototype.getRecordType = function( ) { ; }

/**
 * Return field metadata for field.
 *
 * @param {string} fldnam field name
 * @return	{nlobjField}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.1
 */
nlobjRecord.prototype.getField = function(fldnam) { ; }

/**
 * Return sublist metadata for sublist.
 *
 * @param {string} type sublist name
 * @return {nlobjSubList}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.getSubList = function(type) { ; }

/**
 * Return field metadata for field.
 *
 * @param {string} type matrix sublist name
 * @param {string} fldnam matrix field name
 * @param {column} linenum matrix column (1-based)
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.getMatrixField = function(type, fldnam, column) { ; }

/**
 * Return metadata for sublist field.
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @param {int} [linenum] line number (1-based). If empty, the current sublist field is returned. only settable for sublists of type list
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.getLineItemField = function(type, fldnam, linenum) { ; }

/**
 * Return metadata for sublist field.
 *
 * @param {string} type matrix sublist name
 * @param {string} fldnam matrix field name
 * @param {int} linenum line number
 * @param {column} linenum matrix column (1-based)
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.getLineItemMatrixField = function(type, fldnam, linenum, column) { ; }

/**
 * Set the value of a field.
 *
 * @param {string} name field name
 * @param {string} value field value
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.1
 */
nlobjRecord.prototype.setFieldValue = function( name, value ) { ; }

/**
 * Set the values of a multi-select field.
 *
 * @param {string} name field name
 * @param {string[]} values string array containing field values
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.1
 */
nlobjRecord.prototype.setFieldValues = function( name, values ) { ; }

/**
 * Return the value of a field.
 *
 * @param {string} name field name
 * @return {string}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.1
 */
nlobjRecord.prototype.getFieldValue = function( name ) { ; }

/**
 * Return the selected values of a multi-select field as an Array.
 *
 * @param {string} name field name
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.1
 */
nlobjRecord.prototype.getFieldValues = function( name ) { ; }

/**
 * Set the value (via display value) of a select field.
 * @restriction only supported for select fields
 *
 * @param {string} name field name
 * @param {string} text field display value
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.2
 */
nlobjRecord.prototype.setFieldText = function( name, text ) { ; }

/**
 * Set the values (via display values) of a multi-select field.
 * @restriction only supported for multi-select fields
 *
 * @param {string} name field name
 * @param {string[]} texts array of field display values
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.2
 */
nlobjRecord.prototype.setFieldTexts = function( name, texts ) { ; }

/**
 * Return the display value for a select field.
 * @restriction only supported for select fields
 *
 * @param {string} name field name
 * @return {string}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.2
 */
nlobjRecord.prototype.getFieldText = function( name ) { ; }

/**
 * Return the selected display values of a multi-select field as an Array.
 * @restriction only supported for multi-select fields
 *
 * @param {string} name field name
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.2
 */
nlobjRecord.prototype.getFieldTexts = function( name ) { ; }

/**
 * Get the value of a matrix header field.
 *
 * @param {string} type matrix sublist name
 * @param {string} name	matrix field name
 * @param {int} column matrix column index (1-based)
 * @return {string}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.getMatrixValue = function( type, name, column ) { ; }

/**
 * Set the value of a matrix header field.
 *
 * @param {string} 	type matrix sublist name
 * @param {string} 	name	matrix field name
 * @param {int} 	column matrix column index (1-based)
 * @param {string} 	value field value
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.setMatrixValue = function( type, name, column, value ) { ; }

/**
 * Return an Array of all field names on the record.
 *
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.1
 */
nlobjRecord.prototype.getAllFields = function( ) { ; }

/**
 * Return an Array of all field names on a record for a particular sublist.
 *
 * @param {string} group sublist name
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.2
 */
nlobjRecord.prototype.getAllLineItemFields = function( group ) { ; }

/**
 * Set the value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {int} 	line line number (1-based)
 * @param {string} 	value sublist field value
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.1
 */
nlobjRecord.prototype.setLineItemValue = function( group, name, line, value ) { ; }

/**
 * Set the value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {int} 	line line number (1-based)
 * @param {string} 	datetime value
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2013.2
 */
nlobjRecord.prototype.setLineItemDateTimeValue = function( group, name, line, value ) { ; }

/**
 * Set the value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {int} 	line line number (1-based)
 * @param {string} 	datetime value
 * @param {string} 	timezone value
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2013.2
 */
nlobjRecord.prototype.setLineItemDateTimeValue = function( group, name, line, value, timezone ) { ; }

/**
 * Return the value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {int} 	line line number (1-based)
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.1
 */
nlobjRecord.prototype.getLineItemValue = function( group, name, line ) { ; }

/**
 * Return the value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {int} 	line line number (1-based)
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2013.2
 */
nlobjRecord.prototype.getLineItemDateTimeValue = function( group, name, line ) { ; }

/**
 * Return the value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {int} 	line line number (1-based)
 * @param {string} 	timezone value
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2013.2
 */
nlobjRecord.prototype.getLineItemDateTimeValue = function( group, name, line, timezone ) { ; }

/**
 * Return the text value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {int} 	line line number (1-based)
 * @return {string}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.2
 */
nlobjRecord.prototype.getLineItemText = function( group, name, line ) { ; }

/**
 * Set the current value of a sublist field.
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {string} 	value sublist field value
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.setCurrentLineItemValue = function( group, name, value ) { ; }

/**
 * Set the current value of a sublist field.
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {string} 	value sublist field value
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2013.2
 */
nlobjRecord.prototype.setCurrentLineItemDateTimeValue = function( group, name, value ) { ; }

/**
 * Set the current value of a sublist field.
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {string} 	value sublist field value
 * @param {string} 	timezone value
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2013.2
 */
nlobjRecord.prototype.setCurrentLineItemDateTimeValue = function( group, name, value,timezone ) { ; }

/**
 * Return the current value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @return {string}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.getCurrentLineItemValue = function( group, name ) { ; }

/**
 * Return the current value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @return {string}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2013.2
 */
nlobjRecord.prototype.getCurrentLineItemDateTimeValue = function( group, name ) { ; }

/**
 * Return the current value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {string} 	timezone value
 * @return {string}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2013.2
 */
nlobjRecord.prototype.getCurrentLineItemDateTimeValue = function( group, name, timezone ) { ; }

/**
 * Return the current display value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @return {string}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.getCurrentLineItemText = function( group, name ) { ; }

/**
 * Set the current value of a sublist matrix field.
 *
 * @param {string} 	group matrix sublist name
 * @param {string} 	name matrix field name
 * @param {int} 	column matrix field column index (1-based)
 * @param {string} 	value matrix field value
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.setCurrentLineItemMatrixValue = function( group, name, column, value ) { ; }

/**
 * Return the current value of a sublist matrix field.
 *
 * @param {string} 	group matrix sublist name
 * @param {string} 	name matrix field name
 * @param {int} 	column matrix field column index (1-based)
 * @return {string}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.getCurrentLineItemMatrixValue = function( group, name, column ) { ; }

/**
 * Return the number of columns for a matrix field.
 *
 * @param {string} 	group matrix sublist name
 * @param {string} 	name matrix field name
 * @return {int}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.getMatrixCount = function( group, name ) { ; }

/**
 * Return the number of lines in a sublist.
 *
 * @param {string} group sublist name
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.getLineItemCount = function( group ) { ; }

/**
 * Return line number for 1st occurence of field value in a sublist column.
 *
 * @param {string} group	sublist name
 * @param {string} fldnam	sublist field name
 * @param {string} value	sublist field value
 * @return {int}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.findLineItemValue = function( group, fldnam, value ) { ; }

/**
 * Return line number for 1st occurence of field value in a sublist column.
 *
 * @param {string} 	group	sublist name
 * @param {string} 	fldnam	sublist field name
 * @param {int} 	column  matrix column index (1-based)
 * @param {string} 	value 	matrix field value
 * @return {int}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.findLineItemMatrixValue = function( group, fldnam, column, value ) { ; }

/**
 * Insert a new line into a sublist.
 *
 * @param {string} 	group sublist name
 * @param {int} 	[line] line index at which to insert line
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.insertLineItem = function( group, line ) { ; }

/**
 * Remove an existing line from a sublist.
 *
 * @param {string} 	group sublist name
 * @param {int} 	[line] line number to remove
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.removeLineItem = function( group, line ) { ; }

/**
 * Insert and select a new line in a sublist.
 *
 * @param {string} group sublist name
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.selectNewLineItem = function( group ) { ; }

/**
 * Select an existing line in a sublist.
 *
 * @param {string} 	group sublist name
 * @param {int} 	line  line number to select
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.selectLineItem = function( group, line ) { ; }

/**
 * Commit the current line in a sublist.
 *
 * @param {string} 	group sublist name
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.commitLineItem = function( group ) { ; }

/**
 * set the value of a field.
 *
 * @param {string} name field name
 * @param {string} value field value
 * @param {string} timezone Olson value
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 20013.2
 */
nlobjRecord.prototype.setDateTimeValue = function (name, value, timezone) { ; }

/**
 * set the value of a field.
 *
 * @param {string} name field name
 * @param {string} value field value
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 20013.2
 */
nlobjRecord.prototype.setDateTimeValue = function (name, value) { ; }

/**
 * Return the value of a field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} fldnam the field name
 * @return {string}
 *
 * @since	2013.2
 */
nlobjRecord.prototype.getDateTimeValue = function (fldnam) { ; }

/**
 * Return the value of a field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} fldnam the field name
 * @param {string} timezone Olson value
 * @return {string}
 *
 * @since	2013.2
 */
nlobjRecord.prototype.getDateTimeValue = function (fldnam, timezone) { ; }

/**
 * Return a new instance of nlobjConfiguration..
 *
 * @classDescription Class definition for interacting with setup/configuration pages
 * @return {nlobjConfiguration}
 * @constructor
 *
 * @since 2009.2
 */
function nlobjConfiguration( ) { ; }

/**
 * return the type corresponding to this setup record.
 *
 * @return {string}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.getType = function( ) { ; }

/**
 * return field metadata for field.
 *
 * @param {string} fldnam field name
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.getField = function(fldnam) { ; }

/**
 * set the value of a field.
 *
 * @param {string} name field name
 * @param {string} value field value
 * @return {void}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.setFieldValue = function( name, value ) { ; }

/**
 * Set the values of a multi-select field.
 * @restriction only supported for multi-select fields
 *
 * @param {string} name field name
 * @param {string[]} value field values
 * @return {void}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.setFieldValues = function( name, value ) { ; }

/**
 * return the value of a field.
 *
 * @param {string} name field name
 * @return {string}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.getFieldValue = function( name ) { ; }

/**
 * return the selected values of a multi-select field as an Array.
 * @restriction only supported for multi-select fields
 *
 * @param {string} name field name
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.getFieldValues = function( name ) { ; }

/**
 * set the value (via display value) of a field.
 * @restriction only supported for select fields
 *
 * @param {string} name field name
 * @param {string} text field display text
 * @return {void}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.setFieldText = function( name, text ) { ; }

/**
 * set the values (via display values) of a multi-select field.
 * @restriction only supported for multi-select fields
 *
 * @param {string} 	 name field name
 * @param {string[]} texts array of field display text values
 * @return {void}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.setFieldTexts = function( name, texts ) { ; }

/**
 * return the text value of a field.
 * @restriction only supported for select fields
 *
 * @param {string} name field name
 * @return {string}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.getFieldText = function( name ) { ; }

/**
 * return the selected text values of a multi-select field as an Array.
 * @param {string} name field name
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.getFieldTexts = function( name ) { ; }

/**
 * return an Array of all field names on the record.
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.getAllFields = function( ) { ; }

/**
 * Return a new instance of nlobjFile used for accessing and manipulating files in the file cabinet.
 *
 * @classDescription Encapsulation of files (media items) in the file cabinet.
 * @return {nlobjFile}
 * @constructor
 *
 * @since 2009.1
 */
function nlobjFile( ) { ; }

/**
 * Return the name of the file.
 * @return {string}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getName = function( ) { ; }

/**
 * Sets the name of a file.
 * @param {string} name the name of the file
 * @return {void}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.setName = function( name ) { ; }

/**
 * return the internal ID of the folder that this file is in.
 * @return {int}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getFolder = function( ) { ; }

/**
 * sets the internal ID of the folder that this file is in.
 * @param {int} folder
 * @return {void}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.setFolder = function( folder ) { ; }

/**
 * sets the character encoding for the file.
 * @param {String} encoding
 * @return {void}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2010.2
 */
nlobjFile.prototype.setEncoding = function( encoding ) { ; }

/**
 * return true if the file is "Available without Login".
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.isOnline = function( ) { ; }

/**
 * sets the file's "Available without Login" status.
 * @param {boolean} online
 * @return {void}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.setIsOnline = function( online ) { ; }

/**
 * return true if the file is inactive.
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.isInactive = function( ) { ; }

/**
 * sets the file's inactive status.
 * @param {boolean} inactive
 * @return {void}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.setIsInactive = function( inactive ) { ; }

/**
 * return the file description.
 * @return {string}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getDescription = function( ) { ; }

/**
 * sets the file's description.
 * @param {string} descr the file description
 * @return {void}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.setDescription = function( descr ) { ; }

/**
 * Return the id of the file (if stored in the FC).
 * @return {int}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getId = function( ) { ; }

/**
 * Return the size of the file in bytes.
 * @return {int}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getSize = function( ) { ; }

/**
 * Return the URL of the file (if stored in the FC).
 * @return {string}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getURL = function( ) { ; }

/**
 * Return the type of the file.
 * @return {string}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getType = function( ) { ; }

/**
 * Return the value (base64 encoded for binary types) of the file.
 * @return {string}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getValue = function( ) { ; }

/**
 * Return a new instance of nlobjSearchFilter filter objects used to define search criteria.
 *
 * @classDescription search filter
 * @constructor
 * @param {string} name filter name.
 * @param {string} join internal ID for joined search where this filter is defined
 * @param {string} operator operator name (i.e. anyOf, contains, lessThan, etc..)
 * @param {string|string[]} value
 * @param {string} value2
 * @return {nlobjSearchFilter}
 *
 * @since 2007.0
 */
function nlobjSearchFilter( name, join, operator, value, value2 ) { ; }

/**
 * Return the name of this search filter.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchFilter
 *
 * @since 2007.0
 */
nlobjSearchFilter.prototype.getName = function( ) { ; }

/**
 * Return the join id for this search filter.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchFilter
 *
 * @since 2008.1
 */
nlobjSearchFilter.prototype.getJoin = function( ) { ; }

/**
 * Return the filter operator used.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchFilter
 *
 * @since 2008.2
 */
nlobjSearchFilter.prototype.getOperator = function( ) { ; }

/**
 * Return a new instance of nlobjSearchColumn used for column objects used to define search return columns.
 *
 * @classDescription search column.
 * @return {nlobjSearchColumn}
 * @constructor
 * @param {string} name column name.
 * @param {string} join internal ID for joined search where this column is defined
 * @param {string} summary
 *
 * @since 2007.0
 */
function nlobjSearchColumn( name, join, summary ) { ; }

/**
 * return the name of this search column.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchColumn
 * @since 2008.1
 */
nlobjSearchColumn.prototype.getName = function( ) { ; }

/**
 * return the join id for this search column.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchColumn
 * @since 2008.1
 */
nlobjSearchColumn.prototype.getJoin = function( ) { ; }

/**
 * return the label of this search column.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchColumn
 *
 * @since 2009.1
 */
nlobjSearchColumn.prototype.getLabel = function( ) { ; }

/**
 * return the summary type (avg,group,sum,count) of this search column.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchColumn
 * @since 2008.1
 */
nlobjSearchColumn.prototype.getSummary = function( ) { ; }

/**
 * return formula for this search column.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchColumn
 *
 * @since 2009.2
 */
nlobjSearchColumn.prototype.getFormula = function( ) { ; }

/**
 * return nlobjSearchColumn sorted in either ascending or descending order.
 * @return {nlobjSearchColumn}
 * @param {boolean} sort if not set, defaults to false, which returns column data in ascending order.
 *
 * @method
 * @memberOf nlobjSearchColumn
 *
 * @since 2010.1
 */
nlobjSearchColumn.prototype.setSort = function( order ) { ; }

/**
 * Sets the label used for this column
 * @param {String} label
 */
nlobjSearchColumn.prototype.setLabel = function( label ) { ; }



/**
 * Return a new instance of nlobjSearchResult used for search result row object.
 *
 * @classDescription Class definition for interacting with the results of a search operation
 * @return {nlobjSearchResult}
 * @constructor
 */
function nlobjSearchResult( ) { ; }

/**
 * return the internalId for the record returned in this row.
 * @method
 * @memberOf nlobjSearchResult
 * @return {int}
 */
nlobjSearchResult.prototype.getId = function( ) { ; }

/**
 * return the recordtype for the record returned in this row.
 * @method
 * @memberOf nlobjSearchResult
 * @return {string}
 */
nlobjSearchResult.prototype.getRecordType = function( ) { ; }

/**
 * return the value for this nlobjSearchColumn.
 * @param {nlobjSearchColumn} column search result column
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchResult
 *
 * @since 2009.1
 */
nlobjSearchResult.prototype.getValue = function( column ) { ; }

/**
 * return the value for a return column specified by name, join ID, and summary type.
 * @param {string} name the name of the search column
 * @param {string} join the join ID for the search column
 * @param {string} summary summary type specified for this column
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchResult
 *
 * @since 2008.1
 */
nlobjSearchResult.prototype.getValue = function( name, join, summary ) { ; }

/**
 * return the text value for this nlobjSearchColumn if it's a select field.
 * @param {nlobjSearchColumn} column search result column
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchResult
 *
 * @since 2009.1
 */
nlobjSearchResult.prototype.getText = function( column ) { ; }

/**
 * return the text value of this return column if it's a select field.
 * @param {string} name the name of the search column
 * @param {string} join the join ID for the search column
 * @param {string} summary summary type specified for this column
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchResult
 *
 * @since 2008.1
 */
nlobjSearchResult.prototype.getText = function( name, join, summary ) { ; }

/**
 * return an array of all nlobjSearchColumn objects returned in this search.
 * @return {nlobjSearchColumn[]}
 *
 * @method
 * @memberOf nlobjSearchResult
 *
 * @since 2009.2
 */
nlobjSearchResult.prototype.getAllColumns = function( ) { ; }

/**
 * Return a new instance of nlobjContext used for user and script context information.
 *
 * @classDescription Utility class providing information about the current user and the script runtime.
 * @return {nlobjContext}
 * @constructor
 */
function nlobjContext( ) { ; }
/**
 * return the name of the current user.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getName = function( ) { ; }

/**
 * return the internalId of the current user.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getUser = function( ) { ; }

/**
 * return the internalId of the current user's role.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getRole = function( ) { ; }

/**
 * return the script ID of the current user's role.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2008.2
 */
nlobjContext.prototype.getRoleId = function( ) { ; }

/**
 * return the internalId of the current user's center type.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2008.2
 */
nlobjContext.prototype.getRoleCenter = function( ) { ; }

/**
 * return the email address of the current user.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getEmail = function( ) { ; }

/**
 * return the internal ID of the contact logged in on behalf of a customer, vendor, or partner. It returns -1 for non-contact logins
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.1
 */
nlobjContext.prototype.getContact = function( ) { ; }

/**
 * return the account ID of the current user.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getCompany = function( ) { ; }

/**
 * return the internalId of the current user's department.
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getDepartment = function( ) { ; }

/**
 * return the internalId of the current user's location.
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getLocation = function( ) { ; }

/**
 * return the internalId of the current user's subsidiary.
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getSubsidiary = function( ) { ; }

/**
 * return the execution context for this script: webServices|csvImport|client|userInterface|scheduledScript|portlet|suitelet|debugger|custommassupdate
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getExecutionContext = function( ) { ; }

/**
 * return the amount of usage units remaining for this script.
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getRemainingUsage = function( ) { ; }

/**
 * return true if feature is enabled, false otherwise
 * @param {string} name
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getFeature = function( name ) { ; }

/**
 * return current user's permission level (0-4) for this permission
 * @param {string} name
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getPermission = function( name ) { ; }

/**
 * return system or script preference selection for current user
 * @param {string} name
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getPreference = function( name ) { ; }

/**
 * return value of session object set by script
 * @param {string} name
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getSessionObject = function( name ) { ; }

/**
 * set the value of a session object using a key.
 * @param {string} name
 * @param {string} value
 * @return {void}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.setSessionObject = function( name, value ) { ; }

/**
 * return an array containing the names of all keys used to set session objects
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getAllSessionObjects = function() { ; }

/**
 * return the NetSuite version for the current account
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getVersion = function(  ) { ; }

/**
 * return the environment that the script is executing in: SANDBOX, PRODUCTION, BETA, INTERNAL
 * @since 2008.2
 */
nlobjContext.prototype.getEnvironment = function(  ) { ; }

/**
 * return the logging level for the current script execution. Not supported in CLIENT scripts
 * @since 2008.2
 */
nlobjContext.prototype.getLogLevel = function(  ) { ; }

/**
 * return the script ID for the current script
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getScriptId = function(  ) { ; }

/**
 * return the deployment ID for the current script
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getDeploymentId = function(  ) { ; }

/**
 * return the % complete specified for the current scheduled script execution
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getPercentComplete = function(  ) { ; }

/**
 * set the % complete for the current scheduled script execution
 * @param {float} ct the percentage of records completed
 * @return {void}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.setPercentComplete = function( pct ) { ; }

/**
 * return a system/script setting. Types are SCRIPT, SESSION, FEATURE, PERMISSION
 *
 * @param {string} type
 * @param {string} name
 * @since 2007.0
 * @deprecated
 */
nlobjContext.prototype.getSetting = function( type, name ) { ; }

/**
 * set a system/script setting. Only supported type is SESSION
 *
 * @param {string} type
 * @param {string} name
 * @param {string} value
 * @since 2007.0
 * @deprecated
 */
nlobjContext.prototype.setSetting = function( type, name, value ) { ; }

/**
 * return an Object containing name/value pairs of color groups to their corresponding RGB hex color based on the currenly logged in user's color them preferences.
 * @return {Object}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2010.1
 */
nlobjContext.prototype.getColorPreferences = function() { ; }

/**
 * Return a new instance of nlobjError used system or user-defined error object.
 *
 * @classDescription Encapsulation of errors thrown during script execution.
 * @return {nlobjError}
 * @constructor
 */
function nlobjError( ) { ; }

/**
 * return the error db ID for this error (if it was an unhandled unexpected error).
 * @return {string}
 *
 * @method
 * @memberOf nlobjError
 *
 * @since 2008.2
 */
nlobjError.prototype.getId = function( ) { ; }

/**
 * return the error code for this system or user-defined error.
 * @return {string}
 *
 * @method
 * @memberOf nlobjError
 *
 * @since 2008.2
 */
nlobjError.prototype.getCode = function( ) { ; }

/**
 * return the error description for this error.
 * @return {string}
 *
 * @method
 * @memberOf nlobjError
 *
 * @since 2008.2
 */
nlobjError.prototype.getDetails = function( ) { ; }

/**
 * return a stacktrace containing the location of the error.
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjError
 *
 * @since 2008.2
 */
nlobjError.prototype.getStackTrace = function( ) { ; }

/**
 * return the userevent script name where this error was thrown.
 * @return {string}
 *
 * @method
 * @memberOf nlobjError
 *
 * @since 2008.2
 */
nlobjError.prototype.getUserEvent = function( ) { ; }

/**
 * return the internalid of the record if this error was thrown in an aftersubmit script.
 * @return {int}
 *
 * @method
 * @memberOf nlobjError
 *
 * @since 2008.2
 */
nlobjError.prototype.getInternalId = function( ) { ; }

/**
 * Return a new instance of nlobjServerResponse..
 *
 * @classDescription Contains the results of a server response to an outbound Http(s) call.
 * @return {nlobjServerResponse}
 * @constructor
 *
 * @since 2008.1
 */
function nlobjServerResponse( ) { ; }

/**
 * return the Content-Type header in response
 * @return {string}
 *
 * @method
 * @memberOf nlobjServerResponse
 *
 * @since 2008.1
 */
nlobjServerResponse.prototype.getContentType = function( ) { ; }

/**
 * return the value of a header returned.
 * @param {string} name the name of the header to return
 * @return {string}
 *
 * @method
 * @memberOf nlobjServerResponse
 *
 * @since 2008.1
 */
nlobjServerResponse.prototype.getHeader = function(name) { ; }

/**
 * return all the values of a header returned.
 * @param {string} name the name of the header to return
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjServerResponse
 *
 * @since 2008.1
 */
nlobjServerResponse.prototype.getHeaders = function(name) { ; }

/**
 * return an Array of all headers returned.
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjServerResponse
 *
 * @since 2008.1
 */
nlobjServerResponse.prototype.getAllHeaders = function( ) { ; }

/**
 * return the response code returned.
 * @return {int}
 *
 * @method
 * @memberOf nlobjServerResponse
 *
 * @since 2008.1
 */
nlobjServerResponse.prototype.getCode = function( ) { ; }

/**
 * return the response body returned.
 * @return {string}
 *
 * @method
 * @memberOf nlobjServerResponse
 *
 * @since 2008.1
 */
nlobjServerResponse.prototype.getBody = function( ) { ; }

/**
 * return the nlobjError thrown via a client call to nlapiRequestURL.
 * @return {nlobjError}
 *
 * @method
 * @memberOf nlobjServerResponse
 *
 * @since 2008.1
 */
nlobjServerResponse.prototype.getError = function( ) { ; }


/**
 * add a record for to a template engine
 * @param  {string} [recordName] name of record used as a reference in template.
 * @param  {nlobjRecord} record to add to template engine
 * @return {void}
 *
 * @method
 * @memberOf nlobjTemplateRenderer
 *
 */
nlobjTemplateRenderer.prototype.addRecord = function( record ) { ; }

/**
 * add search results to a template engine
 * @param {string} [searchName] name of search results used as a reference in template.
 * @param {nlobjSearchResults[]} [results] An array of nlobjSearchResult objects.
 * @return {void}
 *
 * @method
 * @memberOf nlobjTemplateRenderer
 *
 */
nlobjTemplateRenderer.prototype.addSearchResults = function( searchName, results ) { ; }

/**
 * set the template xml in the template engine
 * @param  {string} xml BFO template
 * @return {void}
 *
 * @method
 * @memberOf nlobjTemplateRenderer
 *
 */
nlobjTemplateRenderer.prototype.setTemplate = function( xml ) { ; }

/**
 * render the output of the template engine into the response
 * @param {nlobjResponse}
 * @return {void}
 *
 * @method
 * @memberOf nlobjTemplateRenderer
 nlobjTemplateRenderer.prototype.renderToResponse = function(nlobjResponse) { ; }

 /**
 * Return a new instance of nlobjResponse used for scripting web responses in Suitelets
 *
 * @classDescription Accessor to Http response made available to Suitelets.
 * @return {nlobjResponse}
 * @constructor
 */
function nlobjResponse( ) { ; }

/**
 * add a value for a response header.
 * @param  {string} name of header
 * @param  {string} value for header
 * @return  {void}
 *
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.addHeader = function( name, value ) { ; }

/**
 * set the value of a response header.
 * @param  {string} name of header
 * @param  {string} value for header
 * @return  {void}
 *
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.setHeader = function( name, value ) { ; }

/**
 * return the value of a response header.
 * @param  {string} name of header
 * @return  {string}
 *
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.getHeader = function( ) { ; }

/**
 * return an Array of all response header values for a header
 * @param  {string} name of header
 * @return  {string[]}
 *
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.getHeaders = function( name ) { ; }

/**
 * return an Array of all response headers
 * @return  {Object}
 *
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.getAllHeaders = function( ) { ; }

/**
 * suppress caching for this response.
 * @return  {void}
 *
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2009.1
 */
nlobjResponse.prototype.sendNoCache = function( ) { ; }

/**
 * sets the content type for the response (and an optional filename for binary output).
 *
 * @param {string} type the file type i.e. plainText, word, pdf, htmldoc (see list of media item types)
 * @param {string} filename the file name
 * @param {string} disposition Content Disposition used for streaming attachments: inline|attachment
 * @return {void}
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.setContentType = function( type, filename, disposition ) { ; }

/**
 * sets the redirect URL for the response. all URLs must be internal unless the Suitelet is being executed in an "Available without Login" context
 *  at which point it can use type "external" to specify an external url via the subtype arg
 *
 * @param {string} type type specifier for URL: suitelet|tasklink|record|mediaitem|external
 * @param {string} subtype subtype specifier for URL (corresponding to type): scriptid|taskid|recordtype|mediaid|url
 * @param {string} [id] internal ID specifier (sub-subtype corresponding to type): deploymentid|n/a|recordid|n/a
 * @param {string} [pagemode] string specifier used to configure page (suitelet: external|internal, tasklink|record: edit|view)
 * @param {Object} [parameters] Object used to specify additional URL parameters as name/value pairs
 * @return {void}
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.sendRedirect = function( type, subtype, id, pagemode, parameters ) { ; }

/**
 * write information (text/xml/html) to the response.
 *
 * @param {string} output
 * @return {void}
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.write = function( output ) { ; }

/**
 * write line information (text/xml/html) to the response.
 *
 * @param {string} output
 * @return {void}
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.writeLine = function( output ) { ; }

/**
 * write a UI object page.
 *
 * @param {Object} pageobject page UI object: nlobjList|nlobjAssistant|nlobjForm|nlobjDashboard
 * @return {void}
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.writePage = function( pageobject ) { ; }

/**
 * sets the character encoding for the response.
 * @param {String} encoding
 * @return {void}
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2012.2
 */
nlobjResponse.prototype.setEncoding = function( encoding ) { ; }


/**
 * Return a new instance of nlobjRequest used for scripting web requests in Suitelets
 *
 * @classDescription Accessor to Http request data made available to Suitelets
 * @return {nlobjRequest}
 * @constructor
 */
function nlobjRequest( ) { ; }

/**
 * return the value of a request parameter.
 *
 * @param {string} name parameter name
 * @return {string}
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2008.2
 */
nlobjRequest.prototype.getParameter = function( name ) { ; }

/**
 * return the values of a request parameter as an Array.
 *
 * @param {string} name parameter name
 * @return {string[]}
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2008.2
 */
nlobjRequest.prototype.getParameterValues = function( name ) { ; }

/**
 * return an Object containing all the request parameters and their values.
 * @return {Object}
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2008.2
 */
nlobjRequest.prototype.getAllParameters = function( ) { ; }

/**
 * return the value of a sublist value.
 * @param {string} 	group sublist name
 * @param {string} 	name  sublist field name
 * @param {int} 	line  sublist line number
 * @return {string}
 *
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2008.2
 */
nlobjRequest.prototype.getLineItemValue = function( group, name, line ) { ; }

/**
 * return the number of lines in a sublist.
 * @param {string} group sublist name
 * @return {int}
 *
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2008.2
 */
nlobjRequest.prototype.getLineItemCount = function( group ) { ; }

/**
 * return the value of a request header.
 * @param {string} name
 * @return {string}
 *
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2008.2
 */
nlobjRequest.prototype.getHeader = function( name ) { ; }

/**
 * return an Object containing all the request headers and their values.
 * @return {Object}
 *
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2008.2
 */
nlobjRequest.prototype.getAllHeaders = function( ) { ; }

/**
 * return the value of an uploaded file.
 * @param {string} name file field name
 * @return {nlobjFile}
 *
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2009.1
 */
nlobjRequest.prototype.getFile = function( name ) { ; }

/**
 * return an Object containing field names to file objects for all uploaded files.
 * @return {Object}
 *
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2009.1
 */
nlobjRequest.prototype.getAllFiles = function( ) { ; }

/**
 * return the body of the POST request
 * @return {string}
 *
 * @method
 * @memberOf nlobjRequest
 * @since 2008.1
 */
nlobjRequest.prototype.getBody = function( ) { ; }

/**
 * return the URL of the request
 * @return {string}
 *
 * @method
 * @memberOf nlobjRequest
 * @since 2008.1
 */
nlobjRequest.prototype.getURL = function( ) { ; }

/**
 * return the METHOD of the request
 * @return {string}
 *
 * @method
 * @memberOf nlobjRequest
 * @since 2008.1
 */
nlobjRequest.prototype.getMethod = function( ) { ; }

/**
 * Return a new instance of nlobjPortlet used for scriptable dashboard portlet.
 *
 * @classDescription UI Object used for building portlets that are displayed on dashboard pages
 * @return {nlobjPortlet}
 * @constructor
 */
function nlobjPortlet( ) { ; }

/**
 * set the portlet title.
 *
 * @param {string} title
 * @since 2008.2
 */
nlobjPortlet.prototype.setTitle = function( title ) { ; }

/**
 * set the entire contents of the HTML portlet (will be placed inside a <TD>...</TD>).
 *
 * @param {string} html
 * @since 2008.2
 */
nlobjPortlet.prototype.setHtml = function( html ) { ; }

/**
 * add a column (nlobjColumn) to this LIST portlet and return it.
 *
 * @param {string} name	column name
 * @param {string} type column type
 * @param {string} label column label
 * @param {string} [align] column alignment
 * @since 2008.2
 */
nlobjPortlet.prototype.addColumn = function( name, type, label, align ) { ; }

/**
 * add an Edit column (nlobjColumn) to the left of the column specified (supported on LIST portlets only).
 *
 * @param {nlobjColumn} column
 * @param {boolean} showView should Edit|View instead of Edit link
 * @param {string} 	[showHref] column that evaluates to T or F that determines whether to disable the edit|view link per-row.
 * @return {nlobjColumn}
 *
 * @since 2008.2
 */
nlobjPortlet.prototype.addEditColumn = function( column, showView, showHref ) { ; }

/**
 * add a row (nlobjSearchResult or Array of name-value pairs) to this LIST portlet.
 *
 * @param {string[]|nlobjSearchResult} row
 * @since 2008.2
 */
nlobjPortlet.prototype.addRow = function( row ) { ; }

/**
 * add multiple rows (Array of nlobjSearchResults or name-value pair Arrays) to this LIST portlet.
 *
 * @param {string[][]|nlobjSearchResult[]} rows
 * @since 2008.2
 */
nlobjPortlet.prototype.addRows = function( rows ) { ; }

/**
 * add a field (nlobjField) to this FORM portlet and return it.
 *
 * @param {string} name field name
 * @param {string} type field type
 * @param {string} [label] field label
 * @param {string, int} [source] script ID or internal ID for source list (select and multiselects only) -or- radio value for radio fields
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjPortlet.prototype.addField = function( name,type,label,source ) { ; }

/**
 * add a FORM submit button to this FORM portlet.
 *
 * @param {string} url	URL that this form portlet will POST to
 * @param {string} [label] label for submit button (defaults to Save)
 * @since 2008.2
 */
nlobjPortlet.prototype.setSubmitButton = function( url, label ) { ; }

/**
 * add a line (containing text or simple HTML) with optional indenting and URL to this LINKS portlet.
 *
 * @param {string} 	text data to output to line
 * @param {string} 	[url] URL if this line should be clickable (if NULL then line will not be clickable)
 * @param {int} 	indent # of indents to insert before text
 * @since 2008.2
 */
nlobjPortlet.prototype.addLine = function( text, url, indent ) { ; }

/**
 * Return a new instance of nlobjList used for scriptable list page.
 *
 * @classDescription UI Object page type used for building lists
 * @return {nlobjList}
 * @constructor
 */
function nlobjList( ) { ; }

/**
 * set the page title.
 *
 * @param {string} title
 * @since 2008.2
 */
nlobjList.prototype.setTitle = function( title ) { ; }

/**
 * set the global style for this list: grid|report|plain|normal.
 *
 * @param {string} style overall style used to render list
 * @since 2008.2
 */
nlobjList.prototype.setStyle = function( style ) { ; }

/**
 * set the Client SuiteScript used for this page.
 *
 * @param {string, int} script script ID or internal ID for global client script used to enable Client SuiteScript on page
 * @since 2008.2
 */
nlobjList.prototype.setScript = function( script ) { ; }

/**
 * add a column (nlobjColumn) to this list and return it.
 *
 * @param {string} name column name
 * @param {string} type column type
 * @param {string} label column label
 * @param {string} [align] column alignment
 * @return {nlobjColumn}
 *
 * @since 2008.2
 */
nlobjList.prototype.addColumn = function( name, type, label, align ) { ; }

/**
 * add an Edit column (nlobjColumn) to the left of the column specified.
 *
 * @param {nlobjColumn} column
 * @param {boolean} showView should Edit|View instead of Edit link
 * @param {string} 	[showHref] column that evaluates to T or F that determines whether to disable the edit|view link per-row.
 * @return {nlobjColumn}
 *
 * @since 2008.2
 */
nlobjList.prototype.addEditColumn = function( column, showView, showHref ) { ; }

/**
 * add a row (Array of name-value pairs or nlobjSearchResult) to this portlet.
 *
 * @param {string[], nlobjSearchResult} row data used to add a single row
 * @since 2008.2
 */
nlobjList.prototype.addRow = function( row ) { ; }

/**
 * add multiple rows (Array of nlobjSearchResults or name-value pair Arrays) to this portlet.
 *
 * @param {string[][], nlobjSearchResult[]} rows data used to add multiple rows
 * @since 2008.2
 */
nlobjList.prototype.addRows = function( rows ) { ; }

/**
 * add a button (nlobjButton) to the footer of this page.
 *
 * @param {string} name button name
 * @param {string} label button label
 * @param {string} script button script (function name)
 * @since 2008.2
 */
nlobjList.prototype.addButton = function( name, label, script ) { ; }

/**
 * add a navigation cross-link to the page.
 *
 * @param {string} type	page link type: crosslink|breadcrumb
 * @param {string} title page link title
 * @param {string} url URL for page link
 * @since 2008.2
 */
nlobjList.prototype.addPageLink = function( type, title, url ) { ; }

/**
 * Return a new instance of nlobjForm used for scriptable form page.
 *
 * @classDescription UI Object page type used for building basic data entry forms.
 * @return {nlobjForm}
 * @constructor
 */
function nlobjForm( ) { ; }

/**
 * set the page title.
 *
 * @param {string} title
 * @since 2008.2
 */
nlobjForm.prototype.setTitle = function( title ) { ; }

/**
 * set additional title Html. INTERNAL ONLY
 *
 * @param {string} title
 * @since 2008.2
 */
nlobjForm.prototype.addTitleHtml = function( html ) { ; }

/**
 * set the Client Script definition used for this page.
 *
 * @param {string, int} script script ID or internal ID for global client script used to enable Client SuiteScript on page
 * @since 2008.2
 */
nlobjForm.prototype.setScript = function( script ) { ; }

/**
 * set the values for all the fields on this form.
 *
 * @param {Object} values Object containing field name/value pairs
 * @since 2008.2
 */
nlobjForm.prototype.setFieldValues = function( values ) { ; }

/**
 * add a navigation cross-link to the page.
 *
 * @param {string} type	page link type: crosslink|breadcrumb
 * @param {string} title page link title
 * @param {string} url URL for page link
 * @since 2008.2
 */
nlobjForm.prototype.addPageLink = function( type, title, url ) { ; }

/**
 * add a button to this form.
 *
 * @param {string} name button name
 * @param {string} label button label
 * @param {string} script button script (function name)
 * @return {nlobjButton}
 *
 * @since 2008.2
 */
nlobjForm.prototype.addButton = function( name, label, script ) { ; }

/**
 * get a button from this form by name.
 * @param {string} name
 * @return {nlobjButton}
 *
 * @method
 * @memberOf nlobjForm
 *
 * @since 2009.2                                                                           add
 */
nlobjForm.prototype.getButton = function( name ) { ; }

/**
 * add a reset button to this form.
 *
 * @param {string} [label] label for this button. defaults to "Reset"
 * @return {nlobjButton}
 *
 * @since 2008.2
 */
nlobjForm.prototype.addResetButton = function( label ) { ; }

/**
 * add a submit button to this form.
 *
 * @param {string} [label] label for this submit button. defaults to "Save"
 * @return {nlobjButton}
 *
 * @since 2008.2
 */
nlobjForm.prototype.addSubmitButton = function( label ) { ; }

/**
 * add a tab (nlobjTab) to this form and return it.
 *
 * @param {string} name tab name
 * @param {string} label tab label
 * @return {nlobjTab}
 *
 * @since 2008.2
 */
nlobjForm.prototype.addTab = function( name, label ) { ; }

/**
 * add a field (nlobjField) to this form and return it.
 *
 * @param {string} name field name
 * @param {string} type field type
 * @param {string} [label] field label
 * @param {string, int} [source] script ID or internal ID for source list (select and multiselects only) -or- radio value for radio fields
 * @param {string} [tab] tab name that this field will live on. If empty then the field is added to the main section of the form (immediately below the title bar)
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjForm.prototype.addField = function( name,type,label,sourceOrRadio,tab ) { ; }

nlobjForm.prototype.addCredentialField = function( name,label,domain,scriptId,value,entityMatch,tab ) { ; }
nlobjForm.prototype.addCredentialField = function( name,label,domain,scriptId,value,entityMatch ) { ; }
nlobjForm.prototype.addCredentialField = function( name,label,domain,scriptId,value ) { ; }

/**
 * add a subtab (nlobjTab) to this form and return it.
 *
 * @param {string} name subtab name
 * @param {string} label subtab label
 * @param {string} [tab] parent tab that this subtab lives on. If empty, it is added to the main tab.
 * @return {nlobjTab}
 *
 * @since 2008.2
 */
nlobjForm.prototype.addSubTab = function( name,label,tab ) { ; }

/**
 * add a sublist (nlobjSubList) to this form and return it.
 *
 * @param {string} name sublist name
 * @param {string} type sublist type: inlineeditor|editor|list|staticlist
 * @param {string} label sublist label
 * @param {string} [tab] parent tab that this sublist lives on. If empty, it is added to the main tab
 * @return {nlobjSubList}
 *
 * @since 2008.2
 */
nlobjForm.prototype.addSubList = function( name,type,label,tab ) { ; }

/**
 * insert a tab (nlobjTab) before another tab (name).
 *
 * @param {nlobjTab} 		tab the tab object to insert
 * @param {string} 		nexttab the name of the tab before which to insert this tab
 * @return {nlobjTab}
 *
 * @since 2008.2
 */
nlobjForm.prototype.insertTab = function( tab, nexttab ) { ; }

/**
 * insert a field (nlobjField) before another field (name).
 *
 * @param {nlobjField} 	field the field object to insert
 * @param {string} 		nextfld the name of the field before which to insert this field
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjForm.prototype.insertField = function( field, nextfld ) { ; }

/**
 * insert a subtab (nlobjTab) before another subtab or sublist (name).
 *
 * @param {nlobjTab}	subtab the subtab object to insert
 * @param {string} 	nextsubtab the name of the subtab before which to insert this subtab
 * @return {nlobjTab}
 *
 * @since 2008.2
 */
nlobjForm.prototype.insertSubTab = function( subtab, nextsubtab ) { ; }

/**
 * insert a sublist (nlobjSubList) before another subtab or sublist (name).
 *
 * @param {nlobjSubList}	sublist the sublist object to insert
 * @param {string} 		nextsublist the name of the sublist before which to insert this sublist
 * @return {nlobjSubList}
 *
 * @since 2008.2
 */
nlobjForm.prototype.insertSubList = function( sublist, nextsublist ) { ; }

/**
 * return a tab (nlobjTab) on this form.
 *
 * @param {string} name tab name
 * @return {nlobjTab}
 *
 * @since 2008.2
 */
nlobjForm.prototype.getTab = function( name ) { ; }

/**
 * return a field (nlobjField) on this form.
 *
 * @param {string} name field name
 * @param {string} [radio] if this is a radio field, specify which radio field to return based on radio value
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjForm.prototype.getField = function( name, radio ) { ; }

/**
 * return a subtab (nlobjTab) on this form.
 *
 * @param {string} name subtab name
 * @return {nlobjTab}
 *
 * @since 2008.2
 */
nlobjForm.prototype.getSubTab = function( name ) { ; }

/**
 * return a sublist (nlobjSubList) on this form.
 *
 * @param {string} name sublist name
 * @return {nlobjSubList}
 *
 * @since 2008.2
 */
nlobjForm.prototype.getSubList = function( name ) { ; }

/**
 * add a field group to the form.
 * @param {string} name field group name
 * @param {string} label field group label
 * @param tab
 * @return {nlobjFieldGroup}
 *
 * @method
 * @memberOf nlobjForm
 *
 * @since 2011.1
 */
nlobjForm.prototype.addFieldGroup = function( name, label, tab ) { ; }

/**
 * get a list of all tabs.
 * @return an array with names of all tabs
 *
 * @method
 * @memberOf nlobjForm
 *
 * @since 2012.2
 */
nlobjForm.prototype.getTabs = function( ) { ; }

/**
 * Return a new instance of nlobjAssistant.
 *
 * @classDescription UI Object page type used to build multi-step "assistant" pages to simplify complex workflows. All data and state for an assistant is tracked automatically
 * throughout the user's session up until completion of the assistant.
 *
 * @return {nlobjAssistant}
 * @constructor
 *
 * @since 2009.2
 */
function nlobjAssistant( ) { ; }
/**
 * set the page title.
 * @param {string} title
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setTitle = function( title ) { ; }

/**
 * set the script ID for Client Script used for this form.
 * @param {string, int} script script ID or internal ID for global client script used to enable Client SuiteScript on page
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setScript = function( script ) { ; }

/**
 * set the splash screen used for this page.
 * @param {string} title splash portlet title
 * @param {string} text1 splash portlet content (left side)
 * @param {string} [text2] splash portlet content (right side)
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setSplash = function( title, text1, text2 ) { ; }

/**
 * show/hide shortcut link. Always hidden on external pages
 * @param {boolean} show enable/disable "Add To Shortcut" link on this page
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setShortcut = function(show) { ; }

/**
 * set the values for all the fields on this page.
 * @param {Object} values Object of field name/value pairs used to set all fields on page
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setFieldValues = function( values ) { ; }

/**
 * if ordered, steps are show on left and must be completed sequentially, otherwise steps are shown on top and can be done in any order
 * @param {boolean} ordered	If true (default assistant behavior) then a navigation order thru the steps/pages will be imposed on the user. Otherwise the user
 * 							will be allowed to navigate across steps/pages in any order they choose.
 * @return  {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setOrdered = function(ordered) { ; }

/**
 * if numbered, step numbers are displayed next to the step's label in the navigation area
 * @param {boolean} numbered	If true (default assistant behavior) step numbers will be displayed next to the step label
 * @return  {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setNumbered = function(numbered) { ; }

/**
 * return true if all the steps have been completed.
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.isFinished = function( ) { ; }

/**
 * mark assistant page as completed and optionally set the rich text to display on completed page.
 * @param {string} html completion message (rich text) to display on the "Finish" page
 * @return  {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setFinished = function( html ) { ; }

/**
 * return true if the assistant has an error message to display for the current step.
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.hasError = function( ) { ; }

/**
 * set the error message for the currrent step.
 * @param {string} html error message (rich text) to display on the page to the user
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setError = function( html ) { ; }

/**
 * mark a step as current. It will be highlighted accordingly when the page is displayed
 * @param {nlobjAssistantStep} step assistant step object representing the current step that the user is on.
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setCurrentStep = function( step ) { ; }

/**
 * add a step to the assistant.
 * @param {string} name the name of the step
 * @param {string} label label used for this step
 * @return {nlobjAssistantStep}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.addStep = function( name, label ) { ; }

/**
 * add a field to this page and return it.
 * @param {string} name field name
 * @param {string} type field type
 * @param {string} [label] field label
 * @param {string, int} [source] script ID or internal ID for source list (select and multiselects only) -or- radio value for radio fields
 * @param {string} [group] group name that this field will live on. If empty then the field is added to the main section of the page
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.addField = function( name,type,label,source, group ) { ; }

/**
 * add a sublist to this page and return it. For now only sublists of type inlineeditor are supported
 * @param {string} name sublist name
 * @param {string} type sublist type (inlineeditor only for now)
 * @param {string} label sublist label
 * @return {nlobjSubList}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.addSubList = function( name,type,label ) { ; }

/**
 * add a field group to the page.
 * @param {string} name field group name
 * @param {string} label field group label
 * @return {nlobjFieldGroup}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.addFieldGroup = function( name, label ) { ; }

/**
 * return an assistant step on this page.
 * @param {string} name step name
 * @return {nlobjAssistantStep}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getStep = function( name ) { ; }

/**
 * return a field on this page.
 * @param {string} name field name
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getField = function( name ) { ; }

/**
 * return a sublist on this page.
 * @param {string} name sublist name
 * @return {nlobjSubList}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getSubList = function( name ) { ; }

/**
 * return a field group on this page.
 * @param {string} name field group name
 * @return {nlobjFieldGroup}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getFieldGroup = function( name ) { ; }

/**
 * return an array of all the assistant steps for this assistant.
 * @return {nlobjAssistantStep[]}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getAllSteps = function( ) { ; }

/**
 * return an array of the names of all fields on this page.
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getAllFields = function( ) { ; }

/**
 *  return an array of the names of all sublists on this page .
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getAllSubLists = function( ) { ; }

/**
 * return an array of the names of all field groups on this page.
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getAllFieldGroups = function( ) { ; }

/**
 * return the last submitted action by the user: next|back|cancel|finish|jump
 * @return {string}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getLastAction = function() { ; }

/**
 * return step from which the last submitted action came from
 * @return {nlobjAssistantStep}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getLastStep = function() { ; }

/**
 * return the next logical step corresponding to the user's last submitted action. You should only call this after
 * you have successfully captured all the information from the last step and are ready to move on to the next step. You
 * would use the return value to set the current step prior to continuing.
 *
 * @return {nlobjAssistantStep}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getNextStep = function() { ; }

/**
 * return current step set via nlobjAssistant.setCurrentStep(step)
 * @return {nlobjAssistantStep}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getCurrentStep = function() { ; }

/**
 * return the total number of steps in the assistant
 * @return {int}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getStepCount = function() { ; }

/**
 * redirect the user following a user submit operation. Use this to automatically redirect the user to the next logical step.
 * @param {nlobjResponse} response the response object used to communicate back to the user's client
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.sendRedirect = function(response) { ; }

/**
 * Return a new instance of nlobjField used for scriptable form/sublist field.
 * This object is READ-ONLY except for scripted fields created via the UI Object API using Suitelets or beforeLoad user events
 *
 * @classDescription Core descriptor for fields used to define records and also used to build pages and portlets.
 * @return {nlobjField}
 * @constructor
 */
function nlobjField( ) { ; }

/**
 *  return field name.
 *  @return {string}
 *
 * @method
 * @memberOf nlobjField
 *
 * @since 2009.2
 */
nlobjField.prototype.getName = function( ) { ; }

/**
 * return field label.
 * @return {string}
 *
 * @method
 * @memberOf nlobjField
 *
 * @since 2009.2
 */
nlobjField.prototype.getLabel = function( ) { ; }

/**
 * return field type.
 *  @return {string}
 *
 * @method
 * @memberOf nlobjField
 *
 * @since 2009.2
 */
nlobjField.prototype.getType = function( ) { ; }

/**
 * return true if field is hidden.
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjField
 *
 * @since 2009.2
 */
nlobjField.prototype.isHidden = function( ) { ; }

/**
 * return true if field is mandatory.
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjField
 *
 * @since 2009.2
 */
nlobjField.prototype.isMandatory = function( ) { ; }

/**
 * return true if field is disabled.
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjField
 *
 * @since 2009.2
 */
nlobjField.prototype.isDisabled = function( ) { ; }

/**
 * set the label for this field.
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {string} label
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setLabel = function( label ) { ; }

/**
 * set the alias used to set the value for this field. Defaults to field name.
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {string} alias column used to populate the field (mostly relevant when populating sublist fields)
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setAlias = function( alias ) { ; }

/**
 * set the default value for this field.
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {string} value
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setDefaultValue = function( value ) { ; }

/**
 * Disable field via field metadata.
 * This method is only supported on scripted fields via the UI Object API
 * @param {boolean} disabled if true then field should be disabled.
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjField
 *
 * @since 2009.2
 */
nlobjField.prototype.setDisabled = function( disabled ) { ; }

/**
 * make this field mandatory.
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {boolean} mandatory if true then field becomes mandatory
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setMandatory = function( mandatory ) { ; }

/**
 * set the maxlength for this field (only valid for certain field types).
 *  This method is only supported on scripted fields via the UI Object API
 *
 * @param {int} maxlength maximum length for this field
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setMaxLength = function( maxlength ) { ; }

/**
 * set the display type for this field.
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {string} type display type: inline|normal|hidden|disabled|readonly|entry
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setDisplayType = function( type ) { ; }

/**
 * set the break type (startcol|startrow|none) for this field. startrow is only used for fields with a layout type of outside
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {string} breaktype break type used to add a break in flow layout for this field: startcol|startrow|none
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjField
 *
 * @since 2009.2
 */
nlobjField.prototype.setBreakType = function( breaktype ) { ; }


/**
 * set the layout type and optionally the break type.
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {string} type layout type: outside|startrow|midrow|endrow|normal
 * @param {string} [breaktype] break type: startcol|startrow|none
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setLayoutType = function( type, breaktype ) { ; }

/**
 * set the text that gets displayed in lieu of the field value for URL fields.
 *
 * @param {string} text user-friendly display value in lieu of URL
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setLinkText = function( text ) { ; }

/**
 * set the width and height for this field.
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {int} width
 * @param {int} height
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setDisplaySize = function( width, height ) { ; }

/**
 * set the amount of emppty vertical space (rows) between this field and the previous field.
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {int} padding # of empty rows to display above field
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setPadding = function( padding ) { ; }

/**
 * set help text for this field. If inline is set on assistant pages, help is displayed inline below field
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {string} help	field level help content (rich text) for field
 * @param {string} [inline] if true then in addition to the popup field help, the help will also be displayed inline below field (supported on assistant pages only)
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjField
 *
 * @since 2009.2
 */
nlobjField.prototype.setHelpText = function( help, inline ) { ; }

/**
 * add a select option to this field (valid for select/multiselect fields).
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {string} value internal ID for this select option
 * @param {string} text display value for this select option
 * @param {boolean} [selected] if true then this select option will be selected by default
 * @since 2008.2
 */
nlobjField.prototype.addSelectOption = function( value, text, selected ) { ; }

/**
 * Return a new instance of nlobjSubList used for scriptable sublist (sublist).
 * This object is READ-ONLY except for instances created via the UI Object API using Suitelets or beforeLoad user events.
 *
 * @classDescription high level container for defining sublist (many to one) relationships on a record or multi-line data entry UIs on pages.
 * @return {nlobjSubList}
 * @constructor
 */
function nlobjSubList( ) { ; }

/**
 * set the label for this sublist.
 * This method is only supported on sublists via the UI Object API
 *
 * @param {string} label
 * @since 2008.2
 */
nlobjSubList.prototype.setLabel = function( label ) { ; }

/**
 * set helper text for this sublist.
 * This method is only supported on sublists via the UI Object API
 *
 * @param {string} help
 * @since 2008.2
 */
nlobjSubList.prototype.setHelpText = function( help ) { ; }

/**
 * set the displaytype for this sublist: hidden|normal.
 * This method is only supported on scripted or staticlist sublists via the UI Object API
 *
 * @param {string} type
 * @since 2008.2
 */
nlobjSubList.prototype.setDisplayType = function( type ) { ; }

/**
 * set the value of a cell in this sublist.
 *
 * @param {string} 	field sublist field name
 * @param {int} 	line  line number (1-based)
 * @param {string} 	value sublist value
 *
 * @method
 * @memberOf nlobjSubList
 *
 * @since 2008.2
 */
nlobjSubList.prototype.setLineItemValue = function( field, line, value ) { ; }

/**
 * set the value of a matrix cell in this sublist.
 * @param {string} 	field	matrix field name
 * @param {int} 	line 	line number (1-based)
 * @param {int} 	column  matrix column index (1-based)
 * @param {string} 	value   matrix field value
 * @return {void}
 *
 * @method
 * @memberOf nlobjSubList
 *
 * @since 2009.2
 */
nlobjSubList.prototype.setLineItemMatrixValue = function( field, line, column, value ) { ; }

/**
 * set values for multiple lines (Array of nlobjSearchResults or name-value pair Arrays) in this sublist.
 * Note that this method is only supported on scripted sublists via the UI Object API
 *
 * @param {string[][], nlobjSearchResult[]} values
 * @since 2008.2
 */
nlobjSubList.prototype.setLineItemValues = function( values ) { ; }

/**
 * Return the number of lines in a sublist.
 *
 * @param {string} group sublist name
 *
 * @method
 * @memberOf nlobjSubList
 * @since 2010.1
 */
nlobjSubList.prototype.getLineItemCount = function( group ) { ; }

/**
 * add a field (column) to this sublist.
 *
 * @param {string} name field name
 * @param {string} type field type
 * @param {string} label field label
 * @param {string, int} [source] script ID or internal ID for source list used for this select field
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjSubList
 *
 * @since 2008.2
 */
nlobjSubList.prototype.addField = function( name,type,label,source ) { ; }

/**
 * designate a field on sublist that must be unique across all lines (only supported on sublists of type inlineeditor, editor).
 * @param {string} fldnam the name of a field on this sublist whose value must be unique across all lines
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjSubList
 *
 * @since 2009.2
 */
nlobjSubList.prototype.setUniqueField = function( fldnam ) { ; }

/**
 * add a button to this sublist.
 *
 * @param {string} name button name
 * @param {string} label button label
 * @param {string} script button script (function name)
 * @return {nlobjButton}
 *
 * @method
 * @memberOf nlobjSubList
 *
 * @since 2008.2
 */
nlobjSubList.prototype.addButton = function( name, label, script ) { ; }

/**
 * add "Refresh" button to sublists of type "staticlist" to support manual refreshing of the sublist (without entire page reloads) if it's contents are very volatile
 * @return {nlobjButton}
 *
 * @method
 * @memberOf nlobjSubList
 *
 * @since 2009.2
 */
nlobjSubList.prototype.addRefreshButton = function( ) { ; }

/**
 * add "Mark All" and "Unmark All" buttons to this sublist of type "list".
 *
 * @method
 * @memberOf nlobjSubList
 *
 * @since 2008.2
 */
nlobjSubList.prototype.addMarkAllButtons = function( ) { ; }

/**
 * Return a new instance of nlobjColumn used for scriptable list column.
 *
 * @classDescription Class definition for columns used on lists and list portlets.
 * @return {nlobjColumn}
 * @constructor
 */
function nlobjColumn( ) { ; }

/**
 * set the header name for this column.
 *
 * @param {string} label the label for this column
 *
 * @method
 * @memberOf nlobjColumn
 *
 * @since 2008.2
 */
nlobjColumn.prototype.setLabel = function( label ) { ; }

/**
 * set the base URL (optionally defined per row) for this column.
 *
 * @param {string} value the base URL or a column in the datasource that returns the base URL for each row
 * @param {boolean} perRow if true then the 1st arg is expected to be a column in the datasource
 *
 * @method
 * @memberOf nlobjColumn
 *
 * @since 2008.2
 */
nlobjColumn.prototype.setURL = function( value, perRow ) { ; }

/**
 * add a URL parameter (optionally defined per row) to this column's URL.
 *
 * @param {string} param the name of a parameter to add to URL
 * @param {string} value the value of the parameter to add to URL -or- a column in the datasource that returns the parameter value for each row
 * @param {boolean} [perRow] if true then the 2nd arg is expected to be a column in the datasource
 *
 * @method
 * @memberOf nlobjColumn
 *
 * @since 2008.2
 */
nlobjColumn.prototype.addParamToURL = function( param, value, perRow ) { ; }

/**
 * Return a new instance of nlobjTab used for scriptable tab or subtab.
 *
 * @classDescription high level grouping for fields on a data entry form (nlobjForm).
 * @return {nlobjTab}
 * @constructor
 */
function nlobjTab( ) { ; }

/**
 * set the label for this tab or subtab.
 *
 * @param {string} label string used as label for this tab or subtab
 * @return {nlobjTab}
 *
 * @since 2008.2
 */
nlobjTab.prototype.setLabel = function( label ) { ; }

/**
 * set helper text for this tab or subtab.
 *
 * @param {string} help inline help text used for this tab or subtab
 * @return {nlobjTab}
 *
 * @since 2008.2
 */
nlobjTab.prototype.setHelpText = function( help ) { ; }

/**
 * Return a new instance of nlobjAssistantStep.
 *
 * @classDescription assistant step definition. Used to define individual steps/pages in multi-step workflows.
 * @return {nlobjAssistantStep}
 * @constructor
 *
 * @since 2009.2
 */
function nlobjAssistantStep( ) { ; }

/**
 * set the label for this assistant step.
 * @param {string} label display label used for this assistant step
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.setLabel = function( label ) { ; }

/**
 * set helper text for this assistant step.
 * @param {string} help inline help text to display on assistant page for this step
 * @return {nlobjAssistantStep}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.setHelpText = function( help ) { ; }

/**
 * return the index of this step in the assistant page (1-based)
 * @return  {int} the index of this step in the assistant (1-based) based on the order in which the steps were added.
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.getStepNumber = function( ) { ; }

/**
 * return the value of a field entered by the user during this step.
 * @param {string} name field name
 * @return {string}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.getFieldValue = function( name ) { ; }

/**
 * return the selected values of a multi-select field as an Array entered by the user during this step.
 * @param {string} name multi-select field name
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.getFieldValues = function( name ) { ; }

/**
 * return the number of lines previously entered by the user in this step (or -1 if the sublist does not exist).
 * @param {string} group sublist name
 * @return {int}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.getLineItemCount = function( group ) { ; }

/**
 * return the value of a sublist field entered by the user during this step.
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {int} 	line sublist (1-based)
 * @return  {string}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.getLineItemValue = function(group, name, line) { ; }

/**
 * return an array of the names of all fields entered by the user during this step.
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.getAllFields = function( ) { ; }

/**
 * return an array of the names of all sublists entered by the user during this step.
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.getAllLineItems = function( ) { ; }

/**
 * return an array of the names of all sublist fields entered by the user during this step
 * @param {string} group sublist name
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.getAllLineItemFields = function( group ) { ; }

/**
 * Return a new instance of nlobjFieldGroup (currently only supported on nlobjAssistant pages)
 *
 * @classDescription object used for grouping fields on pages (currently only supported on assistant pages).
 * @return {nlobjFieldGroup}
 * @constructor
 *
 * @since 2009.2
 */
function nlobjFieldGroup( ) { ; }

/**
 * set the label for this field group.
 * @param {string} label display label for field group
 * @return {nlobjFieldGroup}
 *
 * @method
 * @memberOf nlobjFieldGroup
 *
 * @since 2009.2
 */
nlobjFieldGroup.prototype.setLabel = function( label ) { ; }

/**
 * set collapsibility property for this field group.
 *
 * @param {boolean} collapsible if true then this field group is collapsible
 * @param {boolean} [defaultcollapsed] if true and the field group is collapsible, collapse this field group by default
 * @return {nlobjFieldGroup}
 *
 * @method
 * @memberOf nlobjFieldGroup
 *
 * @since 2009.2
 */
nlobjFieldGroup.prototype.setCollapsible = function( collapsible, defaultcollapsed ) { ; }

/**
 * set singleColumn property for this field group.
 *
 * @param {boolean} singleColumn if true then this field group is displayed in single column
 * @return {nlobjFieldGroup}
 *
 * @method
 * @memberOf nlobjFieldGroup
 *
 * @since 2011.1
 */
nlobjFieldGroup.prototype.setSingleColumn = function( singleColumn ) { ; }

/**
 * set showBorder property for this field group.
 *
 * @param {boolean} showBorder if true then this field group shows border including label of group
 * @return {nlobjFieldGroup}
 *
 * @method
 * @memberOf nlobjFieldGroup
 *
 * @since 2011.1
 */
nlobjFieldGroup.prototype.setShowBorder = function( showBorder ) { ; }

/**
 * Return a new instance of nlobjButton.
 *
 * @classDescription buttons used for triggering custom behaviors on pages.
 * @return {nlobjButton}
 * @constructor
 *
 * @since 2009.2
 */
function nlobjButton( ) { ; }

/**
 * set the label for this button.
 * @param {string} label display label for button
 * @return {nlobjButton}
 *
 * @method
 * @memberOf nlobjButton
 *
 * @since 2008.2
 */
nlobjButton.prototype.setLabel = function( label ) { ; }

/**
 * disable or enable button.
 * @param {boolean} disabled if true then this button should be disabled on the page
 * @return {nlobjButton}
 *
 * @method
 * @memberOf nlobjButton
 *
 * @since 2008.2
 */
nlobjButton.prototype.setDisabled = function( disabled ) { ; }

/**
 * Return a new instance of nlobjSelectOption.
 *
 * @classDescription select|radio option used for building select fields via the UI Object API and for describing select|radio fields.
 * @return {nlobjSelectOption}
 * @constructor
 *
 * @since 2009.2
 */
function nlobjSelectOption( ) { ; }

/**
 * return internal ID for select option
 * @return {string}
 *
 * @method
 * @memberOf nlobjSelectOption
 *
 * @since 2009.2
 */
nlobjSelectOption.prototype.getId = function( ) { ; }

/**
 * return display value for select option.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSelectOption
 *
 * @since 2009.2
 */
nlobjSelectOption.prototype.getText = function( ) { ; }

/**
 * @return nlobjLogin
 *
 * @since 2012.2
 */
function nlapiGetLogin( )   { ; }

/**
 * @param {string} newEmail new Email
 * @param {boolean} justThisAccount indicates whether to apply email change only to roles within this account or apply email change to its all NetSuite accounts and roles
 * @return {void}
 *
 * @since 2012.2
 */

nlobjLogin.prototype.changeEmail = function (currentPassword, newEmail, justThisAccount)  { ; }

/**
 * @param {string} newPassword new Password.
 * @return {void}
 *
 * @since 2012.2
 */
nlobjLogin.prototype.changePassword = function (currentPassword, newPassword) { ; }


/**
 * @param {string} Job Type
 * @return {nlobjJobManager}
 *
 * @since 2013.1
 */
function nlapiGetJobManager( jobType )   { ; }

/**
 * @return {nlobjJobRequest}
 *
 * @since 2013.1
 */
nlobjJobManager.prototype.createJobRequest = function ()  { ; }

/**
 * @param {nlobjJobRequest} Job request
 * @return {String} Job Id
 *
 * @since 2013.1
 */
nlobjJobManager.prototype.submit = function (request)  { ; }

/**
 * @param {String} Job Id
 * @return {nlobjFuture}
 *
 * @since 2013.1
 */
nlobjJobManager.prototype.getFuture = function (id)  { ; }

/**
 * Constant for Merge Duplicate recrods Entity Types
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.ENTITY_CUSTOMER = 'CUSTOMER';
nlobjDuplicateJobRequest.prototype.ENTITY_CONTACT = 'CONTACT';
nlobjDuplicateJobRequest.prototype.ENTITY_LEAD = 'LEAD';
nlobjDuplicateJobRequest.prototype.ENTITY_PROSPECT = 'PROSPECT';
nlobjDuplicateJobRequest.prototype.ENTITY_PARTNER = 'PARTNER';
nlobjDuplicateJobRequest.prototype.ENTITY_VENDOR = 'VENDOR';

/**
 * Constant for Merge Duplicate recrods Merge MASTERSELECTIONMODE
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.MASTERSELECTIONMODE_CREATED_EARLIEST = 'CREATED_EARLIEST';
nlobjDuplicateJobRequest.prototype.MASTERSELECTIONMODE_MOST_RECENT_ACTIVITY = 'MOST_RECENT_ACTIVITY';
nlobjDuplicateJobRequest.prototype.MASTERSELECTIONMODE_MOST_POPULATED_FIELDS = 'MOST_POPULATED_FIELDS';
nlobjDuplicateJobRequest.prototype.MASTERSELECTIONMODE_SELECT_BY_ID = 'SELECT_BY_ID';

/**
 * Constant for Merge Duplicate recrods Merge operation
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.OPERATION_MERGE = 'MERGE';
nlobjDuplicateJobRequest.prototype.OPERATION_DELETE = 'DELETE';
nlobjDuplicateJobRequest.prototype.OPERATION_MAKE_MASTER_PARENT = 'MAKE_MASTER_PARENT';
nlobjDuplicateJobRequest.prototype.OPERATION_MARK_AS_NOT_DUPES = 'MARK_AS_NOT_DUPES';
/**
 * @param {String} Entity Type
 * @return {void}
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.setEntityType = function( entityType ) { ; }

/**
 * @param {String} Master record ID
 * @return {void}
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.setMasterId = function( masterID ) { ; }

/**
 * @param {String} Criteria
 * @return {void}
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.setMasterSelectionMode = function( masterSelectionMode ) { ; }

/**
 * @param {String} Array of duplicate records IDs
 * @return {void}
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.setRecords = function( dupeRecords ) { ; }

/**
 * @param {String} Operation
 * @return {void}
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.setOperation = function( operation ) { ; }

/**
 * @return Entity Type
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.getEntityType = function( ) { ; }

/**
 * @return Master record ID
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.getMasterId = function( ) { ; }

/**
 * @return Master Selection Mode
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.getMasterSelectionMode = function( ) { ; }

/**
 * @return Array of duplicate records IDs
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.getRecords = function( ) { ; }

/**
 * @return Operation
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.getOperation = function( ) { ; }

/**
 * @return {boolean} status
 *
 * @since 2013.1
 */
nlobjFuture.prototype.isDone = function( ) { ; }

/**
 * @return {String} Job ID
 *
 * @since 2013.1
 */
nlobjFuture.prototype.getId = function( ) { ; }

/**
 * @return {boolean} cancelled or not
 *
 * @since 2013.1
 */
nlobjFuture.prototype.cancel = function( ) { ; }

/**
 * @return {boolean} is cancelled or not
 *
 * @since 2013.1
 */
nlobjFuture.prototype.isCancelled = function( ) { ; }

/**
 * @param {string} key
 * @param {string} value
 * @param {int} ttl, time to live in seconds.
 * @return {Object} status.
 *
 * @since 2013.2
 */
nlobjCache.prototype.put = function (key, value, ttl) {;}


/**
 * @param {string} key
 * @return {String}  value associate with that key.
 *
 * @since 2013.2
 */
nlobjCache.prototype.get = function (key) {;}


/**
 * @param {string} key
 * @return {Object} status.
 *
 * @since 2013.2
 */
nlobjCache.prototype.remove = function (key) {;}


/**
 * Following are just type declarations so this file can be included in unit tests and slightly more syntax correct
 */
function nlobjSubrecord() {;}
function nlobjTemplateRenderer() {;}
function nlobjLogin() {;}
function nlobjJobManager() {;}
function nlobjDuplicateJobRequest() {;}
function nlobjFuture() {;}
function nlobjCache() {;}