import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'

    const body = await readBody(event)
    if(!!body.redo){
      if(auth.type < 2) throw 'SMOD không thể hoàn tác trạng thái giao dịch'
      const order = await DB.UpgradeVIP.findOne({ _id: body._id }).select('status code')
      if(!order) throw 'Giao dịch không tồn tại'
      if(order.status == 0) throw 'Giao dịch chưa được duyệt'
      
      order.status = 0
      await order.save()

      await logAdmin(event, `Hoàn tác trạng thái giao dịch nâng vip <b>${order.code}</b>`, auth._id)
      return res(event, { message: 'Thao tác thành công' })
    }

    await verifyUpgradeVip(event, body, auth._id)
    return res(event, { message: 'Thao tác thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})