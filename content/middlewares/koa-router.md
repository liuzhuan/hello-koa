## koa-router

一款用于 koa 的路由中间件

作者：Alex Mingoia

### 安装

```
npm install koa-router
```

### API 介绍

Router 构造函数。基本用法如下：

```js
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/', function (ctx, next) {
  // ctx.router available
})

app
  .use(router.routes())
  .use(router.allowedMethods())
```

### REF

- https://github.com/alexmingoia/koa-router 老版本，适合 koa 1.x
  - https://github.com/alexmingoia/koa-router/tree/master 7.x 新版本，适合 koa 2.x
- https://github.com/alexmingoia
- http://alexmingoia.com/