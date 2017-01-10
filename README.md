Netsuite Fast Track Toolkit
=========================

[![Join the chat at https://gitter.im/ExploreConsulting/netsuite-fasttrack-toolkit](https://badges.gitter.im/ExploreConsulting/netsuite-fasttrack-toolkit.svg)](https://gitter.im/ExploreConsulting/netsuite-fasttrack-toolkit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
A bundle of joy for NetSuite SuiteScript developers.

See the [overview document](https://docs.google.com/document/d/13Nvv-XcH_IkLsKEEuqPba3OY2JpKkBP3iDUDMTrT_1Q) for an
intro and sample code.


A few features:
* single file deploy - you only add a single file to suitescript libraries.
* bundles popular open source tools such as lodash and  momentjs
* manipulate NetSuite records as plain javascript objects
* work with search results as plain javascript collections, enabling use of powerful libraries such
as lodash and LazyJS.


# Getting Started #

Add the library to your project

    npm install netsuite-fasttrack-toolkit

## Create a customer record

```javascript
    var customer = nsdal.createObject('customer', ['firstname', 'lastname', 'companyname'])

    customer.firstname = 'joe'
    customer.lastname = 'smith'
    customer.companyname = 'my company'

    var recordid = customer.save()

```


## Sales Order Lines (sublist support)

```javascript
   var salesOrder = nsdal.loadObject('salesorder', '1234', ['entity', 'department','createddate'])
                          .withSublist('item', ['item', 'quantity','amount'])

    // do something with body fields
    salesOrder.department
    salesOrder.entity
    salesOrder.createddate // this is a monentjs instance

   // find all line items with quantity > 100
   var highQtyLineItems = _.filter(salesOrder.item, function(line){ return line.quantity > 100 })

   // process each line item
   _.each(salesOrder.item, function(line) {
   /* do something with 'line'*/
     line.item
     line.quantity
     line.amount
   })

   // add a line item
   var newline = salesOrder.item.addLine()
   newline.item = '123'
   newline.quantity = 1
   newline.amount = 23.0
```


## Search and iterate over results

```javascript

    EC.enableLazySearch() // call this (only) once in your script

    // create search, returning 3 customer fields
    var search = EC.createSearch(['customer'],[['firstname', 'contains', 'joe']],
     ['internalid','firstname', 'phone'] )
     .nsSearchResult2obj() // convert search results to plain javascript
    .take(10000) // process only the first 10000
    .map(function(customer) {
        // log the phone number field of each customer
        Log.d('customer phone', customer.phone)
    }).toArray()

```



## TypeScript (optional)
The library is written in Javascript but you can use it with TypeScript. Typings are managed with the [typings](https://github.com/typings/typings) tool.

Install typescript declarations:

    typings install

Examples using TypeScript:

### Load a customer record (TS)

```typescript
  interface Customer {
        companyname:string
        phone:string
    }

    var customer = nsdal.loadObject<Customer>('customer', '1234', ['companyname', 'phone'])

    // customer is of type Customer and NSDALObject, so it has properties and traditional nlobjRecord methods
    customer.phone = '123-456-7890'
    customer.getFieldText('companyname')

   // nlapi calls are type checked
   nlapiRequestURL('url')

```


Contents
--------

* TypeScript Documentation is in the *.d.ts files.

* EC\_SharedLibrary\_Common.js - common code for use on either _server-side_ or _client-side_ scripts.

* EC\_SharedLibrary\_ServerSide.js - a collection of common code for use on our _server-side_ scripts. Includes logging, error handling, etc. If you add anything awesome and applicable to all our customers please merge those changes into the Template mainline.

* EC\_Search.js - Provides a search api that uses constant memory and lazy evaluation. Also includes a simplified definition for search filters/columns.

* EC_nsdal.js - Explore's data access library for netsuite. Please use and improve this library for the benefit of all. Currently only works for server-side script



### Utility Libraries ###

These best-of-breed open source libs are brought in by npm and are included in the build:

* lodash - functional utility belt
* moment - awesome datetime library
* lazyjs - a lazy version of underscore/lodash. Newer than lodash and initially only used for the lazy search lib.
* aop - aspect oriented programming lib for javascript

These are brought in by npm but only used in dev (not in the built binary)

* sinon - mocking framework for tests/specs
* typescript - for ES6/7 and strong typing (optional)
* karma - browser based test runner
* mocha - universal test runner and framework
* chai - assertion library for tests
* gulp things - for building


### Other ###

* nlapi.js - the netsuite api javascript documentation direct from netsuite. This provides code completion and docs for methods inside WebStorm.


### Building <a name="Building"></a>

To create a single file library for referencing in NetSuite

1. Edit 'package.json' and change the _version_ variable to match the subversion tag (<tagversion>) you're working with
2. If you do not have the del module installed, you will need to install it: npm install --save del
3. Run _gulp_  default task from commandline or in WebStorm (menu View->Tool Windows->Gulp)
4. If you experience errors referencing missing items, it is likely that you require additional modules. Google the items mentioned and install them with npm.
5. Compiled output will be placed in **dist/EC_Libs-\<tagversion\>.js**

Building the logging component requires webpack:

    webpack Logging.js  --output-library LogManager --output-filename Aurelia-Logger-webpack-lib.js --output-library-target var


### Tests ###
* put tests under the _tests_ folder
* the 'run all tests' config file is tests/test.jstd
* new tests should be in mocha/chai, run with karma (see tests/karma.conf.js)


_Note: designed for SuiteScript 1.x._

