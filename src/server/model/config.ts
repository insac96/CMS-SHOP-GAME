import type { Mongoose } from 'mongoose'
import type { IDBConfig } from '~~/types'

export const DBConfig = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBConfig>({ 
    name: { type: String, default: 'ENI Shop' },
    short_name: { type: String, default: 'ENIShop' },
    description: { type: String, default: 'A Shop Game' },
    image: {
      og: { type: String },
      app: { type: String },
      logo: { type: String },
    },

    about: { type: String },
    privacy: { type: String },
    terms: { type: String },

    vip: {
      month: { type: Number, default: 500000 },
      quarter : { type: Number, default: 1500000 },
      year: { type: Number, default: 6000000 },
      forever: { type: Number, default: 10000000 },
    },

    contact: {
      name: { type: String, default: '' },
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
      address: { type: String, default: '' },
      prefix: { type: String, default: 'ENI' },
    },
    
    social: {
      fanpage: { type: String },
      group: { type: String },
      messenger: { type: String },
      zalo: { type: String },
      tiktok: { type: String },
      telegram: { type: String },
    },

    facebook: {
      client_id: { type: String },
      client_secret: { type: String },
      client_version: { type: String },
      client_verify: { type: String },
      client_ads: { type: String },
    },
  
    google: {
      client_id: { type: String },
      client_secret: { type: String },
      client_verify: { type: String },
      client_ads: { type: String },
    },
    
    tiktok: {
      client_id: { type: String },
      client_secret: { type: String },
      client_verify: { type: String },
    },
  
    zalo: {
      client_id: { type: String },
      client_secret: { type: String },
      client_verify: { type: String },
    }
  }, {
    timestamps: true
  })

  const model = mongoose.model('Config', schema, 'Config')

  const autoCreate = async () => {
    const count = await model.count({})
    if(count == 0) return await model.create({})
  }
  autoCreate()

  return model 
}