const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  console.log(`
    header: ${Object.keys(ctx.header)}
    url: ${ctx.url}
    origin: ${ctx.origin}
    originalUrl: ${ctx.originalUrl}
    host: ${ctx.host}
    hostname: ${ctx.hostname}
  `)
  await next()
})

app.use(async ctx => {
  ctx.body = 'Hello Monica!'
})

app.listen(3000)
