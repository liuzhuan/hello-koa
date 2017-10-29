## Context 上下文

Koa Context 将 node 的 `request` 和 `response` 封装为一个对象，并提供许多有益方法。这些方法太常用了，所以 Koa 提供了一揽子方案。

每次请求会创建一个 Context，被中间件当作 receiver，或 `ctx` 变量，比如：

```js
app.use(async ctx => {
  ctx; // is the Context
  ctx.request; // is a koa Request
  ctx.response; // is a koa Response
});
```

context 的很多属性和方法其实都会调用底层的 `ctx.request` 或 `ctx.response` 。比如，`ctx.type` 和 `ctx.length` 会调用 `response` 对象，`ctx.path` 和 `ctx.method` 会调用 `request` 对象。

### API

下面展示了 Context 特有的方法和属性。

- `ctx.req` Node 的 request 对象
- `ctx.res` Node 的 response 对象
- `ctx.request` koa request 对象
- `ctx.response` koa response 对象
- `ctx.state` 在中间件传递信息的推荐命名空间。比如：`ctx.state.user = await User.find(id)`
- `ctx.app` 应用实例引用
- `ctx.cookies.get(name, [options])`
- `ctx.cookies.set(name, value, [options])` 选项包括如下值：
  - `maxAge`
  - `signed`
  - `expires`
  - `path`
  - `domain`
  - `secure`
  - `httpOnly`
  - `overwrite`
- `ctx.throw([status], [msg], [properties])`
- `ctx.assert(value, [status], [msg], [properties])`
- `ctx.respond` 设置为 false ，可以跳过 koa 的处理机制。**不建议**

### REF

- http://koajs.com/#context
- https://github.com/pillarjs/cookies
- https://github.com/jshttp/http-assert