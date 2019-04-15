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
    console.log(req.url)
  }

  listen(...args){
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args)
  }
}

module.exports = Koa;