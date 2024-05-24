import type { Types } from 'mongoose'
import type { IDBGate } from './gate'

export interface IDBUser {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  username: string
  password: string
  email: string
  phone: string
  avatar: string

  vip: {
    month: {
      enable: boolean,
      end: date
    },
    forever: {
      enable: boolean,
      end: date
    }
  },

  social: {
    facebook: string
    zalo: string
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

export interface IDBUpgradeVIP {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  gate: Types.ObjectId | IDBGate
  user: Types.ObjectId | IDBUser
  vip: string

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

export interface IDBUserStore {
  _id? : Types.ObjectId
  username? : string
  email?: string
  phone?: string
  avatar?: string
  type?: number
  vip?: {
    month: {
      enable: boolean,
      end: date
    },
    forever: {
      enable: boolean,
      end: date
    }
  },
  social?: {
    facebook: string
    zalo: string
    tiktok: string
    telegram: string
  },
}