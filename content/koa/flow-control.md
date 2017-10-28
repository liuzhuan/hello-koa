## 流程控制

先下流后上流

```js
var koa = require('koa')()

koa.use(function* (next) {
  // 传递到下一个生成器之前执行
  console.log('A')
  yield next

  // 上流最后一位
  console.log('B')
})

koa.use(function* (next) {
  console.log('C')
  yield next
  console.log('D')
})

koa.use(function* () {
  console.log('E')
  this.body = 'hey guys'
  console.log('F')
})

koa.listen(3000)
```

### REF

- https://code.tutsplus.com/tutorials/introduction-to-generators-koajs-part-1--cms-21615