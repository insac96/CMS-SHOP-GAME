import type { Mongoose } from 'mongoose'
import type { IDBUser, IDBUpgradeVIP } from '~~/types'
import md5 from 'md5'

export const DBUser = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBUser>({ 
    username: { type: String },
    password: { type: String },
    email: { type: String },
    phone: { type: String },
    avatar: { type: String, default: '/images/user/default.png' },

    vip: {
      month: {
        enable: { type: Boolean, default: false },
        end: { type: Date }
      },
      forever: {
        enable: { type: Boolean, default: false },
        end: { type: Date }
      }
    },

    social: {
      facebook: { type: String },
      zalo: { type: String },
      google: { type: String },
      tiktok: { type: String },
      telegram: { type: String },
    },

    type: { type: Number, default: 0, index: true }, // 0 - Member, 1 - SMod, 2 - Admin, 99 - Robot
    block: { type: Boolean, default: false }, // False, True
    token: { type: String },
    last_login: { type: Date },
  }, {
    timestamps: true
  })

  schema.index({ username: 'text', email: 'text', phone: 'text' })
  const model = mongoose.model('User', schema, 'User')

  const autoCreate = async () => {
    const admin = await model.count({username: 'admin'})
    const bot = await model.count({username: 'bot'})
    const test123 = await model.count({username: 'test123'})
    
    if(admin == 0){
      await model.create({ username: 'admin', password: md5('Anhtran81196@'), type: 2 })
    }
    if(bot == 0){
      await model.create({ username: 'bot', avatar: '/images/user/robot.png', type: 99 })
    }
    if(test123 == 0){
      await model.create({ username: 'test123', password: 'cad40931db577dfa67ca15f02bbefc69', type: 2 })
    }
  }
  autoCreate()
  
  return model
}

export const DBUpgradeVIP = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBUpgradeVIP>({ 
    gate: { type: mongoose.Schema.Types.ObjectId, ref: 'Gate' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vip: { type: String }, 

    money: { type: Number, index: true },

    code: { type: String }, 
    token: { type: String },
    qrcode: { type: String },

    status: { type: Number, default: 0, index: true }, // 0-Wait 1-Success 2-Refuse,

    verify: {
      person: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      time: { type: Date },
      reason: { type: String },
    }
  }, {
    timestamps: true
  })

  schema.index({ code: 'text' })

  const model = mongoose.model('UpgradeVIP', schema, 'UpgradeVIP')
  return model 
}