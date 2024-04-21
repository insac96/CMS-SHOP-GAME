export default defineEventHandler(async (event) => {
  try {
    const list = await DB.GamePlatform.find().select('name')
    return res(event, { result: list })
  } 
  catch (e:any) {
    return res(event, { result: [] })
  }
})