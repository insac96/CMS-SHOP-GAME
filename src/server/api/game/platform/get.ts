export default defineEventHandler(async (event) => {
  try {
    const { key } = await readBody(event)
    if(!key) throw 'Không tìm thấy khóa nền tảng'

    const platform = await DB.GamePlatform.findOne({ key: key }).select('name key')
    if(!platform) throw 'Nền tảng không tồn tại'

    return res(event, { result: platform })
  } 
  catch (e:any) {
    return res(event, { code: 500, message: e.toString() })
  }
})