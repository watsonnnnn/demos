let http = require('http');
let url = require('url');

function createApplication(params) {
    let app = (req, res) => {
        let md = req.method.toLowerCase();
        let {
            pathname
        } = url.parse(req.path);

        // for(let i=0; i<app.routes.length; i++){
        //     let {method, path, handler} = app.routes[i];
        //     if((method == md || method === 'all') && (path == pathname || path == '*')) handler(req, res);
        // }

        let index = 0;

        function next(err) {

            if (index == app.routes.length) {
                return res.end(`cannot ${md} ${pathname}`);
            }

            let {
                method,
                path,
                handler
            } = app.routes[index++];

            if (err) {

                if(handler.length == 4){
                    handler(err, req, res, next);
                }else{
                    next(err);
                }

            } else {

                if (method == 'middle') { // middleware
                    if (path === '/' || path === pathname || pathname.startsWith(path + '/')) {
                        handler(req, res, next);
                    } else {
                        next();
                    }
                } else { // route
                    if ((method == md || method === 'all') && (path == pathname || path == '*')) handler(req, res);
                    else {
                        next();
                    }
                }
            }
        }

        next();

        // res.end(`cannot ${m} ${pathname}`);
    }

    app.routes = [];
    app.listen = function () {
        let server = http.createServer(app);
        server.listen(...arguments);
    }

    app.use = function (path, handler) {
        if (typeof handler != 'function') {
            handler = path;
            path = '/';
        }
        let layer = {
            method: 'middle', // middleware
            path,
            handler
        }
        app.routes.push(layer);
    }

    app.all = function (path, handler) {
        let layer = {
            method: 'all',
            path,
            handler
        }
        app.routes.push(layer);
    }

    http.METHODS.forEach((method) => {
        app[method.toLowerCase()] = function (path, handler) {
            let layer = {
                method: method.toLowerCase(),
                path,
                handler
            }
            app.routes.push(layer);
        }
    });

    return app;
}

module.exports = createApplication;
