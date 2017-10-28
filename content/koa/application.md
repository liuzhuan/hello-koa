## Application

Koa 应用程序包含一系列中间件函数，当监测到请求时，会想栈一样处理数据。

习惯性的 hello world 应用：

```js
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  ctx.body = 'Hello World'
})

app.listen(3000)
```

### REF

- http://koajs.com