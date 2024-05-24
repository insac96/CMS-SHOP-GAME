import type { Model } from 'mongoose'
export { IDBConfig, IDBConfigStore } from './config'
export { IDBUser, IDBUserStore, IDBUpgradeVIP } from './user'
export { IDBNews, IDBNewsCategory } from './news'
export { IDBSpend } from './spend'
export { IDBGate } from './gate'
export { IDBOrder } from './order'
export { IDBGameOS, IDBGamePlatform, IDBGameCategory, IDBGame } from './game'
export { IDBLogAdmin, IDBLogLogin, IDBLogUser } from './log'

export interface IGlobalDB {
  Config: Model<IDBConfig>

  User: Model<IDBUser>

  News: Model<IDBNews>
  NewsCategory: Model<IDBNewsCategory>

  Spend: Model<IDBSpend>

  Gate: Model<IDBGate>

  Order: Model<IDBOrder>

  UpgradeVIP: Model<IDBUpgradeVIP>

  GameOS: Model<IDBGameOS>
  GamePlatform: Model<IDBGamePlatform>
  GameCategory: Model<IDBGameCategory>
  Game: Model<IDBGame>

  LogAdmin: Model<IDBLogAdmin>
  LogUser: Model<IDBLogUser>
  LogLogin: Model<IDBLogLogin>
}