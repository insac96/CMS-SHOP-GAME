import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'

    const body = await readBody(event)
    const { os, platform, category, name, short_name, description, images, price } = body
    if(!category || !os || !platform || !name || !short_name || !description) throw 'Dữ liệu đầu vào không hợp lệ'
    if(!Array.isArray(images)) throw 'Dữ liệu hình ảnh không hợp lệ'
    if(
      !!isNaN(parseInt(price.member))
      || parseInt(price.member) < 0
    ) throw 'Giá bán thành viên không hợp lệ'
    if(
      !!isNaN(parseInt(price.vip.month))
      || parseInt(price.vip.month) < 0
    ) throw 'Giá bán VIP Tháng không hợp lệ'
    if(
      !!isNaN(parseInt(price.vip.forever))
      || parseInt(price.vip.forever) < 0
    ) throw 'Giá bán VIP Vĩnh Viễn không hợp lệ'

    const osCheck = await DB.GameOS.findOne({ _id: os }).select('_id name')
    if(!osCheck) throw 'Hệ điều hành không tồn tại'

    const platformCheck = await DB.GamePlatform.findOne({ _id: platform }).select('_id name')
    if(!platformCheck) throw 'Nền tảng không tồn tại'

    const categoryCheck = await DB.GameCategory.findOne({ _id: category }).select('_id name')
    if(!categoryCheck) throw 'Thể loại không tồn tại'

    const key = formatVNString(event, name, '-')
    body.key = key

    const gameCheck = await DB.Game.findOne({ key: key }).select('_id')
    if(!!gameCheck) throw 'Tên trò chơi đã tồn tại'

    await DB.Game.create(body)
    logAdmin(event, `Thêm trò chơi <b>${short_name}</b>`)

    return res(event, { message: 'Thêm thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})