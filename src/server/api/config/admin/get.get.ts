import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'
    
    const config = await DB.Config.findOne()
    if(!config) throw 'Không tìm thấy cấu hình trang'
    
    return res(event, { result: config })
  } 
  catch (e:any) {
    return res(event, { code: 500, message: e.toString() })
  }
})