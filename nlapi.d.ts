/**
 * this was seeded from Brett Knights open source here https://github.com/BKnights/KotN-Netsuite/edit/master/SuiteScriptAPITS.d.ts
 */


//TODO: add help for text for everything declared here!

declare function nlapiCopyRecord(type:string, id:string, initializeValues?:Object): nlobjRecord;
declare function nlapiLoadRecord(type: string, id: string, initializeValues? : any): nlobjRecord;
declare function nlapiCreateRecord(type: string, initializeValues?: any): nlobjRecord;
declare function nlapiSubmitRecord(record :nlobjRecord, doSourcing? : boolean, ignoreMandatoryFields? : boolean): string;
declare function nlapiSubmitRecord(record :nlobjRecord, overrides? : Object): string;
declare function nlapiSubmitRecord(record :nlobjRecord, overrides : serverSubmitRecordFlags): string;
declare function nlapiSubmitRecord(record :nlobjRecord, overrides : clientSubmitRecordFlags): string;

declare function nlapiDeleteRecord(type : string, id : string): void;
declare function nlapiSearchRecord(type : string, searchid? : number, srchFilter? : nlobjSearchFilter, column? : nlobjSearchColumn): nlobjSearchResult[];
declare function nlapiSearchRecord(type : string, searchid? : number, srchFilter? : nlobjSearchFilter, columns? : nlobjSearchColumn[]): nlobjSearchResult[];
declare function nlapiSearchRecord(type : string, searchid? : number, srchFilters? : nlobjSearchFilter[], column? : nlobjSearchColumn): nlobjSearchResult[];
declare function nlapiSearchRecord(type : string, searchid? : number, srchFilters? : nlobjSearchFilter[], columns? : nlobjSearchColumn[]): nlobjSearchResult[];
declare function nlapiSearchRecord(type : string, searchid? : string, srchFilter? : nlobjSearchFilter, column? : nlobjSearchColumn): nlobjSearchResult[];
declare function nlapiSearchRecord(type : string, searchid? : string, srchFilter? : nlobjSearchFilter, columns? : nlobjSearchColumn[]): nlobjSearchResult[];
declare function nlapiSearchRecord(type : string, searchid? : string, srchFilters? : nlobjSearchFilter[], column? : nlobjSearchColumn): nlobjSearchResult[];
declare function nlapiSearchRecord(type : string, searchid? : string, srchFilters? : nlobjSearchFilter[], columns? : nlobjSearchColumn[]): nlobjSearchResult[];
declare function nlapiCreateSearch(type : string, srchFilters? : nlobjSearchFilter[], columns? : nlobjSearchColumn[]): nlobjSearch;
declare function nlapiLoadSearch(type:string, id:string):nlobjSearch;
declare function nlapiSearchGlobal(keywords :string): any[];
declare function nlapiSearchDuplicate(type :string, fields :string[], id :string): any[];
declare function nlapiTransformRecord(type :string, id : string, transformType : string, transformValues? : Object): nlobjRecord;
declare function nlapiTransformRecord(type :string, id : number, transformType : string, transformValues? : Object): nlobjRecord;
declare function nlapiLookupField(type :string , id :string, fields :string[], text?: boolean): any;
declare function nlapiLookupField(type :string , id :string, field :string, text?: boolean): string;
declare function nlapiSubmitField(type : string, id : string, fields : string[], values : string[], doSourcing? : boolean): void;
declare function nlapiSubmitField(type : string, id : string, field : string, value : string, doSourcing? : boolean): void;
declare function nlapiSubmitField(type : string, id : string, fields : string[], values : string[], props:serverSubmitFieldFlags): void;
declare function nlapiSubmitField(type : string, id : string, field : string, value : string, props:serverSubmitFieldFlags): void;
declare function nlapiSubmitField(type : string, id : string, fields : string[], values : string[], props:clientSubmitFieldFlags): void;
declare function nlapiSubmitField(type : string, id : string, field : string, value : string, props:clientSubmitFieldFlags): void;
declare function nlapiAttachRecord(type1 : string, id1 :string, type2 :string, id2 :string, properties? : Object): void;
declare function nlapiDetachRecord(type1 :string, id1 :string, type2 :string, id2 :string, properties: Object): void;
declare function nlapiResolveURL(type :string, subtype : string, id? : string, pagemode? : boolean): string;
declare function nlapiSetRedirectURL(type : string, subtype : string, id? : string, pagemode? : boolean, parameters? : Object): void;
declare function nlapiRequestURL(url : string, postdata? : any , headers? : any, callbackOrMethod? : any, httpMethod? : string): nlobjResponse;
declare function nlapiGetContext() : nlobjContext;
declare function nlapiGetUser() : string;
declare function nlapiGetRole() : string;
declare function nlapiGetDepartment(): void;
declare function nlapiGetLocation(): void;
declare function nlapiGetSubsidiary(): void;
declare function nlapiGetRecordType(): string;
declare function nlapiGetRecordId(): string;
declare function nlapiSendEmail(from : string, to : string, subject : string, body : string, cc? : any, bcc? : any, records? : any, files? : any, notifySenderOnBounce?:boolean, internalOnly?:boolean, replyTo?:string): void;
declare function nlapiSendCampaignEmail(campaigneventid :string, recipientid :string): void;
declare function nlapiSendFax(from :string, to :string, subject :string, body :string, records :string, files :string[]): void;
declare function nlapiGetField(fldnam :string): void;
declare function nlapiGetMatrixField(type :string, fldnam :string, column :string): void;
declare function nlapiGetLineItemField(type : string, fldnam : string, linenum : number): nlobjField;
declare function nlapiGetLineItemMatrixField(type : string, fldnam : string, linenum : number, column : number) : string;
declare function nlapiGetFieldValue(fldnam : string) : string;
declare function nlapiSetFieldValue(fldnam : string, value : string, firefieldchanged? : boolean, synchronous? : boolean): void;
declare function nlapiSetFieldValue(fldnam : string, value : number, firefieldchanged? : boolean, synchronous? : boolean): void;
declare function nlapiGetFieldText(fldnam : string): string;
declare function nlapiSetFieldText(fldnam : string, txt : string, firefieldchanged? : boolean, synchronous? : boolean): void;
declare function nlapiGetFieldValues(fldnam : string): string[];
declare function nlapiSetFieldValues(fldnam : string, values : string[], firefieldchanged? : boolean, synchronous? : boolean): void;
declare function nlapiGetFieldTexts(fldnam : string): string[];
declare function nlapiSetFieldTexts(fldnam :string, texts:string[], firefieldchanged?:boolean, synchronous?:boolean): void;
declare function nlapiGetMatrixValue(type :string, fldnam :string, column :string) : string;
declare function nlapiSetMatrixValue(type :string, fldnam :string, column :string, value :string, firefieldchanged? :boolean, synchronous?:boolean): void;
declare function nlapiGetCurrentLineItemMatrixValue(type :string, fldnam :string, column :string) : string;
declare function nlapiSetCurrentLineItemMatrixValue(type :string, fldnam :string, column :string, value :string, firefieldchanged?:boolean, synchronous?:boolean) : string;
declare function nlapiGetLineItemMatrixValue(type :string, fldnam :string, linenum:number, column :string) : string;
declare function nlapiGetLineItemValue(type : string, fldnam : string, linenum : number): string;
declare function nlapiSetLineItemValue(type : string, fldnam : string, linenum : number, value : string): void;
declare function nlapiGetLineItemText(type : string, fldnam : string, linenum : number): string;
declare function nlapiFindLineItemValue(type :string, fldnam :string, val :string): void;
declare function nlapiFindLineItemMatrixValue(type :string, fldnam :string, column:number, val :string): void;
declare function nlapiGetMatrixCount(type :string, fldnam :string): number;
declare function nlapiGetLineItemCount(type :string): number;
declare function nlapiInsertLineItem(type :string, line:number): void;
declare function nlapiRemoveLineItem(type :string, line:number): void;
declare function nlapiSetCurrentLineItemValue(type : string, fldnam :string, value :string, firefieldchanged? : boolean, synchronous? : boolean) : void;
declare function nlapiSetCurrentLineItemValue(type : string, fldnam :string, value :number, firefieldchanged? : boolean, synchronous? : boolean) : void;
declare function nlapiSetCurrentLineItemText(type : string, fldnam :string, txt :string, firefieldchanged? : boolean, synchronous? : boolean) : void;
declare function nlapiGetCurrentLineItemValue(type :string, fldnam :string) : string;
declare function nlapiGetCurrentLineItemText(type :string, fldnam :string) : string;
declare function nlapiGetCurrentLineItemIndex(type :string): void;
declare function nlapiSetLineItemDisabled(type :string, fldnam :string, disable:boolean, linenum:number): void;
declare function nlapiDisableLineItemField(type : string, fldnam : string, val : boolean) : void;
declare function nlapiGetFieldMandatory(fldnam :string): void;
declare function nlapiGetLineItemMandatory(type :string, fldnam :string): void;
declare function nlapiSetFieldMandatory(fldnam :string, mandatory:boolean): void;
declare function nlapiSetLineItemMandatory(type :string, fldnam :string, mandatory:boolean): void;
declare function nlapiSelectLineItem(type :string, linenum:number): void;
declare function nlapiCommitLineItem(type :string): void;
declare function nlapiCancelLineItem(type :string): void;
declare function nlapiSelectNewLineItem(type :string): void;
declare function nlapiRefreshLineItems(type :string): void;
declare function nlapiInsertSelectOption(fldnam :string, value :string, text :string, selected:boolean): void;
declare function nlapiRemoveSelectOption(fldnam :string, value :string): void;
declare function nlapiInsertLineItemOption(type :string, fldnam :string, value :string, text:string, selected:boolean): void;
declare function nlapiRemoveLineItemOption(type :string, fldnam :string, value :string): void;
declare function nlapiIsLineItemChanged(type :string): boolean;
declare function nlapiGetNewRecord(): nlobjRecord;
declare function nlapiGetOldRecord(): nlobjRecord;
declare function nlapiCreateError(code : string, details :string, suppressEmail? : boolean): nlobjError;
declare function nlapiCreateForm(title : string, hideHeader? :boolean): nlobjForm;
declare function nlapiCreateList(title: string, hideHeader? :boolean): nlobjList;
declare function nlapiCreateAssistant(title: string, hideHeader:boolean): void;
declare function nlapiLoadFile(id :string): nlobjFile;
declare function nlapiSubmitFile(file : nlobjFile): string;
declare function nlapiDeleteFile(id: string): void;
declare function nlapiCreateFile(name: string, type :string, contents: string): nlobjFile;
declare function nlapiMergeRecord(id : string, baseType : string, baseId : string, altType? : string, altId? : string, fields? :Object): nlobjFile;
declare function nlapiPrintRecord(type : string, id : string, format : string, properties?:Object): nlobjFile;
declare function nlapiXMLToPDF(input:string): nlobjFile;
declare function nlapiCreateTemplateEngine(type :string, enginetype :string): void;
declare function nlapiCreateTemplateRenderer() : nlobjTemplateRenderer;
declare function nlapiLogExecution(type : string, title : string, details? : any): void;
declare function nlapiScheduleScript(script :string , deployment :string, parameters? : any):string;
declare function nlapiOutboundSSO(ssoAppKey:string): void;
declare function nlapiLoadConfiguration(type :string): nlobjConfiguration;
declare function nlapiSubmitConfiguration(setup:nlobjConfiguration): void;
declare function nlapiStringToDate(str : string, format? : string): Date;
declare function nlapiDateToString(d: Date, formattype? : string): string;
declare function nlapiAddDays(d:Date, days:number): Date;
declare function nlapiAddMonths(d:Date, months:number): Date;
declare function nlapiFormatCurrency(str:string): string;
declare function nlapiEncrypt(s:string, algo?:string, key?:string): string;
declare function nlapiEscapeXML(text : string): string;
declare function nlapiStringToXML(str : string): Node;
declare function nlapiXMLToString(xml : Node): string;
declare function nlapiSelectValue(node :Node, xpath : string): string;
declare function nlapiSelectValues(node:Node, path : string): string [];
declare function nlapiSelectNode(node:Node, path : string): Node;
declare function nlapiSelectNodes(node:Node, path : string): Node[];
declare function nlapiExchangeRate(fromCurrency :string, toCurrency :string, date:string): void;
declare function nlapiInitiateWorkflow(recordtype :string, id :string, workflowid :string): void;
declare function nlapiTriggerWorkflow(recordtype :string, id :string, workflowid :string, actionid :string): void;
declare function nlapiCreateCurrentLineSubrecord(type :string, fldnam :string): void;
declare function nlapiEditCurrentLineItemSubrecord(type :string, fldnam :string): void;
declare function nlapiRemoveCurrentLineItemSubrecord(type :string, fldnam :string): void;
declare function nlapiViewCurrentLineItemSubrecord(type :string, fldnam :string): void;
declare function nlapiViewLineItemSubrecord(type :string, fldnam :string, linenum:number): void;
declare function nlapiDisableField(fldnam: string, disabled: boolean) : void;
declare function createSubrecord(fldnam :string): void;
declare function editSubrecord(fldnam :string): void;
declare function removeSubrecord(fldnam :string): void;
declare function viewSubrecord(fldnam :string): void;

