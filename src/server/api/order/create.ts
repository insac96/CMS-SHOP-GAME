import md5 from "md5"
import type { IAuth, IDBGame, IDBGate, IDBOrder, IDBUser } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth

    // Check Body
    const body = await readBody(event)
    const { gate, game } = body
    if(!gate || !game) throw 'Dữ liệu đầu vào không hợp lệ'
    
    // Check Gate
    const gateSelect = await DB.Gate
    .findOne({ _id: gate })
    .select('name number person type key qrcode callback display') as IDBGate
    if(!gateSelect) throw 'Kênh nạp không tồn tại'
    if(!gateSelect.display) throw 'Kênh nạp đang bảo trì'

    // Check Game
    const gameSelect = await DB.Game
    .findOne({ _id: game }) 
    .select('price order display') as IDBGame
    if(!gameSelect) throw 'Trò chơi không tồn tại'
    if(!gameSelect.display) throw 'Trò chơi đang chưa bày bán'

    // Check Order
    const hasOrderGameDone = await DB.Order
    .findOne({ 
      game: gameSelect._id,
      user: auth._id,
      status: 1
    })
    .select('_id') as IDBOrder
    if(!!hasOrderGameDone) throw 'Bạn đã mua mã nguồn này, vui lòng vào phần lịch sử để tải về'

    const hasOrderGameWait = await DB.Order
    .findOne({ 
      game: gameSelect._id,
      user: auth._id,
      status: 0
    })
    .select('_id') as IDBOrder
    if(!!hasOrderGameWait) throw 'Đơn hàng cho mã nguồn này đã tồn tại, vui lòng thanh toán hoặc hủy đơn hàng và tạo lại'

    // Make Code, Token
    const countOrder = await DB.Order.count()
    const prefix = 'ORDER-'
    const code = prefix + (countOrder > 9 ? countOrder : `0${countOrder}`)
    const token = md5(`${code}-${Date.now()}`)
    
    // Make Money
    const money = gameSelect.price.member

    // Make QR
    let qrcode
    if(!!gateSelect.qrcode){
      qrcode = gateSelect.qrcode
      qrcode = qrcode.replaceAll('[money]', String(parseInt(String(money))))
      qrcode = qrcode.replaceAll('[code]', code)
      qrcode = qrcode.replaceAll('[token]', token)
      qrcode = qrcode.replaceAll('[gate-name]', gateSelect.name)
      qrcode = qrcode.replaceAll('[gate-number]', gateSelect.number)
      qrcode = qrcode.replaceAll('[gate-person]', gateSelect.person)
    }

    // Create
    const order = await DB.Order.create({
      gate: gateSelect._id,
      game: gameSelect._id,
      user: auth._id,
      money: parseInt(String(money)),
      code: code,
      token: token,
      qrcode: qrcode
    })

    return res(event, { message: 'Tạo giao dịch thành công', result: order._id })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})
