import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'

    const body = await readBody(event)
    const { _id, os, platform, category, name, short_name, description, images, price, discount } = body
    if(!_id || !category || !os || !platform || !name || !short_name || !description) throw 'Dữ liệu đầu vào không hợp lệ'
    if(!Array.isArray(images)) throw 'Dữ liệu hình ảnh không hợp lệ'
    if(
      !!isNaN(parseInt(price))
      || parseInt(price) < 0
    ) throw 'Giá bán không hợp lệ'
    if(
      !!isNaN(parseInt(discount))
      || parseInt(discount) < 0
    ) throw 'Giảm giá không hợp lệ'

    const gameCheck = await DB.Game.findOne({ _id: _id }).select('name')
    if(!gameCheck) throw 'Trò chơi không tồn tại'

    const osCheck = await DB.GameOS.findOne({ _id: os }).select('_id name')
    if(!osCheck) throw 'Hệ điều hành không tồn tại'

    const platformCheck = await DB.GamePlatform.findOne({ _id: platform }).select('_id name')
    if(!platformCheck) throw 'Nền tảng không tồn tại'

    const categoryCheck = await DB.GameCategory.findOne({ _id: category }).select('_id name')
    if(!categoryCheck) throw 'Thể loại không tồn tại'

    if(gameCheck.name != name){
      const key = formatVNString(event, name, '-')
      const getByTitle = await DB.Game.findOne({ key: key }).select('_id')
      if(!!getByTitle) throw 'Tên trò chơi đã tồn tại'

      body.key = key
    }

    delete body['_id']
    await DB.Game.updateOne({ _id: _id }, body)

    logAdmin(event, `Sửa thông tin trò chơi <b>${gameCheck.name}</b>`)

    return res(event, { message: 'Sửa thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})