/*
 function nlobjRecord(): void;
 function nlobjConfiguration(): void;
 function nlobjFile(): void;
 function nlobjSearchResult(): void;
 function nlobjContext(): void;
 function nlobjError(): void;
 function nlobjServerResponse(): void;
 function nlobjPortlet(): void;
 function nlobjList(): void;
 function nlobjForm(): void;
 function nlobjAssistant(): void;
 function nlobjField(): void;
 function nlobjSubList(): void;
 function nlobjColumn(): void;
 function nlobjTab(): void;
 function nlobjAssistantStep(): void;
 function nlobjFieldGroup(): void;
 function nlobjButton(): void;
 function nlobjSelectOption(): void;
 */

interface yieldResult {status: string; reason : string; size : number; information : string; }
interface serverSubmitRecordFlags {disabletriggers:boolean; enablesourcing?:boolean; ignoremandatoryfields?:boolean;}
interface serverSubmitFieldFlags {disabletriggers:boolean; enablesourcing?:boolean;}
interface clientSubmitRecordFlags {disableTriggers:boolean; enableSourcing?:boolean; ignoreMandatoryfields?:boolean;}
interface clientSubmitFieldFlags {disableTriggers:boolean; enableSourcing?:boolean;}

declare function nlapiYieldScript() : yieldResult;
declare function nlapiSetRecoveryPoint() : yieldResult;

