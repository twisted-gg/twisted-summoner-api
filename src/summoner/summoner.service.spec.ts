import { Test, TestingModule } from '@nestjs/testing'
import { SummonerService } from './summoner.service'
import { SummonerLeaguesService } from '../summoner-leagues/summoner-leagues.service'
import { RiotApiService } from '../riot-api/riot-api.service'
import { ConfigService } from '../config/config.service'
import { DatabaseTestProviders } from 'twisted-models'

describe('SummonerService', () => {
  let service: SummonerService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ...DatabaseTestProviders,
        ConfigService,
        RiotApiService,
        SummonerLeaguesService,
        SummonerService
      ]
    }).compile()
    service = module.get<SummonerService>(SummonerService)
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
