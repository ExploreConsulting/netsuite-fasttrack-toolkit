(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ConsoleAppender = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsoleAppender = undefined;

var _aureliaLogging = require('aurelia-logging');



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
},{"aurelia-logging":2}],2:[function(require,module,exports){
'use strict';

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
},{}]},{},[1])(1)
});