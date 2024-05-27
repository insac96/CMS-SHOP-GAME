import type { Types } from 'mongoose'

export interface IDBConfig {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  name: string
  short_name: string
  description: string
  image: {
    og: string
    app: string
    logo: string
  }

  about: string
  privacy: string
  terms: string

  vip: {
    month: number
    quarter : number
    year: number
    forever: number
  }

  contact: {
    name: string
    phone: string
    email: string
    address: string
    prefix: string
  }

  social: {
    fanpage: string
    group: string
    messenger: string
    zalo: string
    tiktok: string
    telegram: string
  }

  facebook: {
    client_id: string
    client_secret: string
    client_version: string
    client_verify: string
    client_ads: string
  }

  google: {
    client_id: string
    client_secret: string
    client_verify: string
    client_ads: string
  }
  
  tiktok: {
    client_id: string
    client_secret: string
    client_verify: string
  }

  zalo: {
    client_id: string
    client_secret: string
    client_verify: string
  }
}

export interface IDBConfigStore {
  name: string
  short_name: string
  description: string
  image: {
    og: string
    app: string
    logo: string
  }

  contact: {
    name: string
    phone: string
    email: string
    address: string
    prefix: string
  }

  social: {
    fanpage: string
    group: string
    messenger: string
    zalo: string
    tiktok: string
    telegram: string
  }

  vip: {
    month: number
    quarter : number
    year: number
    forever: number
  }

  facebook: {
    client_id: string
    client_version: string
    client_verify: string
    client_ads: string
  }

  google: {
    client_id: string
    client_verify: string
    client_ads: string
  }

  tiktok: {
    client_id: string
    client_verify: string
  }

  zalo: {
    client_id: string
    client_verify: string
  }
}