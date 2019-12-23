import { CacheService } from './cache.service'
import { version } from '../../package.json'
import * as utils from '@twisted.gg/common/dist/services/cache/CacheService.utils'
import { Logger } from '@nestjs/common'

const service = new CacheService()
const context = 'CacheService'
export interface ICacheParams {
  expiration?: number
}
/**
 * Cache decorator
 * @param expiration Expiration in seconds
 */
export function Cache (params: ICacheParams = {}) {
  const {
    expiration
  } = params
  return function (
    target: Object,
    propertyName: string,
    propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
    const method = propertyDesciptor.value
    const className = target.constructor.name
    propertyDesciptor.value = async function (...args: any[]) {
      // Create unique key
      const key = utils.generateKey(version, className, propertyName, args)
      // Find in redis
      const cacheValue = await service.get(key)
      if (cacheValue) {
        return cacheValue
      }
      // Default response
      const result = await method.apply(this, args)

      // Set
      try {
        await service.set(key, result, expiration)
      } catch (e) {
        const message = 'Error creating cache key'
        Logger.error(message, e, context)
      }

      return result
    }
    return propertyDesciptor
  }
}
