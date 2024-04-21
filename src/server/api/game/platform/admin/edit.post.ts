import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'

    const body = await readBody(event)
    const { _id, name } = body
    if(!_id || !name) throw 'Dữ liệu đầu vào không hợp lệ'

    const category = await DB.GamePlatform.findOne({ _id: _id }).select('name')
    if(!category) throw 'Nền tảng không tồn tại'

    if(category.name != name){
      const key = formatVNString(event, name, '-')
      const getByName = await DB.GamePlatform.findOne({ name: name }).select('_id')
      if(!!getByName) throw 'Tên nền tảng đã tồn tại'

      body.key = key
    }

    delete body['_id']
    await DB.GamePlatform.updateOne({ _id: _id }, body)

    logAdmin(event, `Sửa thông tin nền tảng trò chơi <b>${category.name}</b>`)

    return res(event, { message: 'Sửa thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})