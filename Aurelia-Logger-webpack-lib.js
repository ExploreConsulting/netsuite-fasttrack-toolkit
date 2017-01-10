var LogManager =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogger = getLogger;
exports.addAppender = addAppender;
exports.setLevel = setLevel;
exports.getLevel = getLevel;



var logLevel = exports.logLevel = {
  none: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4
};

var loggers = {};
var appenders = [];
var slice = Array.prototype.slice;
var loggerConstructionKey = {};
var globalDefaultLevel = logLevel.none;

function log(logger, level, args) {
  var i = appenders.length;
  var current = void 0;

  args = slice.call(args);
  args.unshift(logger);

  while (i--) {
    current = appenders[i];
    current[level].apply(current, args);
  }
}

function debug() {
  if (this.level < 4) {
    return;
  }

  log(this, 'debug', arguments);
}

function info() {
  if (this.level < 3) {
    return;
  }

  log(this, 'info', arguments);
}

function warn() {
  if (this.level < 2) {
    return;
  }

  log(this, 'warn', arguments);
}

function error() {
  if (this.level < 1) {
    return;
  }

  log(this, 'error', arguments);
}

function connectLogger(logger) {
  logger.debug = debug;
  logger.info = info;
  logger.warn = warn;
  logger.error = error;
}

function createLogger(id) {
  var logger = new Logger(id, loggerConstructionKey);
  logger.setLevel(globalDefaultLevel);

  if (appenders.length) {
    connectLogger(logger);
  }

  return logger;
}

function getLogger(id) {
  return loggers[id] || (loggers[id] = createLogger(id));
}

function addAppender(appender) {
  appenders.push(appender);

  if (appenders.length === 1) {
    for (var key in loggers) {
      connectLogger(loggers[key]);
    }
  }
}

function setLevel(level) {
  globalDefaultLevel = level;
  for (var key in loggers) {
    loggers[key].setLevel(level);
  }
}

function getLevel() {
  return globalDefaultLevel;
}

var Logger = exports.Logger = function () {
  function Logger(id, key) {
    

    this.level = logLevel.none;

    if (key !== loggerConstructionKey) {
      throw new Error('Cannot instantiate "Logger". Use "getLogger" instead.');
    }

    this.id = id;
  }

  Logger.prototype.debug = function debug(message) {};

  Logger.prototype.info = function info(message) {};

  Logger.prototype.warn = function warn(message) {};

  Logger.prototype.error = function error(message) {};

  Logger.prototype.setLevel = function setLevel(level) {
    this.level = level;
  };

  return Logger;
}();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsoleAppender = undefined;

var _aureliaLogging = __webpack_require__(0);



var ConsoleAppender = exports.ConsoleAppender = function () {
  function ConsoleAppender() {
    
  }

  ConsoleAppender.prototype.debug = function debug(logger) {
    var _console;

    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    (_console = console).debug.apply(_console, ['DEBUG [' + logger.id + ']'].concat(rest));
  };

  ConsoleAppender.prototype.info = function info(logger) {
    var _console2;

    for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      rest[_key2 - 1] = arguments[_key2];
    }

    (_console2 = console).info.apply(_console2, ['INFO [' + logger.id + ']'].concat(rest));
  };

  ConsoleAppender.prototype.warn = function warn(logger) {
    var _console3;

    for (var _len3 = arguments.length, rest = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      rest[_key3 - 1] = arguments[_key3];
    }

    (_console3 = console).warn.apply(_console3, ['WARN [' + logger.id + ']'].concat(rest));
  };

  ConsoleAppender.prototype.error = function error(logger) {
    var _console4;

    for (var _len4 = arguments.length, rest = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      rest[_key4 - 1] = arguments[_key4];
    }

    (_console4 = console).error.apply(_console4, ['ERROR [' + logger.id + ']'].concat(rest));
  };

  return ConsoleAppender;
}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by shawn on 1/6/17.
 */

var aurelia_logging_console_1 = __webpack_require__(1);
var aurelia_logging_1 = __webpack_require__(0);
exports.Logger = aurelia_logging_1.Logger;
exports.logLevel = aurelia_logging_1.logLevel;
exports.getLogger = aurelia_logging_1.getLogger;
exports.getLevel = aurelia_logging_1.getLevel;
exports.setLevel = aurelia_logging_1.setLevel;
exports.addAppender = aurelia_logging_1.addAppender;
var al = __webpack_require__(0);
/**
 * Value to be prepended to each log message title. Defaults to a random 4 digit integer
 * @type {string}
 */
exports.correlationId = Math.floor(Math.random() * 10000).toString();
/**
 * if true then log message include a random integer (or your custom) prefix to each log entry title.
 * which is fixed for the duration of this script run. This can be used to correlate between different runs
 * of the same script (e.g. multiple runs of a scheduled script or discerning between multiple simultaneous calls
 * to a RESTlet or Suitelet)
 */
exports.includeCorrelationId = false;
/**
 * Controls whether the correlation id prefixes should be included in log messages or not.
 * @param enable if true, adds correlationid to the log messages, otherwise no correlation id prefix is added
 */
