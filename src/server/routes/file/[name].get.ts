import { createReadStream } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    // @ts-expect-error
    const name = event.context.params.name
    const arr = name.split('-')
    const path = arr[0]

    const filePath = join(`dist/file/${path}`, name)
    return sendStream(event, createReadStream(filePath))
  }
  catch(e:any){
    return res(event, { code: 404, message: 'Tài liệu không tồn tại' })
  }
})

