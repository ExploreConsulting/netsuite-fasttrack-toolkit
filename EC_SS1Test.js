/**
 * Company           Explore Consulting
 * Copyright         2017 Explore Consulting, LLC
 * Description       testing NFT-SS1
 **/

var log = LogManager.DefaultLogger
var otherLogger = LogManager.getLogger('other')
// loggers other than default start with loglevel 'none'
otherLogger.setLevel(LogManager.logLevel.debug)

function onStart(request, response) {
    LogManager.includeCorrelationId = true
    log.debug('hello world', {anobject: 'with data'})
    log.error('oh no!', 'emergency!')
    otherLogger.warn('warning!')

    otherLogger.debug('asdfasdf')

    EC.foo(23)

    X.bar('hello')
}

var X = {
    bar: function (b) {
        otherLogger.debug('in bar')
    }
}

LogManager.autoLogMethodEntryExit({target: X, method: 'bar'}, {
    logger: otherLogger,
    withArgs: true,
    withProfiling: true,
    withReturnValue: true,
    withGovernance: true
})

EC.foo = function (x) {
    log.debug('inside foo')

    return x
}

LogManager.autoLogMethodEntryExit()

// Also try autologging on a logger other than the default - should create logger named prefixes in the
// autolog messages
