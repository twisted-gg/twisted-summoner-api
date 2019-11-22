import { Module } from '@nestjs/common'
import { SummonerService } from './summoner.service'
import { SummonerController } from './summoner.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { SummonerLeaguesModule } from '../summoner-leagues/summoner-leagues.module'
import { SummonerModel } from '../models/summoner/summoner.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      SummonerModel
    ]),
    SummonerLeaguesModule
  ],
  providers: [SummonerService],
  controllers: [SummonerController],
  exports: [SummonerService]
})
export class SummonerModule {}
