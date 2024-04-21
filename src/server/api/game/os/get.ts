export default defineEventHandler(async (event) => {
  try {
    const { key } = await readBody(event)
    if(!key) throw 'Không tìm thấy khóa hệ điều hành'

    const os = await DB.GameOS.findOne({ key: key }).select('name key')
    if(!os) throw 'Hệ điều hành không tồn tại'

    return res(event, { result: os })
  } 
  catch (e:any) {
    return res(event, { code: 500, message: e.toString() })
  }
})