exports.setIncludeCorrelationId = function (enable) { return exports.includeCorrelationId = enable; };
// invokes the nsdal log function and handles adding a title tag
function log(loglevel, logger) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    var title = rest[0], details = rest[1];
    var prefix = '';
    if (exports.includeCorrelationId === true) {
        prefix += exports.correlationId + ">";
    }
    // prefix all loggers except the 'default' one used by top level code
    if (logger.id !== 'default') {
        prefix += "[" + logger.id + "]";
    }
    // NetSuite now supports logging js objects but does not log properties from the prototype chain. This is
    // basically how JSON.stringify() works so I presume they are doing that?
    // To cover the most common use case of logging an object to see its properties, first convert to
    // a plain object if it's not one already.
    if (typeof details !== "string")
        details = JSON.stringify(details);
    nlapiLogExecution(toNetSuiteLogLevel(loglevel), prefix + " " + title, details);
}
/**
 * Log appender targeting the NS execution log
 * Severities are mapped as follows:
 *
 * debug -> NS 'DEBUG'
 * info -> NS 'AUDIT'
 * warn -> NS 'ERROR'
 * error -> NS 'emergency'
 */
var ExecutionLogAppender = (function () {
    function ExecutionLogAppender() {
    }
    ExecutionLogAppender.prototype.debug = function (logger) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        log.apply(void 0, [al.logLevel.debug, logger].concat(rest));
    };
    /**
     * Info about info
     * @param logger
     * @param rest
     */
    ExecutionLogAppender.prototype.info = function (logger) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        log.apply(void 0, [al.logLevel.info, logger].concat(rest));
    };
    ExecutionLogAppender.prototype.warn = function (logger) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        log.apply(void 0, [al.logLevel.warn, logger].concat(rest));
    };
    ExecutionLogAppender.prototype.error = function (logger) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        log.apply(void 0, [al.logLevel.error, logger].concat(rest));
    };
    return ExecutionLogAppender;
}());
exports.ExecutionLogAppender = ExecutionLogAppender;
// instantiate the default logger and set it's logging level to the most verbose - this is used as
// the 'main' logger by consumers
var defaultLogger = al.getLogger('default');
defaultLogger.setLevel(al.logLevel.debug);
// maps aurelia numeric levels to NS string level names
function toNetSuiteLogLevel(level) {
    switch (level) {
        case al.logLevel.debug:
            return 'debug';
        case al.logLevel.info:
            return 'audit';
        case al.logLevel.warn:
            return 'error';
        case al.logLevel.error:
            return 'emergency';
    }
}
function getGovernanceMessage(governanceEnabled) {
    //TODO: figure out why TS doesn't like the type of nlapiGetContext().getRemainingUsage()
    return undefined;
    //return governanceEnabled ? `governance: ${remaining}` : undefined
}
/**
 * Uses AOP to automatically log method entry/exit with arguments to the netsuite execution log.
 * Call this method at the end of your script. Log entries are 'DEBUG' level.
 *
 * @param methodsToLogEntryExit array of pointcuts
 * @param {Object} config configuration settings
 * @param {Boolean} [config.withArgs] true if you want to include logging the arguments passed to the method in the
 * details. Default is true.
 * @param {Boolean} [config.withReturnValue] true if you want function return values to be logged
 * @param {Boolean} [config.withProfiling] set true if you want elapsed time info printed for each function
 * @param {Boolean} [config.withGovernance] set true if you want remaining governance units info printed for
 * each function
 * false. Colors not configurable so that we maintain consistency across all our scripts.
 * @param {number} [config.logType] the logging level to use, logLevel.debug, logLevel.info, etc.
 * @returns {} an array of jquery aop advices
 */
function autoLogMethodEntryExit(methodsToLogEntryExit, config) {
    if (!config)
        config = {};
    // include method parameters by default
    var withArgs = config.withArgs !== false;
    // include return values by default
    var withReturnValue = config.withReturnValue !== false;
    // default to not show profiling info
    var withProfiling = config.withProfiling === true;
    // default to not show governance info
    var withGovernance = config.withGovernance === true;
    // logger on which to autolog, default to the top level 'Default' logger used by scripts
    var logger = config.logger || exports.DefaultLogger;
    var level = config.logLevel || al.logLevel.debug;
    var methods = {};
    methods[al.logLevel.debug] = logger.debug;
    methods[al.logLevel.info] = logger.info;
    methods[al.logLevel.warn] = logger.warn;
    methods[al.logLevel.error] = logger.error;
    return aop.around(methodsToLogEntryExit, function (invocation) {
        // record function entry with details for every method on our explore object
        methods[level]("Enter " + invocation.method + "() " + getGovernanceMessage(withGovernance), withArgs ? 'args: ' + JSON.stringify(arguments[0].arguments) : null);
        var startTime = moment();
        var retval = invocation.proceed();
        var elapsedMessage;
        if (withProfiling) {
            var elapsedMilliseconds = moment().diff(startTime);
            elapsedMessage = elapsedMilliseconds + "ms = " +
                moment.duration(elapsedMilliseconds).asMinutes().toFixed(2) + " minutes";
        }
        // record function exit for every method on our explore object
        methods[level](["Exit " + invocation.method + "()",
            elapsedMessage,
            getGovernanceMessage(withGovernance)].join(' ').trim(), withReturnValue ? "returned: " + JSON.stringify(retval) : null);
        return retval;
    });
}
exports.autoLogMethodEntryExit = autoLogMethodEntryExit;
/**
 * The default logger - this should be the main top level logger used in scripts
 */
exports.DefaultLogger = defaultLogger;
/**
 * Use to set the correlation id to a value other than the default random number
 * @param value new correlation id, will be used on all subsequent logging
 */
exports.setCorrelationId = function (value) { return exports.correlationId = value; };
// automatically use a browser appender if this is a client script so as to save network round trips
// caused by logging. Otherwise use the NS serverside execution log.
if (EC.isClientScript)
    al.addAppender(new aurelia_logging_console_1.ConsoleAppender());
else
    al.addAppender(new ExecutionLogAppender());


/***/ }
/******/ ]);