declare function nlapiCreateCSVImport():nlobjCSVImport;
declare function nlapiSubmitCSVImport(impt:nlobjCSVImport):string;

interface  nlobjError{
    getCode() : string;
    getDetails() : string;
    getId() : string;
    getInternalId() : number;
    getStackTrace() : string[];
    getUserEvent() : string;
}

interface nlobjFile{
    getDescription() : string;
    getFolder() : string;
    getId() : string;
    getName() : string;
    getSize() : number;
    getType() : string;
    getURL() : string;
    getValue() : string;
    isInactive() : boolean;
    isOnline() : boolean;
    setDescription(description : string) : void;
    setEncoding(encodingType : string) : void;
    setFolder(id : string) : void;
    setIsInactive(inactive : boolean) : void;
    setIsOnline(online: boolean) : void;
    setName(name: string) : void;
}

interface nlobjConfiguration{
    getAllFields() :string[];
    getField(fldnam:string):nlobjField;
    getFieldText(name:string):string;
    getFieldTexts(name:string):string[];
    getFieldValue(name:string):string;
    getFieldValues(name:string):string[];
    getType():string;
    setFieldText(name:string, text:string):void;
    setFieldTexts(name:string, text:string[]):void;
    setFieldValue(name:string, value:string):void;
    setFieldValues(name:string, value:string[]):void;
}

