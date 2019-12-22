const ms = require('ms')

/**
 * String to seconds
 * @param val String to convert
 */
function convert (val: string) {
  return ms(val) / 1000
}

export enum CacheTimes {
  SUMMONER = convert('72h'),
  DEFAULT = convert('1h')
}

export enum CacheMessages {
  CONTEXT = 'CacheService',
  DISCONNECTED = 'Service is disabled'
}
