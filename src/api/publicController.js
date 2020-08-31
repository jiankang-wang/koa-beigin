import svgCaptcha from 'svg-captcha'
import { setValue } from '@/config/redis.config'

class publicController {
  constructor() {}
  async getCaptcha(ctx) {
    const body = ctx.request.query
    const newCaptcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1i',
      noise: Math.floor(Math.random() * 4),
      color: true,
      height: 45
    })
    // 存入redis 设置过期时间
    setValue(body.sid, newCaptcha.text, 10 * 60)
    ctx.body = {
      code: 200,
      data: newCaptcha.data
    }
  }
}

export default new publicController()