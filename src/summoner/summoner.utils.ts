import { SummonerV4DTO } from '@twisted.gg/common/dist/wrapper/dto'
import { ISummonerLeagueModel, ISummonerModel } from '@twisted.gg/models'
import { Regions } from '@twisted.gg/common/dist/wrapper/constants'
import { getQueueId } from '../summoner-leagues/summoner-leagues.utils'

export enum SummonerUtilsEnum {
  BOT_TAG = '0',
  BOT_NAME = 'Bot'
}

export function isBot (accountId: string | undefined) {
  return accountId === SummonerUtilsEnum.BOT_TAG
}

export function parseAccountId (accountId: string) {
  if (isBot(accountId)) {
    return undefined
  }
  return accountId
}

export function riotToModel (
  riot: SummonerV4DTO,
  leagues: Partial<ISummonerLeagueModel>[],
  region: Regions,
  loading: boolean
): Partial<ISummonerModel> {
  const bot = isBot(riot.accountId)
  const accountId = bot ? riot.name : riot.accountId
  return {
    name: riot.name,
    profileIconId: riot.profileIconId,
    summonerLevel: riot.summonerLevel,
    revisionDate: riot.revisionDate,
    id: riot.id,
    puuid: riot.puuid,
    leagues: leagues.map((league) => ({
      queueId: getQueueId(league.queueType),
      ...league
    })),
    accountId,
    region,
    bot,
    loading
  }
}
