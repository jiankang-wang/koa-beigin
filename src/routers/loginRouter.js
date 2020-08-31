import Router from 'koa-router'
import loginController from '../api/loginController'

const router = new Router()
router.prefix('/api')

router.post('/forget', loginController.forget)

router.post('/login', loginController.login)
router.post('/register', loginController.register)

export default router