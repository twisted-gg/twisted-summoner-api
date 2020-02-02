import { Injectable, NotFoundException } from '@nestjs/common'
import { Model, ModelUpdateOptions, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { RiotApiService } from '../riot-api/riot-api.service'
import * as summonerUtils from './summoner.utils'
import * as _ from 'lodash'
import { SummonerLeaguesService } from '../summoner-leagues/summoner-leagues.service'
import { Cache } from '../cache/cache.decorator'
import { CacheTimes } from '../enums/cache.enum'
import { MatchType, SummonerServiceInsertMatch } from '../enums/summoners.enum'
import { GetSummonerQueryDTO } from '@twisted.gg/common'
import { SummonerV4DTO } from '@twisted.gg/common/dist/wrapper/dto'
import { ISummonerModel } from '@twisted.gg/models'
import { ModelsName } from '@twisted.gg/models/dist/enum/collections.enum'
import { GetSummonerNameByIdResponse } from '../dto/get-name-by-id.dto'
import { GetSummonerLeagueDto } from './dto/GetSummonerLeague.dto'

@Injectable()
export class SummonerService {
  private readonly api = this.riot.getLolApi().Summoner

  constructor (
    @InjectModel(ModelsName.SUMMONER) private readonly repository: Model<ISummonerModel>,
    private readonly summonerLeagueService: SummonerLeaguesService,
    private readonly riot: RiotApiService
  ) {}

  @Cache({
    expiration: CacheTimes.SUMMONER
  })
  private async findOnRiot (params: GetSummonerQueryDTO) {
    const {
      region,
      summonerName,
      summonerPUUID,
      accountID
    } = params
    let summoner: SummonerV4DTO
    // Find by puuid or summoner name
    if (summonerPUUID) {
      ({ response: summoner } =
        await this.api.getByPUUID(summonerPUUID, region))
    } else if (accountID) {
      ({ response: summoner } =
        await this.api.getByAccountID(accountID, region))
    } else {
      ({ response: summoner } =
        await this.api.getByName(summonerName, region))
    }

    return summoner
  }

  private async upsert (model: Partial<ISummonerModel>) {
    delete model._id
    const condition = {
      puuid: model.puuid,
      region: model.region,
      bot: model.bot
    }
    const options: ModelUpdateOptions = {
      upsert: true
    }
    return this.repository.updateOne(condition, model, options)
  }

  // Public methods
  async update (params: GetSummonerQueryDTO, loading: boolean = false): Promise<ISummonerModel> {
    const onRiot = await this.findOnRiot(params)
    const leagues = await this.summonerLeagueService.findOnRiot(onRiot.id, params.region)
    // Create model
    const model = summonerUtils.riotToModel(
      onRiot,
      leagues,
      params.region,
      loading
    )
    await this.upsert(model)
    const response = await this.get(
      {
        summonerName: onRiot.name,
        region: params.region
      }
      , false)
    if (!response) {
      throw new Error()
    }
    // Update based users models
    await this.summonerLeagueService.create(leagues)
    return this.get(params, false)
  }

  @Cache({
    expiration: CacheTimes.SUMMONER_SAVED
  })
  async getById (id: string) {
    const summoner = await this.repository.findById(id)
    if (!summoner) {
      throw new NotFoundException()
    }
    return summoner
  }

  @Cache({
    expiration: CacheTimes.SUMMONER_SAVED
  })
  async getNameById (id: string): Promise<GetSummonerNameByIdResponse> {
    const summoner = await this.getById(id)
    return {
      name: summoner.name
    }
  }

  async get (params: GetSummonerQueryDTO, findRiot: boolean = true, loading: boolean = false) {
    // Find by name or puuid
    const options = {
      // Case insensitive
      name: new RegExp(params.summonerName, 'i'),
      region: params.region
    }
    if (params.summonerPUUID) {
      delete options.name
      _.set(options, 'puuid', params.summonerPUUID)
    }

    if (params.accountID) {
      delete options.name
      _.set(options, 'accountId', params.accountID)
    }

    const summoner = await this.repository.findOne(options)
    if (summoner) {
      return summoner
    }
    if (!findRiot) {
      throw new NotFoundException('Summoner not found')
    }
    return this.update(params, loading)
  }

  // External methods
  async leaguesHistoric (params: GetSummonerQueryDTO) {
    const summoner = await this.get(params)
    return this.summonerLeagueService.findHistoric(summoner._id)
  }

  async league (params: GetSummonerLeagueDto) {
    const { league } = params
    const summoner = await this.get(params)
    const queue = summoner.leagues.find(l => l.queueId === +league || l.queueType === league)
    if (!queue) {
      throw new NotFoundException()
    }
    return queue
  }
}
