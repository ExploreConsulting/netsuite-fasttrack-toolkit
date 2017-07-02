
//region logging example
///<reference path="Logging.d.ts"/>
///<reference path="nlapi.d.ts"/>
///<reference path="EC_nsdal.ts"/>


const customer = nlapiLoadRecord('customer', '1234')

const comments = customer.getFieldValue('comments')
const isinactive = customer.getFieldValue('isinactive')
const phone = customer.getFieldValue('phone')

nlapiLogExecution("DEBUG", "customer info", "comments:" + comments + " isinactive:" + isinactive + " phone:" + phone)


namespace NFT {

    let customer = nsdal.loadObject<any>('customer', '1234', ['comments', 'isinactive', 'phone'])

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
    const c = new MyComponent()
    c.log.setLevel(LogManager.logLevel.warn)

    // use the component
    c.foo()
}
//endregion


