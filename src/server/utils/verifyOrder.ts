import type { H3Event } from 'h3'
import type { Types } from 'mongoose'
import { IDBGate, IDBOrder, IDBUser } from '~~/types'

interface IBodyData {
  _id: Types.ObjectId,
  status: number,
  money: number,
  reason: string
}

export default async (
  event: H3Event, 
  { _id, status, money, reason } : IBodyData, 
  verifier? : Types.ObjectId,
  sendNotify : boolean = true
) : Promise<void> => {
  if(!_id) throw 'Không tìm thấy ID giao dịch'
  if(
    !!isNaN(parseInt(String(status))) 
    || parseInt(String(status)) < 1 
    || parseInt(String(status)) > 2
  ) throw 'Mã trạng thái không hợp lệ'
  if(
    !!isNaN(parseInt(String(money))) 
    || parseInt(String(money)) < 0 
  ) throw 'Số tiền không hợp lệ'
  if(status == 2 && !reason) throw 'Không tìm thấy lý do từ chối'

  // Set Real Value
  const realMoney = parseInt(String(money))
  const realStatus = realMoney == 0 ? 2 : status
  const realReason = reason || 'Giao dịch không hợp lệ'

  // Get Payment
  const order = await DB.Order
  .findOne({ _id: _id })
  .select('code gate user game status') as IDBOrder
  if(!order) throw 'Giao dịch không tồn tại'
  if(order.status > 0) throw 'Không thể thao tác trên giao dịch này'

  // Get Other
  const user = await DB.User.findOne({ _id: order.user }).select('_id') as IDBUser
  if(!user) throw 'Không tìm thấy thông tin tài khoản'
  const gate = await DB.Gate.findOne({ _id: order.gate, display: true }).select('_id') as IDBGate
  if(!gate) throw 'Không tìm thấy thông tin kênh nạp'
  const game = await DB.Game.findOne({ _id: order.game, display: true }).select('_id') as IDBGate
  if(!game) throw 'Không tìm thấy thông tin trò chơi'

  // Set Verify Person
  let verify_person
  if(!!verifier){
    verify_person = verifier
  }
  else {
    const bot = await DB.User.findOne({'username': 'bot'}).select('_id')
    verify_person = bot._id
  }

  // Update Payment
  const time = new Date()
  await DB.Order.updateOne({ _id: _id }, {
    money: realMoney,
    status: realStatus,
    verify: {
      person: verify_person,
      time: time,
      reason: realReason
    }
  })

  // Check Status
  if(realStatus == 1){
    await DB.Order.updateOne({ _id: _id }, {
      $inc: { order: 1 }
    })

    if(!!verifier) logAdmin(event, `Chấp nhận giao dịch nạp tiền <b>${order.code}</b> với số tiền <b>${realMoney.toLocaleString('vi-VN')}</b>`, verifier)
  }
  else {
    if(!!verifier) logAdmin(event, `Từ chối giao dịch nạp tiền <b>${order.code}</b> với lý do <b>${realReason}</b>`, verifier)
  }
}