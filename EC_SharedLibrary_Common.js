/**
 * Copyright Explore Consulting, LLC
 *
 * Utility library with functions that can be used for both client and server side SuiteScript
 */
// declare Explore 'namespace' if it's not already defined
if (typeof EC == "undefined" || !EC) {
    var EC = {};
}

/**
 * Represents US states. First one is blank I presume to allow easy binding to a UI dropdown?
 * @type {{id,name,abbrev}}
 */
var stateInfo = [ { name: "", id: "", abbrev: ""},
    {name: "Alabama", id: 0, abbrev: "AL"},
    {name: "Alaska", id: 1, abbrev: "AK"},
    {name: "Arizona", id: 2, abbrev: "AZ"},
    {name: "Arkansas", id: 3, abbrev: "AR"},
    {name: "Armed Forces Americas", id: 53, abbrev: "AA"},
    {name: "Armed Forces Europe", id: 52, abbrev: "AE"},
    {name: "Armed Forces Pacific", id: 54, abbrev: "AP"},
    {name: "California", id: 4, abbrev: "CA"},
    {name: "Colorado", id: 5, abbrev: "CO"},
    {name: "Connecticut", id: 6, abbrev: "CT"},
    {name: "Delaware", id: 7, abbrev: "DE"},
    {name: "District of Columbia", id: 8, abbrev: "DC"},
    {name: "Florida", id: 9, abbrev: "FL"},
    {name: "Georgia", id: 10, abbrev: "GA"},
    {name: "Hawaii", id: 11, abbrev: "HI"},
    {name: "Idaho", id: 12, abbrev: "ID"},
    {name: "Illinois", id: 13, abbrev: "IL"},
    {name: "Indiana", id: 14, abbrev: "IN"},
    {name: "Iowa", id: 15, abbrev: "IA"},
    {name: "Kansas", id: 16, abbrev: "KS"},
    {name: "Kentucky", id: 17, abbrev: "KY"},
    {name: "Louisiana", id: 18, abbrev: "LA"},
    {name: "Maine", id: 19, abbrev: "ME"},
    {name: "Maryland", id: 20, abbrev: "MD"},
    {name: "Massachusetts", id: 21, abbrev: "MA"},
    {name: "Michigan", id: 22, abbrev: "MI"},
    {name: "Minnesota", id: 23, abbrev: "MN"},
    {name: "Mississippi", id: 24, abbrev: "MS"},
    {name: "Missouri", id: 25, abbrev: "MO"},
    {name: "Montana", id: 26, abbrev: "MT"},
    {name: "Nebraska", id: 27, abbrev: "NE"},
    {name: "Nevada", id: 28, abbrev: "NV"},
    {name: "New Hampshire", id: 29, abbrev: "NH"},
    {name: "New Jersey", id: 30, abbrev: "NJ"},
    {name: "New Mexico", id: 31, abbrev: "NM"},
    {name: "New York", id: 32, abbrev: "NY"},
    {name: "North Carolina", id: 33, abbrev: "NC"},
    {name: "North Dakota", id: 34, abbrev: "ND"},
    {name: "Ohio", id: 35, abbrev: "OH"},
    {name: "Oklahoma", id: 36, abbrev: "OK"},
    {name: "Oregon", id: 37, abbrev: "OR"},
    {name: "Pennsylvania", id: 38, abbrev: "PA"},
    {name: "Puerto Rico", id: 39, abbrev: "PR"},
    {name: "Rhode Island", id: 40, abbrev: "RI"},
    {name: "South Carolina", id: 41, abbrev: "SC"},
    {name: "South Dakota", id: 42, abbrev: "SD"},
    {name: "Tennessee", id: 43, abbrev: "TN"},
    {name: "Texas", id: 44, abbrev: "TX"},
    {name: "Utah", id: 45, abbrev: "UT"},
    {name: "Vermont", id: 46, abbrev: "VT"},
    {name: "Virginia", id: 47, abbrev: "VA"},
    {name: "Washington", id: 48, abbrev: "WA"},
    {name: "West Virginia", id: 49, abbrev: "WV"},
    {name: "Wisconsin", id: 50, abbrev: "WI"},
    {name: "Wyoming", id: 51, abbrev: "WY"}
];

EC.getState = _.partial(_.find,stateInfo);


/**
 * Represents NetSuite internal and external IDs for all transaction types
 * @type {{external,internal}}
 */
