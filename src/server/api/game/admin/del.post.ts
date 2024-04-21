import type { IAuth, IDBGame } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'

    const { _id } = await readBody(event)
    if(!_id) throw 'Dữ liệu đầu vào không hợp lệ'

    const game = await DB.Game.findOne({ _id: _id }).select('name order') as IDBGame
    if(!game) throw 'Trò chơi không tồn tại'
    if(game.order > 0) throw 'Không thể xóa trò chơi đã có lịch sử mua hàng'

    await DB.Game.deleteOne({ _id: _id })
    logAdmin(event, `Xóa trò chơi <b>${game.name}</b>`)

    return res(event, { message: 'Xóa thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})