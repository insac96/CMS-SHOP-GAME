import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'

    const body = await readBody(event)
    const { category, title, description, images } = body
    if(!category || !title || !description) throw 'Dữ liệu đầu vào không hợp lệ'
    if(!Array.isArray(images)) throw 'Dữ liệu hình ảnh không hợp lệ'

    const categoryCheck = await DB.NewsCategory.findOne({ _id: category }).select('_id name')
    if(!categoryCheck) throw 'Danh mục không tồn tại'

    const key = formatVNString(event, title, '-')

    const newsCheck = await DB.News.findOne({ key: key }).select('_id')
    if(!!newsCheck) throw 'Tiêu đề tin tức đã tồn tại'

    const keywords = []
    keywords.push(categoryCheck.name)

    body.keywords = keywords.concat(title.split(" "))
    body.creator = auth._id
    body.updater = auth._id
    body.key = key

    await DB.News.create(body)
    logAdmin(event, `Thêm tin tức <b>${title}</b>`)

    return res(event, { message: 'Thêm tin tức thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})