import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'

    const body = await readBody(event)
    const { type, name, person, number } = body
    if(!type || !name || !person || !number) throw 'Dữ liệu đầu vào không hợp lệ'
    if(type < 1 || type > 2) throw 'Dữ liệu đầu vào không hợp lệ'

    await DB.Gate.create(body)

    logAdmin(event, `Thêm kênh thanh toán <b>${name}</b>`)
    return res(event, { message: 'Thêm kênh thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})