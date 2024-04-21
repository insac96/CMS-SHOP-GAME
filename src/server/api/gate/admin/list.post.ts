import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'

    const { size, current, sort } = await readBody(event)
    if(!size || !current) throw 'Dữ liệu phân trang sai'
    if(!sort.column || !sort.direction) throw 'Dữ liệu sắp xếp sai'

    const sorting : any = { }
    sorting[sort.column] = sort.direction == 'desc' ? -1 : 1

    const list = await DB.Gate
    .aggregate([
      {
        $lookup: {
          from: "Order",
          localField: "_id",
          foreignField: "gate",
          pipeline: [{
            $project: {
              money: { $cond: [{$eq: ['$status', 1]} , '$money', 0] },
            },
          }],
          as: "orders"
        }
      },
      { 
        $addFields: { 
          order_count: { $size: '$orders' },
          order_money: { $sum: '$orders.money' }
        }
      },
      { $project: { orders: 0, createdAt: 0 }},
      { $sort: sorting },
      { $skip: (current - 1) * size },
      { $limit: size }
    ])

    const total = await DB.Gate.count()
    return res(event, { result: { list, total } })
  } 
  catch (e:any) {
    return res(event, { code: 500, message: e.toString() })
  }
})