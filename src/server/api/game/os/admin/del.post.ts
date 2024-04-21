import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'

    const { _id } = await readBody(event)
    if(!_id) throw 'Dữ liệu đầu vào không hợp lệ'

    const os = await DB.GameOS.findOne({ _id: _id }).select('name')
    if(!os) throw 'Hệ điều hành trò chơi không tồn tại'
    
    const game = await DB.Game.count({ category: _id })
    if(game > 0) throw 'Không thể xóa hệ điều hành đã có trò chơi'

    await DB.GameOS.deleteOne({ _id: _id })
    logAdmin(event, `Xóa hệ điều hành trò chơi <b>${os.name}</b>`)

    return res(event, { message: 'Xóa thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})