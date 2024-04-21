import md5 from 'md5'
import jwt from 'jsonwebtoken'
import { IDBUser } from '~~/types'

export default defineEventHandler(async (event) => {
  try {
    const runtimeConfig = useRuntimeConfig()
    const { username, password } = await readBody(event)
    if(!username || !password) throw 'Vui lòng nhập đầy đủ thông tin'

    // Get User
    const user = await DB.User
    .findOne({ username: username.toLowerCase() })
    .select('username password block type token') as IDBUser
    
    // Check User
    if(!user) throw 'Tài khoản không tồn tại'
    if(md5(password) != user.password) throw 'Mật khẩu không chính xác'
    if(!!user.block) throw 'Tài khoản của bạn đang bị khóa'

    // Create Token and Cookie
    const token = jwt.sign({
      _id : user._id
    }, runtimeConfig.TOKEN_SECRET, { expiresIn: '360d' })

    setCookie(event, 'token-auth', token, runtimeConfig.public.COOKIE_CONFIG)
    user.token = token
    await user.save()

    // Save IP
    const IP = getRequestIP(event, { xForwardedFor: true })

    // Save Log
    logUser(event, user._id, `Đăng nhập với IP <b>${IP}</b>`)

    return res(event, { message: 'Đăng nhập thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})