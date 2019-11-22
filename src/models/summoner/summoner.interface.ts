import { Regions } from 'twisted/dist/constants'
import { IBaseInterface } from 'twisted-common/src/config'
import { ISummonerLeagueModel } from '../summoner-leagues/summoner-leagues.interface'

export interface ISummonerModel extends IBaseInterface {
  name: string
  profileIconId: number
  summonerLevel: number
  revisionDate: number
  id: string
  puuid: string
  accountId: string
  loading?: boolean
  bot?: boolean
  region: Regions
  lolMatches: Map<string, boolean>,
  tftMatches: Map<string, boolean>
  leagues: Map<string, Partial<ISummonerLeagueModel>>
}
