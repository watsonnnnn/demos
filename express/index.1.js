let http = require('http');
let url = require('url');

function createApplication(params) {
    let app = (req, res) => {
        let md = req.method.toLowerCase();
        let {pathname} = url.parse(path);
        for(let i=0; i<app.routes.length; i++){
            let {method, path, handler} = app.routes[i];
            if((method == md || method === 'all') && (path == pathname || path == '*')) handler(req, res);
        }
        res.end(`cannot ${m} ${pathname}`);
    }

    app.routes = [];
    app.listen = function(){
        let server = http.createServer(app);
        server.listen(...arguments);
    }

    app.all = function (path, handler) {
        let layer = {
            method: 'all',
            path,
            handler
        }
        app.routes.push(layer);
    }

    http.METHODS.forEach((method)=>{
        app[method.toLowerCase()] = function(path, handler){
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