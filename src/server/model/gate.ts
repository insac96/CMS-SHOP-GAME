import { Mongoose } from 'mongoose'
import type { IDBGate } from '~~/types'

export const DBGate = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBGate>({ 
    type: { type: String },
    name: { type: String },
    person: { type: String },
    number: { type: String },
    
    key: { type: String },
    qrcode: { type: String },

    display: { type: Boolean, default: true }
  }, {
    timestamps: true
  })

  const model = mongoose.model('Gate', schema, 'Gate')
  return model 
}