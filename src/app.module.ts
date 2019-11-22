import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { RiotApiModule } from './riot-api/riot-api.module'
import { ConfigModule } from './config/config.module'
import { SummonerModule } from './summoner/summoner.module'
import { SummonerLeaguesModule } from './summoner-leagues/summoner-leagues.module'
import { DatabaseConnection } from './database/database.connection'
import { CacheService } from './cache/cache.service'
import { OriginMiddleware } from 'twisted-common/src/middleware'

@Module({
  imports: [
    DatabaseConnection,
    ConfigModule,
    RiotApiModule,
    SummonerModule,
    SummonerLeaguesModule
  ],
  providers: [CacheService]
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(OriginMiddleware)
      .forRoutes('*')
  }
}
