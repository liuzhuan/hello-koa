const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

router.get('/user/:id', async (ctx, next) => {
  console.log(`/user/:id ${ctx.params.id}`)
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)
