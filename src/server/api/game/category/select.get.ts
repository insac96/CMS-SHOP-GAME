export default defineEventHandler(async (event) => {
  try {
    const list = await DB.GameCategory.find().select('name')
    return res(event, { result: list })
  } 
  catch (e:any) {
    return res(event, { result: [] })
  }
})