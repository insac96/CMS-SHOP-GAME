export default defineEventHandler(async (event) => {
  try {
    const gates = await DB.Gate.find({ display: 1 }).select('-key -qrcode -createdAt -updatedAt')
    return res(event, { result: gates })
  } 
  catch (e:any) {
    return res(event, { result: [] })
  }
})