interface nlobjCSVImport{
    setLinkedFile(sublist:string, file:string):void;
    setMapping(savedImport:string):void;
    setOption(option:string, value:string):void;
    setPrimaryFile(file:string):void;
    setPrimaryFile(file:nlobjFile):void;
    setQueue(queueNum:string):void;
}

declare class nlobjSearchColumn{
    constructor(name : string, join? :string, summary?: string);

    getFormula() : string;
    getFunction() : string;
    getJoin() : string;
    getLabel() : string;
    getName() : string;
    getSort() : string;
    getSummary() : string;
    setFormula(formula : string) : nlobjSearchColumn;
    setFunction(functionid : string) : nlobjSearchColumn;
    setLabel(label : string) : nlobjSearchColumn;
    setSort(order? : boolean) : nlobjSearchColumn;
    setWhenOrderedBy(name : string, join : string) : nlobjSearchColumn;
}
declare class nlobjSearchFilter{
    constructor(name : string, join:string, operator:string, value?:string, value2?:string, leftParens? : number, rightParens? : number, useOr? :boolean, useNot? : boolean);
    constructor(name : string, join:string, operator:string, value?:string[], leftParens? : number, rightParens? : number, useOr? :boolean, useNot? : boolean);
    constructor(name : string, join:string, operator:string, value?:number, value2?:number, leftParens? : number, rightParens? : number, useOr? :boolean, useNot? : boolean);
    getFormula() : string;
    getJoin() : string;
    getName() : string;
    getSummaryType() : string;
    getOperator() : string;
    setFormula(formula : string) : nlobjSearchFilter;
    setSummaryType(type : string) : nlobjSearchFilter;
}

