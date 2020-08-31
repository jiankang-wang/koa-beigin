const Koa = require('koa')
const app = new Koa()

const middleware = function (ctx, next) {
  console.log('this is middleware')
  next()
  console.log('middleware logs ')
}

const middleware1 = function(ctx, next) {
  console.log('this is middleware one')
  next()
}

const middlewaretwo = function(ctx, next) {
  console.log('this is middleware two')
  next()
  console.log('middlewaretwo logs two')
}

app.use(middleware)
app.use(middleware1)
app.use(middlewaretwo)

app.listen(3000)

// 输出结果是
// 这里注意， 在next() 之后进行方法的操作是为了， 比方说打印日志， 清楚缓存啥的
// this is middleware
// this is middleware one
// this is middleware two
// middlewaretwo logs two
// middleware logs 
