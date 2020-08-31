// const path = require('path')
// const Koa = require('koa')
// const cors = require('@koa/cors')
// const koaBody = require('koa-body')
// const json = require('koa-json')
// const helmet = require("koa-helmet")
// 静态资源服务
// const statics = require('koa-static')
// const router = require('./routers/routers')

// 可以写成es6的打入形式
import path from 'path'
import Koa from 'koa'
import JWT from 'koa-jwt'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import json from 'koa-json'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import router from './routers/routers.js'
import compose from 'koa-compose'
import compress from 'koa-compress'
import errorHandle from './common/ErrorHandle'
import config from './config/index'

const app = new Koa()

// 环境判断
const isDevMode = process.env.NODE_ENV === 'production' ? false : true

// app.use(koaBody())
// app.use(cors())
// app.use(json({ pretty: false, param: 'pretty' }))
// app.use(helmet()) // 安全头部信息
// // 静态资源服务
// app.use(statics(path.join(__dirname, '../public')))

// 定义公共路径， 不需要jwt鉴权
const jwt = JWT({
  secret: config.JWT_SECRET
}).unless({ path: [/^\/public/, /\/api\/login/, /\/api\/getCaptcha/, /\/api\/register/] })

// 进行整合(集成中间件)
const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  json({ pretty: false, param: 'pretty' }),
  helmet(),
  errorHandle,
  jwt
])

// 压缩中间件
if(!isDevMode) {
  app.use(compress())
} 

let port = !isDevMode ? 12005 : 3000

app.use(middleware)
app.use(router())


app.listen(port)