import type { Types } from 'mongoose'

export interface IDBNewsCategory {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
  name: string
  key: string
  color: string
}

export interface IDBNews {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  category: Types.ObjectId

  title: string
  key: string
  description: string 

  og_image: string
  images: Array<string>

  keywords: string[]
  content: string

  view: number
  pin: boolean

  creator: Types.ObjectId
  updater: Types.ObjectId
  
  display: boolean
}
