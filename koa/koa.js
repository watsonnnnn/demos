let http = require('http');
let response = require('./response');
let request = require('./request');
let context = require('./context');

class Koa{
  constructor(){
    this.middleware = null;
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.context = Object.create(context);
  }

  use(fn){
    this.middleware = fn;
  }
  handleRequest(req, res){
    let ctx = this.createContext(req, res);
    this.middleware(ctx);

    res.statusCode = 404;
    if(ctx.body){
      res.statusCode = 200;
      res.end(ctx.body);
    }else{
      res.end('Not Found')
    }
  }
  createContext(req, res){
    let ctx = this.context;
    ctx.request = this.request;
    ctx.request.req = ctx.req = req;

    ctx.response = this.response;
    ctx.response.res = ctx.res = res;

    return ctx;
  }

  listen(...args){
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
    console.log(`current server is running on port: ${args[0]}`)
  }
}

module.exports = Koa;