import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'

    const { _id } = await readBody(event)
    if(!_id) throw 'Dữ liệu đầu vào không hợp lệ'

    const news = await DB.News.findOne({ _id: _id }).select('title')
    if(!news) throw 'Tin tức không tồn tại'

    await DB.News.deleteOne({ _id: _id })
    logAdmin(event, `Xóa tin tức <b>${news.title}</b>`)

    return res(event, { message: 'Xóa tin tức thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})