export default defineEventHandler(async (event) => {
  try {
    const config = await DB.Config.findOne().select('terms') 
    if(!config) throw 'Không tìm thấy cấu hình trang'

    return res(event, { result: config.terms })
  } 
  catch (e:any) {
    return res(event, { code: 500, message: e.toString() })
  }
})