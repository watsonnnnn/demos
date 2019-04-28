let Koa = require('./koa');

let k = new Koa()

k.use(async (ctx, next)=>{
    console.log(ctx.req.url, ctx.request.req.url, ctx.url,ctx.request.url);
    next();
    next();
    // ctx.body = 'hello test';
})

k.use(async (ctx)=>{
    console.log('async 2');
    // ctx.body = 'hello test';
})

k.listen(8888);