import type { Mongoose } from 'mongoose'
import type { IDBNewsCategory, IDBNews } from '~~/types'

export const DBNewsCategory = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBNewsCategory>({ 
    name: { type: String },
    key: { type: String },
    color: { type: String, default: 'primary' }
  }, {
    timestamps: true
  })

  schema.index({ name: 'text', key: 'text' })

  const model = mongoose.model('NewsCategory', schema, 'NewsCategory')
  return model 
}

export const DBNews = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBNews>({ 
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'NewsCategory' },
    title: { type: String },
    key: { type: String },
    description: { type: String }, 
    og_image: { type: String },
    keywords: [{ type: String }],
    content: { type: String },
    view: { type: Number, default: 0, index: true  },
    pin: { type: Boolean, default: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    updater: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    display: { type: Boolean, default: true },
  }, {
    timestamps: true
  })

  schema.index({ title: 'text', key: 'text' })

  const model = mongoose.model('News', schema, 'News')
  return model 
}
