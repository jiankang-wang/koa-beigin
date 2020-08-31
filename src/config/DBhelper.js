import mongoose from 'mongoose'
import config from './index'

mongoose.connect(config.DB_URL,{ 
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 连接成功
mongoose.connection.on('connected', () => {
  console.log('mongoose connection open to:' + config.DB_URL)
})

// l连接异常
mongoose.connection.on('error', (err) => {
  console.log('mongoose connection error:' + err)
})

// 断开连接
mongoose.connection.on('disconnect', () => {
  console.log('mongoose connection disconnected')
})

export default mongoose