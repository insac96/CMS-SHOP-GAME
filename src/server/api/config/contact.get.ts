export default defineEventHandler(async (event) => {
  try {
    const config = await DB.Config.findOne().select('social contact') 
    if(!config) throw 'Không tìm thấy cấu hình trang'

    return res(event, { result: config })
  } 
  catch (e:any) {
    return res(event, { code: 500, message: e.toString() })
  }
})