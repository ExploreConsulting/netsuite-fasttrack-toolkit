// declare Explore 'namespace' if it's not already defined
if (typeof EC == "undefined" || !EC) {
    var EC = {};
}

/**
 * Logging levels, corresponding to NS log levels.
 * @enum
 */
var LogType = {
    /**  most verbose */
    Debug: "DEBUG",
    /** second most verbose */
    Audit: "AUDIT",
    /** third most verbose */
    Error: "ERROR"
};

var Log =( function() {

    // captured in a closure here to ensure it's only assigned once.
    var correlationId = Math.floor(Math.random() * 10000).toString();

    return {
        includeCorrelationId: false,

        correlationId: correlationId,

        write: function (type, title, details) {
            if (details instanceof Object) details = JSON.stringify(details);
            if (this.includeCorrelationId === true) title = this.correlationId + '> ' + title;
            nlapiLogExecution(type, title, details);
        },


        d: function (title, details) {
            this.write(LogType.Debug, title, details);
        },

        a: function (title, details) {
            this.write(LogType.Audit, title, details);
        },

        e: function (title, details) {
            this.write(LogType.Error, title, details);
        },


        AutoLogMethodEntryExit: function (config) {
            if (!config) config = {};
            // default to logging all methods on the EC object
            var methodsToLogEntryExit = config.methodsToLogEntryExit || {target: EC, method: /\w/};
            // include method parameters by default
            var withArgs = config.withArgs !== false;
            // include return values by default
            var withReturnValue = config.withReturnValue !== false;
            // default to NOT show colors (NS doesn't support it as of 2015.1)
            var showColors = config.colors === true;
            // default to not show profiling info
            var withProfiling = config.withProfiling === true;
            // default to 'DEBUG' logging level, but allow caller to override
            var logLevel = config.logType || LogType.Debug;

            function formatEnterTitle(methodName, withColor) {

                var content = 'Enter ' + methodName + '()';
                if (withColor === true)
                    return '<span style="color:#0000ff" ><strong>' + content + '</strong></span>';
                else
                    return content;
            }

            function formattedExitTitle(methodName, withColor) {
                var content = 'Exit ' + methodName + '()';

                if (withColor === true)
                    return '<span style="color:#4040ff">' + content + '</span>';
                else
                    return content;
            }


            return aop.around(methodsToLogEntryExit, function (invocation) {
                // record function entry with details for every method on our explore object
                Log.write(logLevel,
                    formatEnterTitle(invocation.method, showColors),
                    withArgs ? 'args: ' + JSON.stringify(arguments[0]) : null);
                var startTime = moment();
                var retval    = invocation.proceed();
                var elapsedMessage;
                if (withProfiling) {
                    var elapsedMilliseconds = moment().diff(startTime);
                    elapsedMessage          = elapsedMilliseconds + "ms = " +
                        moment.duration(elapsedMilliseconds).asMinutes().toFixed(2) + " minutes";
                }

                // record function exit for every method on our explore object
                Log.write(logLevel, [
                        formattedExitTitle(invocation.method, showColors),
                        elapsedMessage
                    ].join(" ").trim(),
                    withReturnValue ? "returned: " + JSON.stringify(retval) : null);

                return retval;
            });
        },

        AutoLogGovernanceUsage: function (methodsToLogEntryExit, logLevel, withColor) {
            // default to logging all methods on the EC object
            if (!methodsToLogEntryExit) methodsToLogEntryExit = {target: EC, method: /\w/};
            logLevel  = logLevel || 'DEBUG';
            withColor = withColor || false;

            function formatTitle(unitsRemaining, withColor) {
                if (withColor === true)
                    return '<span style="color:#A08020" >Governance Remaining: <strong>' +
                        unitsRemaining + ' units</strong></span>';
                else
                    return 'Governance Remaining: ' + unitsRemaining + ' units';
            }

            var logFunction = function (result) {
                var gov       = new Governance();
                var remaining = gov.remainingUsage();

                nlapiLogExecution(logLevel, formatTitle(remaining.units, withColor),
                    'script has ' + remaining.percent + '% of available units remaining');

                // log a more serious message if we've got less than 10% left
                if (remaining.percent < 10)
                    nlapiLogExecution('ERROR', 'Script is almost out of governance!', 'only ' + remaining.units + ' left');
                return result; // for aop.after, we need to return the original result passed to us
            };

            aop.before(methodsToLogEntryExit, logFunction);
            return aop.after(methodsToLogEntryExit, logFunction);
        }
    };
})();

//noinspection FunctionWithInconsistentReturnsJS
/**
 * Presents a singleton governance utility
 * @constructor
 */
function Governance() {
    if (Governance.prototype._singletonInstance) {
        return Governance.prototype._singletonInstance;
    }
    else Governance.prototype._singletonInstance = this;

    this.startTime    = new Date();

    this.initialUnits = nlapiGetContext().getRemainingUsage();
}

//noinspection JSUnusedGlobalSymbols
Governance.prototype.elapsedTime = function () {
    //noinspection UnnecessaryLocalVariableJS,UnnecessaryLocalVariableJS
    var elapsedTime = ((new Date().getTime() - this.startTime.getTime()) / 1000);
    return elapsedTime;
};

Governance.prototype.remainingUsage = function () {
    var units = parseInt(nlapiGetContext().getRemainingUsage());
    return {units: units, percent: Math.round((units / this.initialUnits) * 100)};
};


EC.getExceptionDetail = function (e) {
    var detail = e.toString() + " \n";
    if (e.stack) detail += e.stack;
    else if (_.isFunction(e.getStackTrace)) detail += e.getStackTrace().join();
    else detail += "[no stack trace]";
    return detail;
};






