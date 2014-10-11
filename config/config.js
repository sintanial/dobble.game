var path = require('path');

const env = process.env.NODE_ENV || 'dev';

var params = require('./params')[env];

var basepath = path.resolve(__dirname, '../');
var src = path.resolve(basepath, 'src');

module.exports = {
    name: "dobble",
    keys: ['dsf*d=387dfs6gs(S7dgasnqw!32'],
    env: env,
    port: params.port,
    logger: require('./logger')(path.resolve(basepath, 'var/logs')),
    static: {
        directory: path.resolve(basepath, 'public')
    },
    bodyparser: {},
    session: {
        cookie: {
            maxAge: 1000 * 60 * 60 * 24//24 hours
        }
    },
    flash: {
        key: 'flash-data'
    },
    view: {
        directory: path.resolve(src, 'views'),
        default: 'swig',
        cache: env !== 'prod' ? false : 'memory',
        map: {
            'swig': 'swig',
            'html': 'swig'
        }
    },
    locale: {},
    i18n: {
        directory: path.resolve(src, 'locales'),
        defaultLocale: 'en',
        locales: ['en'],
        query: false,
        subdomain: true,
        cookie: false,
        header: false
    },
    error: {
        view: 'error/error',
        layout: 'layouts/error',
        custom: {
            401: 'error/401',
            403: 'error/403',
            404: 'error/404'
        }
    }
}