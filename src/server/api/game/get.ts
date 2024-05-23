export default defineEventHandler(async (event) => {
  try {
    const { key } = await readBody(event)
    if(!key) throw 'Không tìm thấy khóa trò chơi'

    const game = await DB.Game
    .findOneAndUpdate({ key: key, display: 1 }, { $inc: { view: 1 } }, { new: true })
    .populate({ path: 'os', select: 'name key' })
    .populate({ path: 'platform', select: 'name key' })
    .populate({ path: 'category', select: 'name key' })
    .select('-download')
    
    if(!game) throw 'Trò chơi không tồn tại'
    return res(event, { result: game })
  } 
  catch (e:any) {
    return res(event, { code: 500, message: e.toString() })
  }
})