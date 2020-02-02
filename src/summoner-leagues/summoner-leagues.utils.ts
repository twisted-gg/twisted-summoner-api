import { SummonerLeagueDto } from '@twisted.gg/common/dist/wrapper/dto'
import { castArray } from 'lodash'
import { ISummonerLeagueModel } from '@twisted.gg/models'

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

export function riotToModel (leagues: SummonerLeagueDto | SummonerLeagueDto[], summoner?: string): ISummonerLeagueModel[] {
  const response: ISummonerLeagueModel[] = []
  for (const item of castArray(leagues)) {
    const createItem = {
      queueId: getQueueId(item.queueType),
      ...item,
      rank: romanToInt(item.rank),
      summoner: summoner
    }
    response.push(createItem as ISummonerLeagueModel)
  }
  return response
}
