import type { IAuth, IDBUser } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'

    const data = await readBody(event)
    const { email, phone, avatar, social } = data

    const user = await DB.User
    .findOne({ _id: auth._id }) 
    .select('email phone avatar social') as IDBUser

    if(!!user.email && user.email != email) throw 'Không thể cập nhật lại Email'
    if(!!user.phone && user.phone != phone) throw 'Không thể cập nhật lại Số Điên Thoại'

    if(!user.email && !!email){
      if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) throw 'Định dạng Email không đúng'
      const userCheck = await DB.User.findOne({ email: email }).select('_id') as IDBUser
      if(userCheck) throw 'Số điện thoại đã được sử dụng'
    }
    if(!user.phone && !!phone){
      if (!phone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)) throw 'Định dạng số điện thoại không đúng'
      const userCheck = await DB.User.findOne({ phone: phone }).select('_id') as IDBUser
      if(userCheck) throw 'Số điện thoại đã được sử dụng'
    }
    
    // Update
    await DB.User.updateOne({ _id: auth._id }, {
      email: email ? email.toString() : '',
      phone: phone ? phone.toString() : '',
      avatar: avatar ? avatar.toString() : '/images/user/default.png',
      social: {
        facebook: social.facebook ? social.facebook.toString() : '',
        zalo: social.zalo ? social.zalo.toString() : '',
        tiktok: social.tiktok ? social.tiktok.toString() : '',
        telegram: social.telegram ? social.telegram.toString() : ''
      }
    })
    return res(event, { message: 'Cập nhật thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})