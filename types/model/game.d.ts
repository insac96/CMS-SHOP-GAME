import type { Types } from 'mongoose'

export interface IDBGameOS {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  name: string
  icon: string
  key: string
  display: boolean
}

export interface IDBGamePlatform {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  name: string
  icon: string
  key: string
  display: boolean
}

export interface IDBGameCategory {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  name: string
  icon: string
  key: string
  display: boolean
}

export interface IDBGame {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  os: Types.ObjectId | IDBGameOS
  platform: Types.ObjectId | IDBGamePlatform
  category: Types.ObjectId | IDBGameCategory
  
  name: string
  short_name: string
  key: string
  description: string
  og_image: string
  content: string

  price: number
  discount: number

  view: number
  order: number

  pin: boolean
  display: boolean
}

