import type { IDBGameCategory, IDBGameOS, IDBGamePlatform } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const { type, key, page } = await readBody(event)
    if(!type || !page) throw 'Dữ liệu đầu vào không đủ'
    
    const { size, current, sort } = page
    if(!size || !current) throw 'Dữ liệu phân trang sai'
    if(!sort.column || !sort.direction) throw 'Dữ liệu sắp xếp sai'

    // Props
    const match : any = { display: true }
    const sorting : any = { pin: -1 }
    sorting[sort.column] = sort.direction == 'desc' ? -1 : 1

    // OS
    if(type == 'os'){
      if(!key) throw 'Dữ liệu đầu vào sai'

      const os = await DB.GameOS.findOne({ key: key }).select('_id') as IDBGameOS
      if(!os) throw 'Hệ điều hành không tồn tại'
      match['os'] = os._id
    }

    // Platform
    if(type == 'platform'){
      if(!key) throw 'Dữ liệu đầu vào sai'

      const platform = await DB.GamePlatform.findOne({ key: key }).select('_id') as IDBGamePlatform
      if(!platform) throw 'Nền tảng không tồn tại'
      match['platform'] = platform._id
    }

    // Category
    if(type == 'category'){
      if(!key) throw 'Dữ liệu đầu vào sai'

      const category = await DB.GameCategory.findOne({ key: key }).select('_id') as IDBGameCategory
      if(!category) throw 'Thể loại không tồn tại'
      match['category'] = category._id
    }

    // List Game
    const list = await DB.Game
    .find(match)
    .select('-content')
    .populate({ path: 'os', select: 'name key' })
    .populate({ path: 'platform', select: 'name key' })
    .populate({ path: 'category', select: 'name key' })
    .sort(sorting)
    .limit(size)
    .skip((current - 1) * size)

    const total = await DB.Game.count(match)
    return res(event, { result: { list, total } })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})