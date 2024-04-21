import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'

    const body = await readBody(event)
    const { title, money, reason, images, time } = body
    if(!title || !reason || !time) throw 'Vui lòng nhập đầy đủ thông tin'
    if(!!isNaN(parseInt(money)) || parseInt(money) < 0) throw 'Dữ liệu tiền tệ không hợp lệ'
    if(!Array.isArray(images)) throw 'Dữ liệu hình ảnh không hợp lệ'

    body.time = new Date(time)
    body.user = auth._id
    await DB.Spend.create(body)
    logAdmin(event, `Thêm mục chi tiêu <b>${title}</b>`)
    
    return res(event, { message: 'Thêm thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})