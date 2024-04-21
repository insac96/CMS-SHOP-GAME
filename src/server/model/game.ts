import { Mongoose } from 'mongoose'
import type { IDBGameOS, IDBGamePlatform, IDBGameCategory, IDBGame } from '~~/types'

export const DBGameOS = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBGameOS>({ 
    name: { type: String },
    icon: { type: String },
    key: { type: String },
    display: { type: Boolean, default: true }
  }, {
    timestamps: true
  })

  schema.index({ name: 'text', key: 'text' })
  const model = mongoose.model('GameOS', schema, 'GameOS')

  const autoCreate = async () => {
    const linux = await model.count({key: 'linux'})
    const windows = await model.count({key: 'windows'})
  
    if(linux == 0) await model.create({ name: 'Linux', icon: 'i-la-centos', key: 'linux' })
    if(windows == 0) await model.create({ name: 'Windows', icon: 'i-mingcute-windows-fill', key: 'windows' })
  }
  autoCreate()

  return model 
}

export const DBGamePlatform = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBGamePlatform>({ 
    name: { type: String },
    icon: { type: String },
    key: { type: String },
    display: { type: Boolean, default: true }
  }, {
    timestamps: true
  })

  schema.index({ name: 'text', key: 'text' })
  const model = mongoose.model('GamePlatform', schema, 'GamePlatform')

  const autoCreate = async () => {
    const h5 = await model.count({key: 'h5'})
    const mobile = await model.count({key: 'mobile'})
    const pc = await model.count({key: 'pc'})
    const webgame = await model.count({key: 'webgame'})
  
    if(h5 == 0) await model.create({ name: 'Game H5', icon: 'i-bxs-devices', key: 'h5' })
    if(mobile == 0) await model.create({ name: 'Game Mobile', icon: 'i-bx-mobile', key: 'mobile' })
    if(pc == 0) await model.create({ name: 'Game PC', icon: 'i-mingcute-computer-line', key: 'pc' })
    if(webgame == 0) await model.create({ name: 'Web Game', icon: 'i-mingcute-web-fill', key: 'webgame' })
  }
  autoCreate()

  return model 
}

export const DBGameCategory = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBGameCategory>({ 
    name: { type: String },
    icon: { type: String },
    key: { type: String },
    display: { type: Boolean, default: true }
  }, {
    timestamps: true
  })

  schema.index({ name: 'text', key: 'text' })
  const model = mongoose.model('GameCategory', schema, 'GameCategory')

  const autoCreate = async () => {
    const mmo = await model.count({key: 'mmo'})
    const herocard = await model.count({key: 'hero-card'})
  
    if(mmo == 0) await model.create({ name: 'MMO', icon: 'i-ri-sword-fill', key: 'mmo' })
    if(herocard == 0) await model.create({ name: 'Thẻ Bài', icon: 'i-icon-park-twotone-card-two', key: 'hero-card' })
  }
  autoCreate()

  return model 
}

export const DBGame = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBGame>({ 
    os: { type: mongoose.Schema.Types.ObjectId, ref: 'GameOS' },
    platform: { type: mongoose.Schema.Types.ObjectId, ref: 'GamePlatform' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'GameCategory' },

    name: { type: String },
    short_name: { type: String },
    key: { type: String },
    description: { type: String },
    og_image: { type: String },
    content: { type: String },

    price: { type: Number, index: true },
    discount: { type: Number, index: true, default: 0 },

    view: { type: Number, index: true, default: 0 },
    order: { type: Number, index: true, default: 0 },

    pin: { type: Boolean, default: true },
    display: { type: Boolean, default: true }
  }, {
    timestamps: true
  })

  schema.index({ name: 'text', key: 'text' })

  const model = mongoose.model('Game', schema, 'Game')
  return model 
}