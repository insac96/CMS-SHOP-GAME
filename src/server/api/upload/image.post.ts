import multer from 'multer'

const handler = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './dist/file/image')
    },

    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const type = file.originalname.split('.')[file.originalname.split('.').length - 1]
      cb(null, `image-${uniqueSuffix}.${type}`)
    }
  }),

  limits: {
    fileSize: 10 * 1024 * 1024
  },

  fileFilter: (req, file, cb) => {
    const fileType = file.mimetype.split('/')[0]
    if (fileType !== 'image') cb(new Error('Chỉ hỗ trợ tệp hình ảnh (jpg|jpeg|png|webp|gif)'))
    else cb(null, true)
  }
})

export default defineEventHandler(async (event) => {
  try {
    // @ts-expect-error
    await callNodeListener(handler.single('image'), event.node.req, event.node.res)

    // @ts-expect-error
    const file = event.node.req.file
    const url = `/file/${file.filename}`
    return res(event, { message: 'Tải hình ảnh thành công', result: url })
  }
  catch (e: any) {
    return res(event, { code: 400, message: e.toString() })
  }
})
