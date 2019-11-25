import { SummonerLeagueDto } from 'twisted/dist/dto'
import { castArray } from 'lodash'
import { ISummonerLeagueModel } from 'twisted-models'

const RomanNumerals = require('js-roman-numerals')

export function romanToInt (roman: string | number): number {
  if (typeof roman === 'number') {
    return roman
  }
  return +new RomanNumerals(roman).toInt()
}

export function riotToModel (leagues: SummonerLeagueDto | SummonerLeagueDto[], summoner?: string): ISummonerLeagueModel[] {
  const response: ISummonerLeagueModel[] = []
  for (const item of castArray(leagues)) {
    const createItem = {
      ...item,
      rank: romanToInt(item.rank),
      summoner: summoner
    }
    response.push(createItem as ISummonerLeagueModel)
  }
  return response
}