interface nlobjSearchResultSet{
    forEachResult(callback:(res:nlobjSearchResult) => boolean):void;
    getColumns() : nlobjSearchColumn[];
    getResults(start : number, end : number) : nlobjSearchResult[];
}

interface nlobjSearch{

    addColumn(column : nlobjSearchColumn) : void;
    addColumns(columns : nlobjSearchColumn[]): void;
    addFilter(filter : nlobjSearchFilter) : void;
    addFilters(filters : nlobjSearchFilter[]) : void;
    deleteSearch() : void;
    getColumns() : nlobjSearchColumn[];
    getFilterExpression() : Object[];
    getFilters() :nlobjSearchFilter[];
    getId() : string;
    getIsPublic() : boolean;
    getScriptId() : string;
    getSearchType() :string;
    runSearch() : nlobjSearchResultSet;
    saveSearch(title? :string, scriptId? :string) : string;
    setColumns(columns : nlobjSearchColumn[]) : void;
    setFilterExpression(filterExpression : Object[]) : void;
    setFilters(filters : nlobjSearchFilter[]):void;
    setIsPublic(type : boolean) : void;
    setRedirectURLToSearch(type : string, subtype : string, id? : string, pagemode? : boolean, parameters? : Object) : void;
    setRedirectURLToSearchResults(type : string, subtype : string, id? : string, pagemode? : boolean, parameters? : Object) : void;
}

interface nlobjSelectOption{
    getId() : number;
    getText() : string;
}

interface nlobjField{

    addSelectOption(value : string, text : string, selected?:boolean) : void;
    getLabel() : string;
    getName() : string;
    getSelectOptions(filter? : string, filteroperator? : string) : nlobjSelectOption[];
    getType() : string;
    setAlias(alias : string) : nlobjField;
    setBreakType(breaktype : string) : nlobjField;
    setDefaultValue(value : string) : nlobjField;
    setDisplaySize(width : number, height? : number) : nlobjField;
    setDisplayType(type : string) : nlobjField;
    setHelpText(help : string, inline? : boolean) : nlobjField;
    setLabel(label : string) : nlobjField;
    setLayoutType(type : string, breaktype : string) : nlobjField;
    setLinkText(text : string) : nlobjField;
    setMandatory(mandatory : boolean) : nlobjField;
    setMaxLength(maxlength : number) : nlobjField;
    setPadding(padding : number) : nlobjField;
}

interface nlobjButton{
    setDisabled(disabled:boolean):void;
    setLabel(label:string):void;
    setVisible(visible:boolean):void	;
}


interface nlobjFieldGroup{
    setCollapsible(collapsible:boolean, hidden:boolean):void;
    setLabel(label:string):void;
    setShowBorder(show:boolean):void;
    setSingleColumn(column:boolean):void;
}

