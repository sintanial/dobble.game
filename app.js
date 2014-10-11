var thunkify = require('thunkify');


var koa = require('koa');
koa.static = require('koa-static');

var reqlog = require('koa-logger');
koa.logger = function (assets) {
    var lg = reqlog();
    if (!assets) {
        return function *(next) {
            if (/(\.js|\.css|\.ico|\.png)$/.test(this.path)) {
                yield next;
            } else {
                yield lg.call(this, next);
            }
        }
    } else {
        return lg;
    }
};

koa.session = require('koa-generic-session');
koa.route = require('koa-route');
koa.bodyparser = require('koa-bodyparser');
koa.views = require('koa-views');
koa.locale = require('koa-locale');
koa.i18n = require('koa-i18n');
koa.flash = require('koa-flash');
koa.qs = require('koa-qs');
koa.cache = require('koa-cash');


var config = require('./config/config');
var routes = require('./src/routes');

var app = koa();

app.name = config.name;
app.keys = config.keys;
app.env = config.env;
app.config = config;


app.use(function *(next) {
    try {
        yield next;
    } catch (e) {
        if (e instanceof ClientError) {
            this.status = 200;
            this.body = {
                error: {
                    message: e.message,
                    code: e.code
                }
            };
        } else {
            this.status = 500;

            if (this.app.env == 'dev') {
//                this.body = e;
                throw e;
            } else {
                this.di.logger.error(e);
                this.body = 'internal server error'; // TODO: render pretty 500 error
            }
        }
    }
});

koa.qs(app);
app.use(koa.logger());
app.use(function *(next) {
    if (this.isAjax !== undefined) {
        this.isAjax = this.header['x-requested-with'] && this.header['x-requested-with'].toLowerCase() === 'xmlhttprequest';
    }
    yield next;
});
app.use(koa.bodyparser(config.bodyparser));
app.use(koa.static(config.static.directory, config.static));
koa.locale(app);
app.use(koa.i18n(app, config.i18n));
app.use(koa.session(config.session));
app.use(koa.views(config.view.directory, config.view));
app.use(koa.flash(config.flash));

routes(app);

if (!module.parent) {
    app.listen(config.port, function () {
        console.log('Server running on port ' + config.port)
    });
} else {
    module.exports = app;
}