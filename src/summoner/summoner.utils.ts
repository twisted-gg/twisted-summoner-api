import { SummonerV4DTO } from 'twisted/dist/dto'
import { Regions } from 'twisted/dist/constants'
import { ISummonerLeagueModel, ISummonerModel } from 'twisted-models'

export enum SummonerUtilsEnum {
  BOT_TAG = '0',
  BOT_NAME = 'Bot'
}

export function matchLeagues (leagues: Partial<ISummonerLeagueModel>[]) {
  const response = new Map()
  for (const league of leagues) {
    response.set(league.queueType, league)
  }
  return response
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
    leagues: matchLeagues(leagues),
    accountId,
    region,
    bot,
    loading
  }
}