interface nlobjSubList{

    addButton(name : string, label : string, script? : string) : nlobjButton;
    addField(name : string, type : string, label : string, source? : string) : nlobjField;
    addMarkAllButtons() : void;
    addRefreshButton() : nlobjButton;
    getLineItemCount(group) : number;
    getLineItemValue(group, fldnam :string, linenum:number) : string;
    setAmountField(field : string);
    setDisplayType(type : string);
    setHelpText(help : string);
    setLabel(label : string);
    setLineItemValue(name : string, linenum : number,value : string);
    setLineItemValues(values: any[]);
    setUniqueField(name : string);
}
interface nlobjForm{

    addButton(name : string, label : string, script? : string) : nlobjButton;
    addCredentialField(id : string, label : string, website? : string, scriptId? : string, value? : string, entityMatch? : boolean, tab? : string) : nlobjField;
    addField(name : string, type : string, label? : string, sourceOrRadio? : string, tab? : string) : nlobjField;
    addFieldGroup(name : string, label : string, tab? : string) : nlobjFieldGroup;
    addPageLink(type :string, title, url);
    addResetButton(label);
    addSubList(name : string, type : string, labe? : string, tab? : string) : nlobjSubList;
    addSubmitButton(label);
    addSubTab(name, label, tab);
    addTab(name, label);
    getButton(name);
    getField(name, radio?) : nlobjField;
    getSubList(name) : nlobjSubList;
    getSubTab(name);
    getTab(name);
    getTabs();
    insertField(field, nextfld);
    insertSubList(sublist, nextsub);
    insertSubTab(subtab, nextsub);
    insertTab(tab, nexttab);
    removeButton(name);
    setFieldValues(values);
    setScript(script);
    setTitle(title)	;
}

interface nlobjRecord{

    commitLineItem(group : string);
    createCurrentLineItemSubrecord(sublist : string, fldname : string);
    createSubrecord(fldname : string);
    editCurrentLineItemSubrecord(sublist : string, fldname : string);
    getCurrentLineItemValues(type : string, fldname : string) : string[];
    editSubrecord(fldname : string);
    findLineItemMatrixValue(group : string, fldnam : string, column : string, val : string);
    findLineItemValue(group : string, fldnam : string, value : string);
    getAllFields();
    getAllLineItemFields(group : string);
    getCurrentLineItemMatrixValue(group : string, fldnam : string, column : string) : string;
    getField(fldnam : string) : nlobjField;
    getFieldText(name : string) : string;
    getFieldTexts(name : string) : string[];
    getFieldValue(name : string) : string;
    getFieldValues(name : string) : string[];
    getId() : string;
    getLineItemCount(group : string) : number;
    getLineItemField(group : string, fldnam : string, linenum : number) : nlobjField;
    getLineItemMatrixField(group : string, fldnam : string, linenum : number, column : string) : nlobjField;
    getLineItemMatrixValue(group : string, fldnam : string, lineum : number, column : string) : string;
    getLineItemText(group : string, fldnam : string, linenum : number) : string;
    getLineItemValue(group, name, linenum:number) : string;
    getLineItemValues(type :string, fldname, linenum:number) : string[];
    getMatrixCount(group, fldnam :string) : number;
    getMatrixField(group, fldname, column);
    getMatrixValue(group, fldnam :string, column);
    getRecordType() : string;
    insertLineItem(group, linenum:number);
    removeLineItem(group, linenum:number);
    removeCurrentLineItemSubrecord(sublist, fldname);
    removeSubrecord(fldname);
    selectLineItem(group, linenum:number);
    selectNewLineItem(group);
    setCurrentLineItemMatrixValue(group, fldnam :string, column, value :string);
    setCurrentLineItemValue(group, name, value :string);
    setFieldText(name :string, text :string);
    setFieldTexts(name :string, text :string);
    setFieldValue(name :string, value :string);
    setFieldValues(name :string, value :string);
    setLineItemValue(group :string, name :string, linenum :number, value :string);
    setMatrixValue(group, fldnam :string, column :string, value :string);
    viewCurrentLineItemSubrecord(sublist :string, fldname :string);
    viewLineItemSubrecord(sublist :string, fldname :string, linenum :number);
    viewSubrecord(fldname :string);


}

