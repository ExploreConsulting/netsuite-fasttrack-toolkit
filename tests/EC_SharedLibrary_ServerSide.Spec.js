/**
 * Tests for the serverside shared library file
 */

//  assign a name to the global object for clarity (netsuite api calls are on the global object)
var global = this;

describe('Logging', function () {

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

        Log.d('hello world');

        global.nlapiLogExecution.should.have.been.calledOnce;
        global.nlapiLogExecution.should.have.been.calledWith(LogType.Debug);
    });

    it('test Error has correct event type', function () {

        Log.e('hello world');

        global.nlapiLogExecution.should.have.been.calledOnce;
        global.nlapiLogExecution.should.have.been.calledWith(LogType.Error);
    });

    it('test Audit has correct event type', function () {

        Log.a('hello world');

        global.nlapiLogExecution.should.have.been.calledOnce;
        global.nlapiLogExecution.should.have.been.calledWith(LogType.Audit);
    });

    it("test logging details as an object", function () {

        var anObject = {foo: "bar", baz: 3};

        Log.a('hello world', anObject);

        // to show the call details on console:
        // console.log(global.nlapiLogExecution.getCall(0));

        global.nlapiLogExecution.should.have.been.calledOnce;
        global.nlapiLogExecution.should.have.been.calledWith(LogType.Audit, "hello world", '{"foo":"bar","baz":3}');
    });

    it("test logging details as a string", function () {

        Log.a('hello world', "surely a string");

        // to show the call details on console:
        // console.log(global.nlapiLogExecution.getCall(0));

        global.nlapiLogExecution.should.have.been.calledOnce;
        global.nlapiLogExecution.should.have.been.calledWith(LogType.Audit, "hello world", "surely a string");
    });

    /**
     * Our Auto-Logging feature, which uses AOP (aspect oriented programming) to achieve codeless logging
     */
    describe("auto-logging", function () {

        afterEach(function () {
            // forcibly remove any AOP applied to our foo method - presence of the unweave() method
            // is the hint that it's an aop-ized function.
            while (EC.foo.unweave ) EC.foo.unweave();
        });


        it("test autologging without args", function () {

            // create an object to spy on.
            var foo = {
                a: function (p) {
                }
            };

            Log.AutoLogMethodEntryExit({
                methodsToLogEntryExit: {target: foo, method: 'a'},
                withArgs: false
            });

            foo.a("an argument"); // this argument should not be logged

            // get the 3rd argument ('details') of the first invocation of nlapiLogExecution()
            var detailsArgument = global.nlapiLogExecution.args[0][2];
            assert.isNull(detailsArgument);
        });

        it("autologging with all defaults", function () {

            Log.AutoLogMethodEntryExit();

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

            Log.AutoLogMethodEntryExit({
                methodsToLogEntryExit: {target: foo, method: 'a'}
            });

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

            Log.AutoLogMethodEntryExit({
                methodsToLogEntryExit: {target: foo, method: 'a'}
            });

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

            Log.AutoLogMethodEntryExit({
                methodsToLogEntryExit: {target: foo, method: 'a'}
            });

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
            Log.AutoLogMethodEntryExit({
                methodsToLogEntryExit: {target: foo, method: 'a'},
                withReturnValue:false
            });

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
            Log.AutoLogMethodEntryExit({
                methodsToLogEntryExit: {target: foo, method: 'a'},
                withProfiling:true
            });

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
            Log.AutoLogMethodEntryExit({
                methodsToLogEntryExit: {target: foo, method: 'a'},
                withProfiling:false
            });

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

        it("log with optional colors on method Entry", function () {

            Log.AutoLogMethodEntryExit({
                colors: true
            });

            EC.foo();

            // get the title argument from the first (entry) invocation of nlapiLogExecution
            var titleArgument = global.nlapiLogExecution.args[0][1];

            titleArgument.should.equal('<span style="color:#0000ff" ><strong>Enter foo()</strong></span>');
        });

        it("log with optional colors on method Exit", function(){

            Log.AutoLogMethodEntryExit({
                colors: true
            });

            EC.foo();

            // get the title argument from the second invocation of nlapiLogExecution
            var titleArgument = global.nlapiLogExecution.args[1][1];

            titleArgument.should.equal('<span style="color:#4040ff">Exit foo()</span>');
        });

        it("logs at 'DEBUG' level by default", function(){

            Log.AutoLogMethodEntryExit();

            EC.foo();

            // get the log type argument from the first invocation of nlapiLogExecution
            global.nlapiLogExecution.args[0][0].should.equal(LogType.Debug);
            // and the second invocatin (method Exit())
            global.nlapiLogExecution.args[1][0].should.equal(LogType.Debug);
        });


        it("log with different logLevel", function(){

            Log.AutoLogMethodEntryExit({
                logType: LogType.Audit
            });

            EC.foo();

            // get the log type argument from the first invocation of nlapiLogExecution
            global.nlapiLogExecution.args[0][0].should.equal(LogType.Audit);
            // and the second invocatin (method Exit())
            global.nlapiLogExecution.args[1][0].should.equal(LogType.Audit);
        });

        describe("governance auto-logging", function () {

            beforeEach( function() {
                // fake out governance remaining usage
                sinon.stub(Governance.prototype,'remainingUsage').returns({units: 100, percent: 50});

            });

            afterEach(function () {
                // remove faked implementation so other tests can run (important since Governance itself is
                // globally scoped)
                Governance.prototype.remainingUsage.restore();
            });

            it("doesn't include colors by default", function () {
                Log.AutoLogGovernanceUsage();
                var result = EC.foo("bar");
                result.should.equal('bar');
                // should auto log twice, once before method entry, once after
                global.nlapiLogExecution.should.have.been.calledTwice;

                var titleArgument = global.nlapiLogExecution.args[0][1];

                titleArgument.should.equal('Governance Remaining: 100 units');
            });

            it("includes colors if you ask for them", function () {
                Log.AutoLogGovernanceUsage({target:EC,methods:/\w/},'DEBUG',true);

                var result = EC.foo("bar");
                result.should.equal('bar');
                // should auto log twice, once before method entry, once after
                global.nlapiLogExecution.should.have.been.calledTwice;

                var titleArgument = global.nlapiLogExecution.args[0][1];

                titleArgument.should.equal('<span style="color:#A08020" >Governance Remaining: <strong>100 units</strong></span>');
            });

            it("can log at AUDIT level if you prefer", function () {
                Log.AutoLogGovernanceUsage({target:EC,methods:/\w/},'AUDIT',true);

                var result = EC.foo("bar");
                result.should.equal('bar');
                // should auto log twice, once before method entry, once after
                global.nlapiLogExecution.should.have.been.calledTwice;

                var logLevelArgument = global.nlapiLogExecution.args[0][0];

                logLevelArgument.should.equal('AUDIT');
            });

            it("returns original function's result", function () {
                Log.AutoLogGovernanceUsage();
                var result = EC.foo("bar");
                result.should.equal('bar');
                // should auto log twice, once before method entry, once after
                global.nlapiLogExecution.should.have.been.calledTwice;
                var titleArgument = global.nlapiLogExecution.args[0][1];
                console.log(titleArgument);
            });
        });
    });

    // Logger can be configured with optional correlation id logged as part of the message title
    describe("Correlation IDs", function () {

        afterEach(function () {
            // reset Correlation ID so other tests won't see it (Log is a global singleton)
            Log.includeCorrelationId = false;
        });

        it('logs without correlation id by default', function () {

            Log.d('hello world');

            global.nlapiLogExecution.should.have.been.calledOnce;
            global.nlapiLogExecution.firstCall.args[1].should.not.contain(">");
        });

        it('logs with random correlation id when requested', function () {

            Log.includeCorrelationId = true;

            dump('correlation id: ' + Log.correlationId);

            Log.d('hello world');

            global.nlapiLogExecution.should.have.been.calledOnce;
            global.nlapiLogExecution.firstCall.args[1].should.contain(Log.correlationId+'>');
            dump(global.nlapiLogExecution.firstCall.args[1]);
        });

        it('maintains the same correlation id across multiple log calls', function () {

            Log.includeCorrelationId = true;

            dump('correlation id: ' + Log.correlationId);

            // make several calls to the logger, all should have the same correlation id
            Log.d('hello world');
            Log.a('here I am');
            Log.e('again!');

            global.nlapiLogExecution.should.have.been.calledThrice;

            dump(global.nlapiLogExecution.firstCall.args);
            dump(global.nlapiLogExecution.secondCall.args);
            dump(global.nlapiLogExecution.thirdCall.args);
            var detailsShouldMatch = new RegExp(Log.correlationId+'>');
            assert(global.nlapiLogExecution.alwaysCalledWithMatch(sinon.match.any,detailsShouldMatch));
        });

        it('can use a custom correlation id', function () {

            Log.includeCorrelationId = true;
            // set custom correlation id
            Log.correlationId = "myid";
            dump('correlation id: ' + Log.correlationId);

            Log.d('hello world');

            global.nlapiLogExecution.should.have.been.calledOnce;
            global.nlapiLogExecution.firstCall.args[1].should.contain('myid>');
            dump(global.nlapiLogExecution.firstCall.args[1]);
        });

    });



});

describe('getExceptionDetail', function () {

    it('should handle native javascript Error objects', function () {
        var error = new Error("error message","123");
        var result = EC.getExceptionDetail(error);

        result.should.contain("error message");
        // an Error object should include a stack trace
        result.should.contain("at");
    });

    it('should handle plain string exception', function () {

        var result = EC.getExceptionDetail("some plain string exception");

        result.should.contain("some plain string exception");
        // a plain string should not include a stack trace
        result.should.contain("no stack trace");

    });

    it('should handle NS nlobjError objects', function () {

        var error = new nlobjError();

        sinon.stub(error, 'getStackTrace').returns(["at some line in the stack trace"]);
        sinon.stub(error, 'toString').returns("some netsuite error object");

        var result = EC.getExceptionDetail(error);
        result.should.contain("some netsuite error object");
        // an nlobjError object should include a stack trace
        result.should.contain("at");
    });

    it('should handle other native javascript objects', function () {
        var error = new TypeError();
        error.message = "invalid syntax";
        var result = EC.getExceptionDetail(error);

        result.should.contain("invalid syntax");
        // this sort of error should include a stack trace
        result.should.contain("at");
    });
});








