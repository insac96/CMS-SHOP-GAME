import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'

    const { _id, content } = await readBody(event)
    if(!_id || !content) throw 'Dữ liệu đầu vào không đủ'

    const game = await DB.Game.findOne({ _id: _id }).select('name')
    if(!game) throw 'Tin tức không tồn tại'

    await DB.Game.updateOne({ 
      _id: _id 
    },{ 
      content: content, 
      updater: auth._id 
    })

    logAdmin(event, `Cập nhật nội dung trò chơi <b>${game.name}</b>`)

    return res(event, { message: 'Cập nhật thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})