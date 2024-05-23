import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const { size, current, sort, search, secret } = await readBody(event)
    if(!size || !current || !search) throw 'Dữ liệu phân trang sai'
    if(!sort.column || !sort.direction) throw 'Dữ liệu sắp xếp sai'

    if(!secret){
      const auth = await getAuth(event) as IAuth
      if(auth.type < 1) throw 'Bạn không phải quản trị viên'
    }
    else {
      const runtimeConfig = useRuntimeConfig()
      if(secret != runtimeConfig.apiSecret) throw 'Khóa bí mật không đúng'
    }

    const sorting : any = { }
    sorting[sort.column] = sort.direction == 'desc' ? -1 : 1

    const match : any = {}
    if(search.key){
      if(search.by == 'CODE'){
        match['code'] = { $regex : search.key.toLowerCase(), $options : 'i' }
      }
      if(search.by == 'USER'){
        const users = await DB.User.find({
          username : { $regex : search.key.toLowerCase(), $options : 'i' }
        }).select('_id')
        
        match['user'] = {
          $in: users.map(i => i._id)
        }
      }
    }

    const list = await DB.Order
    .aggregate([
      { $match: match },
      {
        $lookup: {
          from: "Gate",
          localField: "gate",
          foreignField: "_id",
          pipeline: [{
            $project: { name: 1, color: 1, type: 1 }
          }],
          as: "gate"
        }
      },
      { $unwind: { path: "$gate", preserveNullAndEmptyArrays: true }},
      {
        $lookup: {
          from: "Game",
          localField: "game",
          foreignField: "_id",
          pipeline: [{
            $project: { name: 1, key: 1 }
          }],
          as: "game"
        }
      },
      { $unwind: { path: "$game", preserveNullAndEmptyArrays: true }},
      {
        $lookup: {
          from: "User",
          localField: "user",
          foreignField: "_id",
          pipeline: [{
            $project: { username: 1 }
          }],
          as: "user"
        }
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true }},
      {
        $lookup: {
          from: "User",
          localField: "verify.person",
          foreignField: "_id",
          pipeline: [{
            $project: { username: 1 }
          }],
          as: "verify_person"
        }
      },
      { $unwind: { path: "$verify_person", preserveNullAndEmptyArrays: true }},
      { $addFields: { "verify_time": "$verify.time" } },
      { $project: { card: 0, qrcode: 0, token: 0, verify: 0, updatedAt: 0 } },
      { $sort: sorting },
      { $skip: (current - 1) * size },
      { $limit: size }
    ])

    const total = await DB.Order.count(match)
    return res(event, { result: { list, total } })
  } 
  catch (e:any) {
    return res(event, { code: 500, message: e.toString() })
  }
})