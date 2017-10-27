# Generators

Koa.js 使用了 generators. 

## 什么是 Generators?

Generators 引入了暂停和继续的功能。

```js
var generator_func = function* (){}
```

在函数中使用 `yield` 关键字停止执行，保存当前的栈。

一个简单的样例：

```js
var r = 3

function* infinite_ap(a) {
  for (;;) {
    a = a + r
    yield a
  }
}

var sum = infinite_ap(5)
console.log(sum.next())
console.log(sum.next())
```

## 可用的 Generators 方法

### `next()`

### `throw()`

### 委托 `yield`

可以返回 generator 的 generator。



## REF

- https://code.tutsplus.com/tutorials/introduction-to-generators-koajs-part-1--cms-21615