var TransactionTypeMap = [
    {external:"Build",internal:"assemblybuild"},
    {external:"Unbuild",internal:"assemblyunbuild"},
    {external:"VendBill",internal:"vendorbill"},
    {external:"VendCard",internal:"Bill CCard"},
    {external:"VendCred",internal:"vendorcredit"},
    {external:"VendPymt",internal:"vendorpayment"},
    {external:"BinWksht",internal:"binworksheet"},
    {external:"BinTrnfr",internal:"bintransfer"},
    {external:"CardRfnd",internal:"CCard Refund"},
    {external:"CashRfnd",internal:"cashrefund"},
    {external:"CashSale",internal:"cashsale"},
    {external:"Check",internal:"check"},
    {external:"Commissn",internal:"Commission"},
    {external:"CardChrg",internal:"Credit Card"},
    {external:"CustCred",internal:"creditmemo"},
    {external:"FxReval",internal:"currency"},
    {external:"CustDep",internal:"customerdeposit"},
    {external:"CustRfnd",internal:"customerrefund"},
    {external:"Deposit",internal:"Deposit"},
    {external:"DepAppl",internal:"depositapplication"},
    {external:"Estimate",internal:"estimate"},
    {external:"ExpRept",internal:"expensereport"},
    {external:"InvAdjst",internal:"Inventory Adjustment"},
    {external:"InvDistr",internal:"Inventory Distribution"},
    {external:"InvTrnfr",internal:"Inventory Transfer"},
    {external:"InvWksht",internal:"Inventory Worksheet"},
    {external:"CustInvc",internal:"invoice"},
    {external:"ItemShip",internal:"itemfulfillment"},
    {external:"ItemRcpt",internal:"itemreceipt"},
    {external:"Journal",internal:"journalentry"},
    {external:"LiaAdjst",internal:"Liability Adjustment"},
    {external:"Opprtnty",internal:"opportunity"},
    {external:"Paycheck",internal:"Paycheck"},
    {external:"CustPymt",internal:"Payment"},
    {external:"YtdAdjst",internal:"Payroll Adjustment"},
    {external:"LiabPymt",internal:"Payroll Liability Check"},
    {external:"PurchOrd",internal:"purchaseorder"},
    {external:"RtnAuth",internal:"returnauthorization"},
    {external:"SalesOrd",internal:"salesorder"},
    {external:"TaxPymt",internal:"Sales Tax Payment"},
    {external:"CustChrg",internal:"Statement Charge"},
    {external:"TaxLiab",internal:"Tax Liability Cheque"},
    {external:"Transfer",internal:"transferorder"},
    {external:"VendAuth",internal:"vendorreturnauthorization"},
    {external:"WorkOrd",internal:"workorder"}
];

EC.getTransactionType = _.partial(_.find,TransactionTypeMap);

/**
 * Represents common countries.
 * @type {{id,name,abbrev}}
 */
var countryMapping = [ { name:'', id: "", abbrev: ""},
    { name:'United States', id: 230, abbrev: "US"},
    { name:'Mexico', id: 157, abbrev: "MX"},
    { name:'Canada', id: 37, abbrev: "CA"},
    { name:'Puerto Rico', id: 182, abbrev: "PR"}
];

/**
 *  Lookup country data by one of 3 keys: internal id, abbreviation or country name. Providing any one
 *  of the three will exact match then return an object with all 3.
 * @type {function({name:string,id:number,abbrev:string})} country name, country internal id, and country 2-letter abbreviation
 * @example
 * //get by full name
 * EC.getCountry({ name:"United States"});
 *  {name:'United States', id: 230, abbrev: "US"}
 *
 * // get by abbreviation
 * EC.getCountry({ abbrev: "US" } );
 *  {name:'United States', id: 230, abbrev: "US"}
 *
 * // get by id
 * EC.getCountry( { id: '230' } );
 *  {name:'United States', id: 230, abbrev: "US"}
 */
EC.getCountry = _.partial(_.find, countryMapping);


/**
 * Represents NetSuite internal and external IDs for all item types
 * @type {Object}
 */
EC.ItemTypes = {
    InvtPart: "inventoryitem",
    NonInvtPart: "noninventoryitem",
    Group: "itemgroup",
    Kit: "kititem",
    Assembly: "assemblyitem",
    Service: "serviceitem",
    Description: "descriptionitem",
    Discount: "discountitem",
    OthCharge: "otherchargeitem",
    GiftCert: "giftcertificateitem",
    Markup: "markupitem",
    Payment: "paymentitem",
    Subtotal: "subtotalitem"
};
