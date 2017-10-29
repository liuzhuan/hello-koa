const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  console.log('before x-response-time')
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
  console.log('after x-response-time')
})

app.use(async (ctx, next) => {
  console.log('before logger')
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

app.use(async ctx => {
  ctx.body = 'Hello Monica'
})

app.listen(3000)
console.log('[cascading] running on 3000')
