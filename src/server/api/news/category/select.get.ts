export default defineEventHandler(async (event) => {
  try {
    const categories = await DB.NewsCategory.find().select('name')
    return res(event, { result: categories })
  } 
  catch (e:any) {
    return res(event, { result: [] })
  }
})