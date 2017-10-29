## Application

Koa 应用程序包含一系列中间件函数，当监测到请求时，会像栈一样处理数据。

比如，hello world 应用：

```js
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  ctx.body = 'Hello World'
})

app.listen(3000)
```

### Cascading 数据串联流程

通过 async 函数，Koa 实现了“真正的”中间件。与 Connect 的击鼓传花式传递控制权不同，Koa 首先调用 `downstream`，然后控制流程 `upstream`。

下面的例子在页面中输出 `Hello Monica`，首先请求会依次经过 `x-response-time` 和 `logging` 中间件，各自记录请求发生的时间，然后才把控制权交给 `response` 中间件。当中间件调用 `next()` 时，当前函数暂停，控制权移交到后一个中间件。当后面没有中间件后，栈会回溯，向上依次执行上一级的命令。

```js
const Koa = require('koa')
const app = new Koa()

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// logger
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// response
app.use(async ctx => {
  ctx.body = 'Hello Monica'
})

app.listen(3000)
```

### Settings 设置

应用的设置值是 `app` 实例的属性，目前支持的属性如下：

- `app.env` 默认是 `NODE_ENV` 或 `"development"`
- `app.proxy` 当真正的代理头信息字段会被信任？
- `app.subdomainOffset` 可以忽略的 `.subdomains` 偏移值

### app.listen(...)

Koa 应用并非一对一的 HTTP 服务器。多个 Koa 应用可以在一个 HTTP 服务器整合成更强大的网络应用。

以下是一个没啥用的 Koa 应用：

```js
const Koa = require('koa')
const app = new Koa()
app.listen(3000)
```

`app.listen()` 其实是下面代码的语法糖：

```js
const http = require('http')
const Koa = require('koa')
const app = new Koa()
http.createServer(app.callback()).listen(3000)
```

这意味着你可以把同样的应用逻辑部署到 http 和 https ，也能部署到多个地址上：

```js
const http = require('http')
const https = require('https')
const Koa = require('koa')
const app = new Koa()

http.createServer(app.callback()).listen(3000)
https.createServer(app.callback()).listen(3001)
```

### app.callback()

返回一个适合 `http.createServer()` 的回调函数，可以处理请求。也可以使用这个回调函数，将 koa 应用加载到 Connect/Express 应用上。

### app.use(function)

将给定的中间件函数加入到应用中。

### app.keys=

设置签名 cookie 键值

These are passed to **KeyGrip**, however you may also pass your own KeyGrip instance. For example the following are acceptable:

```js
app.keys = ['im a newer secret', 'i like turtle']
app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256')
```

These keys may be rotated and are used when signing cookies with the `{ signed: true }` option:

```js
ctx.cookies.set('name', 'tobi', { signed: true });
```

### `app.context`

`app.context` 是被 `ctx` 继承的原型。可以通过编辑 `app.context` 为 `ctx` 增加更多属性或方法。这些新增的属性或方法在整个应用有效，但是这会造成对 `ctx` 的强耦合，可能被认为是一种 **anti-pattern**。

比如，可以把数据库的引用加入到 `ctx` 中：

```js
app.context.db = db()

app.use(async ctx => {
  console.log(ctx.db)
})
```

## Error Handling 错误处理

除非 `app.silent` 为真，默认将所有错误输出到 `stderr`。默认的错误处理在 `err.status === '404'` 或 `err.expose === true` 时，也不会输出错误。如果需要自定义错误处理逻辑，比如集中到日志打印，你可以增加 `"error"` 事件监听器：

```js
app.on('error', err => {
  log.error('server error', err)
})
```

如果错误在请求/响应周期中发生，不可能响应客户端时，Context 实例也会传递进来：

```js
app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
})
```

When an error occurs and it is still possible to respond to the client, aka no data has been written to the socket, Koa will respond appropriately with a 500 "Internal Server Error". In either case an app-level "error" is emitted for logging purposes.

如果错误发生时，还可能对客户端响应，Koa 将会贴心地返回 `500 "Internal Server Error"`。在这种情况下，会抛出 app 级别 "error" 用于记录。

### REF

- http://koajs.com
- https://github.com/koajs/koa/wiki#middleware
- https://github.com/crypto-utils/keygrip