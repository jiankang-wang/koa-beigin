import User from './test'

// 增
const user = {
  name: 'wjkDemo',
  age: 100,
  email: 'wjkDemo@qq.com'
}
const insertMethods = async () => {
  const data = new User(user)
  const result = await data.save()
  console.log(result)
}

// 查
const findMethods = async () => {
  const result = await User.find()
  console.log(result)
}

// 改
const updateMethods = async () => {
  const result = await User.updateOne({ name: 'wjkDemo' }, {
    email: 'wangjiankang_wjk@qq.com'
  })
  console.log(result)
}

// 删
const deleteMethods = async () => {
  const result = await User.deleteOne({ name: 'wjkDemo' })
  console.log(result)
}

// insertMethods()
findMethods()
// updateMethods()
// deleteMethods()
