import { SummonerLeagueDto } from '@twisted.gg/common/dist/wrapper/dto'
import { castArray } from 'lodash'
import { ISummonerLeagueModel } from '@twisted.gg/models'
import { leagueToMmr } from '../mmr/mmr.service'

const RomanNumerals = require('js-roman-numerals')

export function romanToInt (roman: string | number): number {
  if (typeof roman === 'number') {
    return roman
  }
  return +new RomanNumerals(roman).toInt()
}

export function getQueueId (queueType?: string): number {
  const leagues = {
    RANKED_FLEX_SR: 440,
    RANKED_SOLO_5x5: 420
  }
  return (queueType && leagues[queueType]) || 0
}

export async function riotToModel (leagues: SummonerLeagueDto | SummonerLeagueDto[], summoner: string): Promise<ISummonerLeagueModel[]> {
  const response: ISummonerLeagueModel[] = []
  for (const item of castArray(leagues)) {
    const mmr = await leagueToMmr(item.rank, item.tier, item.leaguePoints)
    response.push({
      queueId: getQueueId(item.queueType),
      queueType: item.queueType,
      mmr,
      hotStreak: item.hotStreak,
      wins: item.wins,
      veteran: item.veteran,
      losses: item.losses,
      rank: item.rank,
      leagueId: item.leagueId,
      inactive: item.inactive,
      freshBlood: item.freshBlood,
      tier: item.tier,
      leaguePoints: item.leaguePoints,
      summoner
    } as ISummonerLeagueModel)
  }
  return response
}
