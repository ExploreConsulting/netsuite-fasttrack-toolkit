/**
 * Typings for EC_SharedLibrary_ServerSide.js
 */

/**
 * Provides a consistent interface to logging related behavior. Simplifies logging to the NetSuite execution log.
 */
declare interface Log {

    /**
     * Writes a message to the netsuite execution log
     *
     * @param  type
     * @param  title
     * @param  details if object then it will JSON.stringify it before printing to log
     */
    write(type:string, title:string, details:string|Object) :void
    /**
     * Convenience method for logging a 'DEBUG' severity log message
     * @param title
     * @param details
     */
    d(title:string,details?:string | Object ):void
    /**
     * Convenience method for logging a 'AUDIT' severity log message
     * @param title
     * @param details
     */
    a(title:string,details?:string | Object ):void
    /**
     * Convenience method for logging a 'ERROR' severity log message
     * @param title
     * @param details
     */
    e(title:string,details?:string | Object ):void


    /**
     * set true to include a random integer (or your custom) prefix to each auto log entry title.
     * which is fixed for the duration of this script run. This can be used to correlate between different runs
     * of the same script (e.g. multiple runs of a scheduled script or discerning between multiple simultaneous calls
     * to a RESTlet or Suitelet)
     * @property
     */
    includeCorrelationId: boolean

    /**
     * Value to be prepended to each log message title. Defaults to a random integer
     * @property
     */
    // foo bar baz
    correlationId: string

    /**
     * Uses AOP to automatically log method entry/exit with arguments to the netsuite execution log.
     * Call this method at the end of your script. Log entries are 'DEBUG' level.
     *
     * @param {Object} config configuration settings
     * @param {{target,method}} [config.methodsToLogEntryExit] array of pointcuts, defaults to log all methods on the
     * "EC" object
     * @param {Boolean} [config.withArgs] true if you want to include logging the arguments passed to the method in the
     * details. Default is true.
     * @param {Boolean} [config.withReturnValue] true if you want function return values to be logged
     * @param {Boolean} [config.withProfiling] set true if you want elapsed time info printed for each function
     * @param {Boolean} [config.colors] set true if you want pretty colors in your log message output, default
     * false. Colors not configurable so that we maintain consistency across all our scripts.
     * @param {string} [config.logType] the NetSuite logging level to use, default to 'DEBUG'
     * @returns {} an array of jquery aop advices
     */
    AutoLogMethodEntryExit(config?:AutoLogConfig): Array<Object>


    /**
     * Uses AOP to automatically log governance units usage to the NetSuite execution log. Execute this method at the
     * end of your script file and it will log governance data at the start and end of all functions specified.
     * @param [methodsToLogEntryExit] array of pointcuts, defaults to log all methods on the "EC" object
     * @param {string} [logLevel] NetSuite defined logging level to use for generated log entries. Default: 'DEBUG'
     * @param {boolean} [withColor] true if you want to show colors in log output. Default: false
     * @remark returns an array of jquery aop advices
     */
    AutoLogGovernanceUsage(methodsToLogEntryExit?:any, logLevel?:string, withColor?:boolean) : Array<Object>
}

/**
 * Configuration options for AutoLogMethodEntryExit
 */
interface AutoLogConfig {
    methodsToLogEntryExit?: { target:Object, method:string|RegExp }
    withArgs?:boolean
    withReturnValue?:boolean
    withProfiling?:boolean
    colors?:boolean
    logType?:string
}


declare module EC {
    /**
     * Takes an exception of several types and parses details of the message into a friendly string
     * Handles some advanced cases like capturing a stack trace if available.
     * @param e the exception
     */
    function getExceptionDetail(e:Object|Error):string

}


declare interface Governance {
    startTime:Date;

    /**
     * The number of units we have at the start. This is on the prototype so that it's assigned first
     */
    initialUnits:Number;

    /**
     * Gets the number of seconds elapsed since the script has started.
     * @return {Number} elapsed seconds
     */
    elapsedTime() : Number

    /**
     * Gets the number of units remaining for script execution.
     * @return {} number of units and percent governance remaining for this script
     */
    remainingUsage() : {
        remaining:number, percent:number
    }
}


/**
 * Provides a consistent interface to logging related behavior.
 */
declare var Log:Log
