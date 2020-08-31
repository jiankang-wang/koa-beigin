import mongoose from '../config/DBhelper'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: String,
  nickName: String,
  password: String
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel