var router = require('koa-route');

module.exports = function (app) {
    var main = require('./controller/main');

    //main
    app.use(router.get('/', main.index));

    return router;
};