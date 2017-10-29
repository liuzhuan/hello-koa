// Hello World example for Koa

const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  ctx.body = 'Hello Monica'
})

app.listen(3000)
console.log('Running on 127.0.0.1:3000...')
