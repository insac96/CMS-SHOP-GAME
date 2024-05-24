import md5 from "md5"
import type { IAuth, IDBConfig, IDBGate, IDBUpgradeVIP } from "~~/types"

const vipTypes = ['month', 'quarter', 'year', 'forever']

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth

    // Check Body
    const body = await readBody(event)
    const { gate, vip } = body
    if(!gate || !vip) throw 'Dữ liệu đầu vào không hợp lệ'
    if(!vipTypes.includes(vip)) throw 'Gói nâng cấp VIP không hỗ trợ'

    // Get Config
    const config = await DB.Config.findOne({}).select('vip') as IDBConfig
    const priceVip = config.vip

    // Check Gate
    const gateSelect = await DB.Gate
    .findOne({ _id: gate })
    .select('name number person type key qrcode callback display') as IDBGate
    if(!gateSelect) throw 'Kênh nạp không tồn tại'
    if(!gateSelect.display) throw 'Kênh nạp đang bảo trì'

    // Check Waiting Upgrade
    const hasUpgradeVipWait = await DB.UpgradeVIP
    .findOne({ 
      user: auth._id,
      status: 0
    })
    .select('_id') as IDBUpgradeVIP
    if(!!hasUpgradeVipWait) throw 'Bạn đang có giao dịch nâng cấp VIP chưa hoàn thành, vui lòng thanh toán hoặc hủy đơn hàng và tạo lại'

    // Check VIP
    if(!!auth.vip.forever.enable) throw 'Bạn đã nâng cấp lên đặc quyền VIP Trọn Đời, không thể nâng cấp thêm'
    if(vip == 'forever'){
      if(!!auth.vip.month.enable) throw 'Thời gian VIP Hạn Thời vẫn còn, vui lòng chờ hết hạn và nâng cấp'
    }

    // Make Code, Token
    const countOrder = await DB.UpgradeVIP.count()
    const prefix = 'VIP-'
    const code = prefix + (countOrder > 9 ? countOrder : `0${countOrder}`)
    const token = md5(`${code}-${Date.now()}`)
    
    // Make Money
    // @ts-expect-error
    const money = priceVip[vip]
    
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
    const order = await DB.UpgradeVIP.create({
      gate: gateSelect._id,
      user: auth._id,
      vip: vip,
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