interface nlobjSearchResult{
    getAllColumns() : nlobjSearchColumn[];
    getId() : string;
    getRecordType() : string;
    getText(column : nlobjSearchColumn) : string;
    getText(name : string, join? : string, summary? : string) : string;
    getValue(name : string, join? : string, summary? : string) : string;
    getValue(column : nlobjSearchColumn) : string;
}

interface nlobjRequest{
    getParameter( name : string) : string;
    getParameterValues( name : string ) : string[];
    getAllParameters() : string[];
    getLineItemValue( group : string, name : string, line : number ) : string;
    getLineItemCount( group : string ) : number;
    getHeader( name: string ):string;
    getAllHeaders: any;
    getFile() : nlobjFile;
    getAllFiles() : nlobjFile[];
    getBody() : string;
    getURL() :string;
    getMethod() :string;
}

interface nlobjResponse {
    addHeader(name : string, value : string) : void;
    getAllHeaders() : any;
    getBody() : string;
    getCode() : string;
    getError() : nlobjError;
    getHeader(name : string) : string;
    getHeaders(name : string) : string[];
    setContentType(type : string, name? : string, disposition? : string) :void;
    setHeader(name : string, value : string) : void;
    sendRedirect(type : string, identifier : string, id? : string, editmode? : boolean, parameters? : any) : void;
    write(output : any) : void;
    writeLine(output : string) : void;
    writePage(pageobject : any) : void;
}

interface nlobjColumn{
    addParamToURL(param: string, value: string, dynamic?:boolean) : void;
    setLabel(label:string) : void;
    setURL(url: string, dynamic?:boolean) : void;
}

interface nlobjList{


    addButton(name:string, label:string, script?:string):void;
    addColumn(name:string, type:string, label:string, align?:string) : nlobjColumn;
    addEditColumn(column:nlobjColumn, showView?:boolean, showHrefCol?:boolean);
    addPageLink(type:string, title:string, url:string):void;

    addRow(row:Object):void;
    addRow(row:nlobjSearchResult):void;

    addRows(row:Object[]):void;
    addRows(row:nlobjSearchResult[]):void;


    setScript(script:string) :void;

    setStyle(style:string) :void;

    setTitle(title:string) : void;

}

interface nlobjContext {

    getColorPreferences() : {buttonbackground : string;
        text : string;
        portlet : string;
        portletlabel : string;
        crumbtext : string;
        inactivetab : string;
        link : string;
        backgroundrequiredfld : string;
        inactivetextontab : string;
        textontab : string;
        bodybackground : string;
        headbackground : string;
        shadedbackground : string;
        headerbar : string;
        shadedborder : string;
        activetab : string;
    };
    getCompany() : string;
    getDepartment() : string;
    getDeploymentId() : string;
    getEmail() : string;
    getEnvironment() : string;
    getExecutionContext() : string;
    getFeature(name : string) : boolean;
    getLocation() : number;
    getLogLevel() : string;
    getName() : string;
    getPercentComplete() : number;
    getPermission(name : string) : number;
    getPreference(name : string) : string;
    getQueueCount() : number;
    getRemainingUsage() : number;
    getRole() : string;
    getRoleCenter() : string;
    getRoleId() : string;
    getScriptId() : string;
    getSessionObject(name : string) : any;
    getSetting(type : string, name : string) : string;
    getSubsidiary() : number;
    getUser() : string;
    getVersion() : string;
    setPercentComplete(pct :number) : void;
    setPercentComplete(pct :string) : void;
    setSessionObject(name : string, value : any) :void;
    setSetting(type : string, name : string, value : string) : void;

}

interface nlobjTemplateRenderer{
    setTemplate(templateBody : string) : void;
    addRecord(varName:string, record:nlobjRecord) : void;
    addSearchResults(varName:string, resultSet: nlobjSearchResult[]) :void;
    renderToString() : string;
    renderToResponse(resp:nlobjResponse) : void;
}


