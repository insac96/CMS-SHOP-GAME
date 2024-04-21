export default defineEventHandler(async (event) => {
  try {
    const { key } = await readBody(event)
    if(!key) throw 'Không tìm thấy khóa thể loại'

    const category = await DB.GameCategory.findOne({ key: key }).select('name key')
    if(!category) throw 'Thể loại không tồn tại'

    return res(event, { result: category })
  } 
  catch (e:any) {
    return res(event, { code: 500, message: e.toString() })
  }
})