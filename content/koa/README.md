# Koa

next generation web framework for node.js

Koa 官网的 logo 使用了 150px 的 Italiana 字体，优美间接。

## 简介

Koa 是一个崭新的网络框架，出自 Express 团队成员之手。它的目标是成为一个轻量、更有表现力和更健壮的基础。通过使用 generator 生成器，Koa 允许你丢弃回调函数，极大的提高错误处理能力。

## 安装

Koa 需要使用 **node v7.6.0** 或更高版本，才可以使用 ES2015 和 async 函数。

```
npm i koa
```

## 使用 Babel 的 async 函数

为了在 node 7.6- 版本中使用 `async` 函数，推荐使用 babel 的 require hook

```js
require('babel-core/register')
// require the rest of the app that needs to be transpiled after the hook
const app = require('./app')
```

为了解析和转移 async 函数，至少需要使用 `transform-async-to-generator` 或 `trasform-async-to-module-method` 插件。比如，在你的 `.babelrc` 文件中，你应该使用：

```json
{
  "plugins": ["transform-async-to-generator"]
}
```

也可以使用 `env preset` 将目标选项设定为 `"node": "current"` 



## REF

- http://koajs.com
- http://babeljs.io/docs/usage/babel-register/