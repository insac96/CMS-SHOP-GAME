import type { IAuth, IDBUpgradeVIP } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth

    const { _id, reason } = await readBody(event)
    if(!_id) throw 'Không tìm thấy ID giao dịch'
    if(!reason) throw 'Vui lòng nhập lý do hủy'

    const order = await DB.UpgradeVIP.findOne({ _id: _id })
    .select('user vip money status') as IDBUpgradeVIP

    if(!order) throw 'Giao dịch không tồn tại'
    if(order.status > 0) throw 'Không thể thao tác trên giao dịch này'
    if(order.user.toString() !== auth._id.toString()) throw 'Bạn không phải chủ giao dịch'

    await verifyUpgradeVip(event, {
      _id: order._id,
      vip: order.vip,
      money: order.money,
      status: 2,
      reason: reason
    }, undefined, false)

    return res(event, { message: 'Thao tác thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})