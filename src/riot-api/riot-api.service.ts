import { Injectable } from '@nestjs/common'
import { LolApi, TftApi } from '@twisted.gg/common/dist/wrapper'
import { ConfigService } from '../config/config.service'

const config = new ConfigService()
const params = {
  key: config.get<string>('riot.apiKey'),
  rateLimitRetry: config.getBoolean('riot.rateLimitRetry'),
  rateLimitRetryAttempts: config.getNumber('riot.rateLimitCount'),
  concurrency: +config.getNumber('riot.concurrency'),
  debug: {
    logUrls: config.getBoolean('riot.debug.url'),
    logRatelimits: config.getBoolean('riot.debug.rateLimits')
  }
}
const lolApi = new LolApi(params)
const tftApi = new TftApi(params)

export default {
  getTftApi (): TftApi {
    return tftApi
  },

  getLolApi (): LolApi {
    return lolApi
  }
}
