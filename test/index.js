const Koa = require('koa')
var Router = require('koa-router')
var cors = require('@koa/cors')
var koaBody = require('koa-body')
const json = require('koa-json')

const app = new Koa()
const router = new Router()


// 接口前缀
router.prefix('/api')

// 1: request、methods、response
// 2: api url => function 、 Router
// 3: ctx async 
router.get('/', ctx => {
  ctx.body = 'Hello Koa'
})

router.get('/testapi', ctx => {
  // get params
  const params = ctx.request.query
  console.log(params)
  ctx.body = {
    name: params.name,
    age: params.age
  }
})

router.get('/asyc', async (ctx) => {
  let result = await new Promise(resolve => {
    setTimeout(() => {
      resolve('already 2s lates')
    }, 2000)
  })
  ctx.body = result
})

router.post('/testpost', async (ctx) => {
  const { body } = ctx.request
  console.log(body)
  ctx.body = {
    ...body
  }
})

app.use(koaBody())
app.use(cors())
app.use(json({ pretty: false, param: 'pretty' }))

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)