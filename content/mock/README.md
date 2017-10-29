# 基于 Koa 的 Mock Server

实际项目中，调用接口会遇到跨域的问题，解决的方式有多种，这里介绍如何在 webpack 中配置：

```js
module.exports = {
  // ...
  devServer: {
    proxy: {
      // 将 `/api` 开头的 http 请求，都代理到 localhost:3000 上，由 koa 提供 mock 数据
      '/api': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
    // ...
  }
}
```

## REF

- http://www.cnblogs.com/daijingfeng/p/7561302.html