
//region logging example
///<reference path="Logging.d.ts"/>
///<reference path="EC_nsdal.d.ts"/>
///<reference path="nlapi.d.ts"/>


var customer = nlapiLoadRecord('customer', '1234')

var comments = customer.getFieldValue('comments')
var isinactive = customer.getFieldValue('isinactive')
var phone = customer.getFieldValue('phone')

nlapiLogExecution("DEBUG", "customer info", "comments:" + comments + " isinactive:" + isinactive + " phone:" + phone)


namespace NFT {

    var customer = nsdal.loadObject('customer', '1234', ['comments', 'isinactive', 'phone'])

    log.debug("customer info", customer)


    // MyComponent uses a custom logger, whose loglevel can be controlled independently of the default logger
    class MyComponent {
        log = LogManager.getLogger('MyComponent')
        constructor () {
            this.log.debug('constructing MyComponent')
        }

        foo() {
            this.log.error('failure!')
        }
    }
    // set MyComponent to only log 'warning' level and above
    var c = new MyComponent()
    c.log.setLevel(LogManager.logLevel.warn)

    // use the component
    c.foo()
}
//endregion


