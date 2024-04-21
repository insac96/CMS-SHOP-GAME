export default defineEventHandler(async (event) => {
  try {
    const list = await DB.GamePlatform.find().select('name key')
    return res(event, { result: list })
  } 
  catch (e:any) {
    return res(event, { code: 500, message: e.toString() })
  }
})