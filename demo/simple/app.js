var Koa = require('koa')
var app = new Koa()

app.use(function* () {
  this.body = 'Hello World!!!v2'
})

app.listen(3000)
