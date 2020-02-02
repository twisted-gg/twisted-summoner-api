import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import riot from '../riot-api/riot-api.service'
import { Regions } from '@twisted.gg/common/dist/wrapper/constants'
import * as utils from './summoner-leagues.utils'
import { Cache } from '../cache/cache.decorator'
import { CacheTimes } from '../enums/cache.enum'
import { ISummonerLeagueModel } from '@twisted.gg/models'
import { ModelsName } from '@twisted.gg/models/dist/enum/collections.enum'

@Injectable()
export class SummonerLeaguesService {
  private readonly api = riot.getLolApi().League

  constructor (
    @InjectModel(ModelsName.SUMMONER_LEAGUES) private readonly repository: Model<ISummonerLeagueModel>
  ) {}

  @Cache({
    expiration: CacheTimes.SUMMONER
  })
  async findOnRiot (id: string, region: Regions) {
    const {
      response: leagues
    } = await this.api.bySummoner(id, region)
    return utils.riotToModel(leagues)
  }

  async create (leagues: ISummonerLeagueModel | ISummonerLeagueModel[]) {
    return this.repository.create(leagues)
  }

  async findHistoric (summoner: string) {
    return this.repository.find({ summoner })
  }
}
