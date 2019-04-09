let http = require('http');

class Koa{
  constructor(){

  }

  use(fn){

  }
  handleRequest(req, res){
    console.log(req.url)
  }

  listen(...args){
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(8088)
  }
}