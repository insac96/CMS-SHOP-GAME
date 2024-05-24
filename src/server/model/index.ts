import type { Mongoose } from 'mongoose'
import type { IGlobalDB } from '~~/types'

import { DBConfig } from './config'
import { DBUser, DBUpgradeVIP } from './user'
import { DBGameOS, DBGamePlatform, DBGameCategory, DBGame } from './game'
import { DBLogAdmin, DBLogUser, DBLogLogin } from './log'
import { DBGate } from './gate'
import { DBOrder } from './order'
import { DBNews, DBNewsCategory } from './news'
import { DBSpend } from './spend'

export default (mongoose : Mongoose) : IGlobalDB => {
  return {
    Config: DBConfig(mongoose),

    User: DBUser(mongoose),
    UpgradeVIP: DBUpgradeVIP(mongoose),

    News: DBNews(mongoose),
    NewsCategory: DBNewsCategory(mongoose),

    Spend: DBSpend(mongoose),

    Gate: DBGate(mongoose),
    Order: DBOrder(mongoose),

    GameOS: DBGameOS(mongoose),
    GamePlatform: DBGamePlatform(mongoose),
    GameCategory: DBGameCategory(mongoose),
    Game: DBGame(mongoose),

    LogUser: DBLogUser(mongoose),
    LogAdmin: DBLogAdmin(mongoose),
    LogLogin: DBLogLogin(mongoose)
  }
}