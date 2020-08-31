const Router = require('koa-router')

const router = new Router()

// 接口前缀
router.prefix('/api')

// 引入模块a
const api = require('../api/a')

router.get('/a', api.a)

module.exports = router
