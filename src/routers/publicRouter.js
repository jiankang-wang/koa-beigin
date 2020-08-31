import Router from 'koa-router'
import publicController from '../api/publicController'

const router = new Router()

router.prefix('/api')

router.get('/getCaptcha', publicController.getCaptcha)

export default router
