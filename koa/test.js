let Koa = require('./koa');

let k = new Koa()

k.use(async (ctx)=>{
    console.log(ctx.req.url, ctx.request.req.url, ctx.url,ctx.request.url);
    // ctx.body = 'hello test';
})

k.listen(8888);