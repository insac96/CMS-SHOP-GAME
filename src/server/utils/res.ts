import type { H3Event } from 'h3'
import type { IRes } from '~~/types'

export default (event: H3Event, res: IRes) : IRes => {
  setResponseStatus(event, 200)
  return {
    ...res,
    code: res.code || 200
  }
}