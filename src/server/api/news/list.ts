import type { IDBNewsCategory } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const { size, current, sort, category } = await readBody(event)
    if(!size || !current || !sort) throw 'Dữ liệu phân trang sai'
    if(!sort.column || !sort.direction) throw 'Dữ liệu sắp xếp sai'

    // Props
    const match : any = { display: true }
    const sorting : any = { pin: -1 }
    sorting[sort.column] = sort.direction == 'desc' ? -1 : 1

    if(!!category){
      const categoryCheck = await DB.NewsCategory.findOne({ key: category }).select('_id') as IDBNewsCategory
      if(!categoryCheck) throw 'Danh mục không tồn tại'
      match['category'] = categoryCheck._id
    }

    const list = await DB.News
    .find(match)
    .select('-content')
    .populate({ path: 'category', select: 'name key' })
    .sort(sorting)
    .limit(size)
    .skip((current - 1) * size)

    const total = await DB.News.count(match)

    return res(event, { result: { list, total } })
  } 
  catch (e:any) {
    return res(event, { code: 500, message: e.toString() })
  }
})