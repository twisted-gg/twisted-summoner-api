import { Module } from '@nestjs/common'
import { SummonerLeaguesService } from './summoner-leagues.service'
import { MongooseModule } from '@nestjs/mongoose'
import { SummonerLeagueModel } from '@twisted.gg/models'

@Module({
  imports: [
    MongooseModule.forFeature([
      SummonerLeagueModel
    ])
  ],
  providers: [SummonerLeaguesService],
  exports: [SummonerLeaguesService]
})
export class SummonerLeaguesModule {}
