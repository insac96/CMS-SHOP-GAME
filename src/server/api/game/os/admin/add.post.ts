import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'

    const body = await readBody(event)
    const { name } = body
    if(!name) throw 'Dữ liệu đầu vào không hợp lệ'

    const key = formatVNString(event, name, '-')

    const getByName = await DB.GameOS.findOne({ key: key }).select('_id')
    if(!!getByName) throw 'Tên hệ điều hành đã tồn tại'

    body.key = key
    await DB.GameOS.create(body)
    logAdmin(event, `Thêm hệ điều hành trò chơi <b>${name}</b>`)
    
    return res(event, { message: 'Thêm thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})