import send from '../config/MailConfig'
import moment from 'moment'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config/index'
import { checkCode } from '../common/utils'
import User from '../model/user'

class LoginController {
  constructor() {}
  async forget (ctx) {
    const { body } = ctx.request
    try {
      const result = await send({
        code: '1234',
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        email: body.user,
        user: 'wangjiankang'
      })
      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功'
      }
    } catch (error) {
      console.log(error)
    } 
  }

  async login (ctx) {
    const { body } = ctx.request
    // 验证码的一个校验,时效性和正确性
    let sid = body.sid
    let code = body.code
    if (await checkCode(sid, code)) {
      // 验证用户名和密码是否正确
      let checkUserPassword = false
      const user = await User.findOne({ username: body.username })
      if (bcrypt.compare(body.password, user.password)) {
        checkUserPassword = true
      }
      if (checkUserPassword) {
        // token 的一个生成
        const token = jsonwebtoken.sign({
          _id: 'wangjiankang',
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
        }, config.JWT_SECRET)
        ctx.body = {
          code: 200,
          token: token
        }
      } else {
        ctx.body = {
          code: 404,
          msg: '用户名或密码错误'
        }
      }
    } else {
      ctx.body = {
        code: 401,
        msg: '图形验证码不正确，请检查'
      }
    }
  }

  async register (ctx) {
    const { body } = ctx.request
    let sid = body.sid
    let code = body.code
    let check = true
    if (await checkCode(sid, code)) {
      const user1 = await User.findOne({ username: body.username })
      if (user1 !== null && typeof user1.username !== 'undefined') {
        ctx.body = {
          msg: {
            user: ['此邮箱已经注册，可以通过邮箱找回密码']
          }
        }
        check = false
        return 
      }
      const user2 = await User.findOne({ nickName: body.nickName })
      if (user2 !== null && typeof user2.nickName !== 'undefined') {
        ctx.body = {
          msg: {
            nickName: ['此昵称已经被注册，请修改']
          }
        }
        check = false
        return
      }
      if (check) {
        const user = new User({
          username: body.username,
          nickName: body.nickName,
          password: await bcrypt.hash(body.password, 5),
          created: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        let result = await user.save()
        ctx.body = {
          code: 200,
          data: result,
          msg: '注册成功'
        }
        return
      }
    } else {
      ctx.body = {
        msg: ['图形验证码不正确, 请检查']
      }
    }
  }
}

export default new LoginController()