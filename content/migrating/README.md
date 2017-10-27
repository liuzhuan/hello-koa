# Migrating

## 全新中间件签名

```js
// use async arrow functions
app.use(async (ctx, next) => {
  try {
    await next() // next is now a function
  } catch (err) {
    ctx.body = { message: err.message }
    ctx.status = err.status || 500
  }
})

app.use(async ctx => {
  const user = await User.getById(this.session.userid) // await instead of yield
  ctx.body = user // ctx instead of this
})
```

## 在 v2.x 中使用 v1.x

```js
const convert = require('koa-convert')

app.use(convert(function* (next){
  // ...
}))
```

## 升级中间件

需要使用新的中间件签名将生成器转换为 async 函数：

```js
app.use(async (ctx, next) => {
  const user = await Users.getById(this.session.user_id)
  await next()
  ctx.body = { message: 'some message' }
})
```

## 应用对象构造函数需要 new

旧代码

```js
var koa = require('koa')
var app = koa()
```

v2.x 使用 es6 类：

```js
var Koa = require('koa')
var app = new Koa()
```

## 更新代码

- 到处返回 promise
- 不要使用 `yield*`
- 不要使用 `yield {}` 或 `yield []`
  - 将 `yield []` 转换为 `yield Promise.all([])`
  - 将 `yield {}` 转换为 `yield Bluebird.props({})`

## ENV 特定日志行为移除

从错误处理中移除了对 `test` 环境的明确检查

## 依赖变化

- Koa 不再原生支持 [co](https://github.com/tj/co)
- [composition] 已被废弃

## REF

- https://github.com/koajs/koa/blob/master/docs/migration.md