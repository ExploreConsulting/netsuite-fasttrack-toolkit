/**
 * Created by shawn on 1/10/17.
 */
describe('Logging', function () {
    var log = LogManager.DefaultLogger
    /**
     * This function is used by tests - simply returns whatever is passed to it (identity function)
     * @param i
     * @returns {*}
     */
    EC.foo = function (i) {
        return i;
    };

    beforeEach(function () {

        // override the NetSuite native logging call for each test with a fresh spy so we can track calls
        // to this underlying method in test assertions.
        global.nlapiLogExecution = sinon.spy();
    });


    it('test Debug has correct event type', function () {

        log.debug('hello world')

        global.nlapiLogExecution.should.have.been.calledOnce
        global.nlapiLogExecution.should.have.been.calledWith('debug')
    });

    it('test Error has correct event type', function () {

        log.error('hello world')

        global.nlapiLogExecution.should.have.been.calledOnce;
        // errors on the logger map to emergency (highest level) in NS
        global.nlapiLogExecution.should.have.been.calledWith('emergency');
    });

    it('test Audit has correct event type', function () {

        log.info('hello world');

        global.nlapiLogExecution.should.have.been.calledOnce;
        global.nlapiLogExecution.should.have.been.calledWith('audit');
    });

    it('test Warning has correct event type', function () {

        log.warn('hello world');

        global.nlapiLogExecution.should.have.been.calledOnce;
        global.nlapiLogExecution.should.have.been.calledWith('error');
    });

    it("test logging details as an object", function () {

        var anObject = {foo: "bar", baz: 3};

        log.info('hello world', anObject);

        // to show the call details on console:
        // console.log(global.nlapiLogExecution.getCall(0));

        global.nlapiLogExecution.should.have.been.calledOnce;
        global.nlapiLogExecution.should.have.been.calledWith('audit', "hello world", '{"foo":"bar","baz":3}');
    });

    it("test logging details as a string", function () {

        log.info('hello world', "surely a string");

        // to show the call details on console:
        // console.log(global.nlapiLogExecution.getCall(0));

        global.nlapiLogExecution.should.have.been.calledOnce;
        global.nlapiLogExecution.should.have.been.calledWith('audit', "hello world", "surely a string");
    });

    /**
     * Our Auto-Logging feature, which uses AOP (aspect oriented programming) to achieve codeless logging
     */
    describe("auto-logging", function () {

        afterEach(function () {
            // forcibly remove any AOP applied to our foo method - presence of the unweave() method
            // is the hint that it's an aop-ized function.
            while (EC.foo.unweave) EC.foo.unweave();
        });


        it("test autologging without args", function () {

            // create an object to spy on.
            var foo = {
                a: function (p) {
                }
            };

            LogManager.autoLogMethodEntryExit({target: foo, method: 'a'}, {
                withArgs: false
            });

            foo.a("an argument"); // this argument should not be logged

            // get the 3rd argument ('details') of the first invocation of nlapiLogExecution()
            var detailsArgument = global.nlapiLogExecution.args[0][2];
            assert.isNull(detailsArgument);
        });

        it("autologging with all defaults", function () {

            LogManager.autoLogMethodEntryExit()

            EC.foo("hi");

            var methodEntry = global.nlapiLogExecution.args[0];
            var methodExit = global.nlapiLogExecution.args[1];

            // get the 3rd argument ('details') of the first invocation of nlapiLogExecution()
            var detailsArgument = methodEntry[2];
            // by default, arguments are logged on method entry
            assert.ok(detailsArgument);


            // and return values also logged
            methodExit[2].should.equal('returned: "hi"');
        });

        it("test autologging with args by default", function () {

            global.nlapiLogExecution.reset();
            // create an object to spy on.
            var foo = {
                a: function (p) {
                }
            };

            LogManager.autoLogMethodEntryExit({target: foo, method: 'a'});

            foo.a("an argument");

            // get the 3rd argument of the first invocation of nlapiLogExecution()
            var detailsArgument = global.nlapiLogExecution.args[0][2];

            detailsArgument.should.contain("an argument");
        });

        it("test autologging with return value", function () {

            global.nlapiLogExecution.reset();
            // object with a function that returns something
            var foo = {
                a: function () {
                    return 'a return value';
                }
            };

            LogManager.autoLogMethodEntryExit({target: foo, method: 'a'});

            foo.a('an argument');

            // nlapiLogExecution() 'details' argument should include the return value on the second invocation
            var detailsArgument = global.nlapiLogExecution.args[1][2];

            detailsArgument.should.contain('a return value');
        });

        it("test autologging function that returns nothing", function () {

            global.nlapiLogExecution.reset();
            // object with a function that returns nothing
            var foo = {
                a: function (p) {
                }
            };

            LogManager.autoLogMethodEntryExit({target: foo, method: 'a'});
            foo.a("an argument");

            // nlapiLogExecution() 'details' argument should include the return value on the second invocation
            var detailsArgument = global.nlapiLogExecution.args[1][2];
            // method that returns nothing should be undefined
            detailsArgument.should.contain('undefined');
        });

        it("test autologging without return value", function () {

            global.nlapiLogExecution.reset();
            // object with a function that returns something
            var foo = {
                a: function () {
                    return "a return value";
                }
            };

            // last boolean argument turns off return value logging
            LogManager.autoLogMethodEntryExit({target: foo, method: 'a'}, {withReturnValue: false});

            foo.a("an argument");

            // nlapiLogExecution() 'details' argument should include the return value on the second invocation
            var detailsArgument = global.nlapiLogExecution.args[1][2];
            assert.isNull(detailsArgument);
        });

        it("test autologging with profiling option", function () {

            global.nlapiLogExecution.reset();
            // object with a function that returns something
            var foo = {
                a: function () {
                    return "a return value";
                }
            };

            // last boolean argument turns off return value logging
            LogManager.autoLogMethodEntryExit({target: foo, method: 'a'}, {withProfiling: true});

            var retval = foo.a("an argument");


            retval.should.equal("a return value");
            // called once before method, once after
            global.nlapiLogExecution.should.have.been.calledTwice;

            console.log("nlapiLogExecution 1:" + JSON.stringify(global.nlapiLogExecution.getCall(0).args));
            console.log("nlapiLogExecution 2:" + JSON.stringify(global.nlapiLogExecution.getCall(1).args));
            // nlapiLogExecution() 'title' argument should include method elapsed time
            var titleArgument = global.nlapiLogExecution.args[1][1];
            // this assertion assumes your computer is fast enough for this call to return 0 milliseconds :)
            titleArgument.should.contain('Exit a() 0ms = 0.00 minutes');

        });

        it("test autologging without profiling option", function () {

            global.nlapiLogExecution.reset();
            // object with a function that returns something
            var foo = {
                a: function () {
                    return "a return value";
                }
            };

            // last boolean argument turns off return value logging
            LogManager.autoLogMethodEntryExit({target: foo, method: 'a'}, {withProfiling: false});

            var retval = foo.a("an argument");

            retval.should.equal("a return value");
            // called once before method, once after
            global.nlapiLogExecution.should.have.been.calledTwice;

            console.log('nlapiLogExecution 1:' + JSON.stringify(global.nlapiLogExecution.getCall(0).args));
            console.log('nlapiLogExecution 2:' + JSON.stringify(global.nlapiLogExecution.getCall(1).args));
            // nlapiLogExecution() 'title' argument should include method elapsed time
            var titleArgument = global.nlapiLogExecution.args[1][1];
            titleArgument.should.equal('Exit a()');
        });


        it("logs at 'DEBUG' level by default", function () {

            LogManager.autoLogMethodEntryExit();

            EC.foo();

            // get the log type argument from the first invocation of nlapiLogExecution
            global.nlapiLogExecution.args[0][0].should.equal('debug');
            // and the second invocatin (method Exit())
            global.nlapiLogExecution.args[1][0].should.equal('debug');
        });


        it("log with different logLevel", function () {

            LogManager.autoLogMethodEntryExit({target: EC, method: 'foo'}, { logLevel:LogManager.logLevel.info})

            EC.foo();

            // get the log type argument from the first invocation of nlapiLogExecution
            global.nlapiLogExecution.args[0][0].should.equal('audit');
            // and the second invocatin (method Exit())
            global.nlapiLogExecution.args[1][0].should.equal('audit');
        });

        describe("governance auto-logging", function () {

            beforeEach(function () {
            });

            afterEach(function () {
            });

            it("logs number of units remaining on function exit", function () {
                LogManager.autoLogMethodEntryExit({target: EC, methods: /\w/}, {
                    withGovernance:true
                });

                var result = EC.foo("bar");
                result.should.equal('bar');
                // should auto log twice, once before method entry, once after
                global.nlapiLogExecution.should.have.been.calledTwice;

                // second call, function exit autologging
                var title = global.nlapiLogExecution.args[1][1];

                title.should.contain('governance: 1000');
            });

        });
    });

    // Logger can be configured with optional correlation id logged as part of the message title
    describe("Correlation IDs", function () {

        afterEach(function () {
            // reset Correlation ID so other tests won't see it (Log is a global singleton)
            LogManager.includeCorrelationId = false;
        });

        it('logs without correlation id by default', function () {

            log.debug('hello world');

            global.nlapiLogExecution.should.have.been.calledOnce;
            global.nlapiLogExecution.firstCall.args[1].should.not.contain(">");
        });

        it('logs with random correlation id when requested', function () {

            LogManager.includeCorrelationId = true;

            dump('correlation id: ' + LogManager.correlationId);

            log.debug('hello world');

            global.nlapiLogExecution.should.have.been.calledOnce;
            global.nlapiLogExecution.firstCall.args[1].should.contain(LogManager.correlationId + '>');
            dump(global.nlapiLogExecution.firstCall.args[1]);
        });

        it('maintains the same correlation id across multiple log calls', function () {

            LogManager.includeCorrelationId = true;

            dump('correlation id: ' + LogManager.correlationId);

            // make several calls to the logger, all should have the same correlation id
            log.debug('hello world');
            log.info('here I am');
            log.warn('again!');

            global.nlapiLogExecution.should.have.been.calledThrice;

            dump(global.nlapiLogExecution.firstCall.args);
            dump(global.nlapiLogExecution.secondCall.args);
            dump(global.nlapiLogExecution.thirdCall.args);
            var detailsShouldMatch = new RegExp(LogManager.correlationId + '>');
            assert(global.nlapiLogExecution.alwaysCalledWithMatch(sinon.match.any, detailsShouldMatch));
        });

        it('can use a custom correlation id', function () {

            LogManager.includeCorrelationId = true;
            // set custom correlation id
            LogManager.correlationId = "myid";
            dump('correlation id: ' + LogManager.correlationId);

            log.debug('hello world');

            global.nlapiLogExecution.should.have.been.calledOnce;
            global.nlapiLogExecution.firstCall.args[1].should.contain('myid>');
            dump(global.nlapiLogExecution.firstCall.args[1]);
        });

    });

    // Multiple loggers can be used and configured with different log levels
    describe("Multiple loggers", function () {

        afterEach(function () {
        });

        it('basic logging', function () {
            // default logger is named 'log' with logger name 'default' with loglevel 'debug'
            log.debug('hello world');

            global.nlapiLogExecution.should.have.been.calledOnce;

        });


        it('can define multiple independent named loggers', function () {

            // get a logger with the name 'foo'
            var fooLogger = LogManager.getLogger('foo')
            // get another logger with the name 'bar'
            var barLogger = LogManager.getLogger('bar')

            fooLogger.setLevel(LogManager.logLevel.warn)
            barLogger.setLevel(LogManager.logLevel.info)

            // no NS log methods should have been invoked at this point
            global.nlapiLogExecution.should.not.have.been.called;

            // the loggers should have different logging levels
            fooLogger.level.should.be.equal(LogManager.logLevel.warn)
            barLogger.level.should.be.equal(LogManager.logLevel.info)
        });

        it('separate loggers have different log levels', function () {

            // get a logger with the name 'foo'
            var fooLogger = LogManager.getLogger('foo')
            // get another logger with the name 'bar'
            var barLogger = LogManager.getLogger('bar')

            fooLogger.setLevel(LogManager.logLevel.warn)
            barLogger.setLevel(LogManager.logLevel.info)

            // invoke foo logger with level > warning so it should log
            fooLogger.error('an error!')

            // invoke barLogger with a level < info so it should NOT log anything
            barLogger.debug('debugging!')

            global.nlapiLogExecution.should.have.been.calledOnce;
            // log title
            global.nlapiLogExecution.firstCall.args[1].should.contain('[foo]');

        });

        it('logs with random correlation id when requested', function () {

            LogManager.includeCorrelationId = true;

            dump('correlation id: ' + LogManager.correlationId);

            log.debug('hello world');

            global.nlapiLogExecution.should.have.been.calledOnce;
            global.nlapiLogExecution.firstCall.args[1].should.contain(LogManager.correlationId + '>');
            dump(global.nlapiLogExecution.firstCall.args[1]);
        });

        it('maintains the same correlation id across multiple log calls', function () {

            LogManager.includeCorrelationId = true;

            dump('correlation id: ' + LogManager.correlationId);

            // make several calls to the logger, all should have the same correlation id
            log.debug('hello world');
            log.info('here I am');
            log.warn('again!');

            global.nlapiLogExecution.should.have.been.calledThrice;

            dump(global.nlapiLogExecution.firstCall.args);
            dump(global.nlapiLogExecution.secondCall.args);
            dump(global.nlapiLogExecution.thirdCall.args);
            var detailsShouldMatch = new RegExp(LogManager.correlationId + '>');
            assert(global.nlapiLogExecution.alwaysCalledWithMatch(sinon.match.any, detailsShouldMatch));
        });

        it('can use a custom correlation id', function () {

            LogManager.includeCorrelationId = true;
            // set custom correlation id
            LogManager.correlationId = "myid";
            dump('correlation id: ' + LogManager.correlationId);

            log.debug('hello world');

            global.nlapiLogExecution.should.have.been.calledOnce;
            global.nlapiLogExecution.firstCall.args[1].should.contain('myid>');
            dump(global.nlapiLogExecution.firstCall.args[1]);
        });

    });


});