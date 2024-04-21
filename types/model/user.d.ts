import type { Types } from 'mongoose'

export interface IDBUser {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  username: string
  password: string
  email: string
  phone: string
  avatar: string

  social: {
    facebook: string
    zalo: string
    google: string
    tiktok: string
    telegram: string
  }

  type: number
  block: boolean
  token: string

  last_login: date

  // Function
  save: {
    () : void
  }
}

export interface IDBUserStore {
  _id? : Types.ObjectId
  username? : string
  avatar?: string
  type?: number
}