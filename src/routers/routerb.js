const Router = require('koa-router')

const router = new Router()

// 接口前缀
router.prefix('/api')

// 引入模块a
const api = require('../api/b')

router.get('/b', api.b)

module.exports = router
