import type { Types } from 'mongoose'
import type { IDBGate } from './gate'
import type { IDBGame } from './game'
import type { IDBUser } from './user'

export interface IDBOrder {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  gate: Types.ObjectId | IDBGate
  user: Types.ObjectId | IDBUser
  game: Types.ObjectId | IDBGame

  money: number

  code: string
  token: string

  qrcode: string

  status: number
  
  verify: {
    person: Types.ObjectId
    time: Date
    reason: string
  }
}