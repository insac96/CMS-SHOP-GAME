import { IDBConfig } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const config = await DB.Config.findOne().select(`name description image.og`) as IDBConfig
    if(!config) throw 'Không tìm thấy cấu hình trang'

    const user = await DB.User.count()
    const game = await DB.Game.count()
    const order = await DB.Order.count()

    return res(event, { result: { config, user, game, order } })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})