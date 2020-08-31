import combineRouters from 'koa-combine-routers'
import routerA from './routera'
import routerB from './routerb'
import publicRouter from './publicRouter'
import loginRouter from './loginRouter'

const router = combineRouters(
  routerA,
  routerB,
  publicRouter,
  loginRouter
)

export default router