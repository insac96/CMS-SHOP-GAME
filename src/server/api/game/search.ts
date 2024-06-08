export default defineEventHandler(async (event) => {
  try {
    const { key } = await readBody(event)
    if(!key) throw true
    
    const list = await DB.Game
    .find({
      $or: [
        { name: { $regex : key, $options : 'i' }},
        { short_name: { $regex : key, $options : 'i' }},
      ]
    })
    .select('name short_name key os category platform')
    .populate({ path: 'os', select: 'name key' })
    .populate({ path: 'platform', select: 'name key' })
    .populate({ path: 'category', select: 'name key' })
    .limit(10)

    return res(event, { result: list })
  } 
  catch (e:any) {
    return res(event, { result: [] })
  }
})