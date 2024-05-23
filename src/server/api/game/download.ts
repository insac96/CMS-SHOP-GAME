import type { IDBGame } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const { game } = await readBody(event)
    if(!game) throw 'Không tìm thấy khóa trò chơi'

    const gameData = await DB.Game
    .findOne({ _id: game })
    .select('download') as IDBGame
    if(!gameData) throw 'Trò chơi không tồn tại'
    if(!gameData.download) throw 'Chúng tôi đang cập nhật link tải, vui lòng quay lại sau'

    return res(event, { result: gameData.download })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})