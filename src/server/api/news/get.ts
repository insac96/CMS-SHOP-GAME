export default defineEventHandler(async (event) => {
  try {
    const { key } = await readBody(event)
    if(!key) throw 'Không tìm thấy khóa tin tức'

    const news = await DB.News
    .findOneAndUpdate({ key: key, display: 1 }, { $inc: { view: 1 } }, { new: true })
    .populate({ path: 'category', select: 'name key' })

    if(!news) throw 'Tin tức không tồn tại'
    return res(event, { result: news })
  } 
  catch (e:any) {
    return res(event, { code: 500, message: e.toString() })
  }
})