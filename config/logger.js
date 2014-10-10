var intel = require('intel');

module.exports = function (logpath) {
    return {
        formatters: {
            'error': {
                'format': '[%(date)s] %(name)s.%(levelname)s: %(message)s',
                'strip': true
            },
            'console': {
                'format': '[%(levelname)s] %(name)s   %(message)s',
                'colorize': true
            }
        },
        handlers: {
            error: {
                class: intel.handlers.File,
                file: logpath + '/error.log',
                formatter: 'error',
                level: intel.ERROR
            },
            debug: {
                class: intel.handlers.Console,
                formatter: 'console'
            }
        },
        loggers: {
            root: {
                level: intel.TRACE,
                handlers: process.env.DEBUG ? ['debug'] : ['error']
            }
        }
    }
};