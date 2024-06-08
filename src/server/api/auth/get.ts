import type { IAuth, IDBUser, IDBLogLogin, IDBUserStore } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    // Get User
    const auth = await getAuth(event) as IAuth
    const user = await DB.User.findOne({ _id: auth._id }) as IDBUser

    // Get Date
    const now  = new Date()
    const nowDate = formatDate(event, now)
    user.last_login = now

    // User Login
    let createNewLogin = false
    const lastLogin = await DB.LogLogin.findOne({ user: user._id }).sort({ createdAt: -1 }).limit(1) as IDBLogLogin
    if(!lastLogin) createNewLogin = true
    else {
      const lastLoginDate = formatDate(event, lastLogin.createdAt)
      if(lastLoginDate.day != nowDate.day) createNewLogin = true
    }
    if(!!createNewLogin) await DB.LogLogin.create({ user: user._id })

    // User Vip
    if(user.vip.month.enable){
      const end = DayJS(user.vip.month.end).unix()
      const now = DayJS(Date.now()).unix()
      if(end < now){
        user.vip.month.enable = false
        user.vip.month.end = null
      }
    }

    // Save
    await user.save()

    // Result
    const userStore : IDBUserStore = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      type: user.type,
      social: user.social,
      vip: user.vip
    }

    return res(event, { result: userStore })
  } 
  catch (e:any) {
    return res(event, { code: 401, message: e.toString() })
  }
})