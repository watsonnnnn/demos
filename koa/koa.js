let http = require('http');
let response = require('./response');
let request = require('./request');
let context = require('./context');

class Koa{
  constructor(){
    this.middlewares = [];
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.context = Object.create(context);
  }

  use(fn){
    this.middlewares.push(fn);
  }

  compose(ctx, middlewares){
    let i = -1;
    const dispatch = async (index) => {
      if(index <= i) return Promise.reject('multi call next()');
      i = index;
      if(index === middlewares.length) return;
      let middleware = middlewares[index];
      return middleware(ctx, ()=>{
        dispatch(index + 1); // 不能是i++ 因为这个next方法可能被多次调用
      })
    }
    return dispatch(0);
  }

  async handleRequest(req, res){
    let ctx = this.createContext(req, res);
    let p = await this.compose(ctx, this.middlewares);
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