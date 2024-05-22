import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    const { _id } = await readBody(event)
    if(!_id) throw 'Không tìm thấy ID đơn hàng'

    const order = await DB.Order.findOne({ _id: _id })
    .select('-token')
    .populate({
      path: 'gate', select: 'type name person number'
    })

    if(!order) throw 'Đơn hàng không tồn tại'

    if(!!auth && (auth as IAuth).type < 1){
      if(order.user.toString() !== (auth as IAuth)._id.toString()) throw 'Bạn không phải chủ giao dịch'
    }
    
    return res(event, { result: order })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})