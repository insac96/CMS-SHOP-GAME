import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'

    const { _id } = await readBody(event)
    if(!_id) throw 'Dữ liệu đầu vào không hợp lệ'

    const category = await DB.GamePlatform.findOne({ _id: _id }).select('name')
    if(!category) throw 'Nền tảng trò chơi không tồn tại'
    
    const game = await DB.Game.count({ category: _id })
    if(game > 0) throw 'Không thể xóa nền tảng đã có trò chơi'

    await DB.GamePlatform.deleteOne({ _id: _id })
    logAdmin(event, `Xóa nền tảng trò chơi <b>${category.name}</b>`)

    return res(event, { message: 'Xóa thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})