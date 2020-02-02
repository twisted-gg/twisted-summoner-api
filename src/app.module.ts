import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { ConfigModule } from './config/config.module'
import { SummonerModule } from './summoner/summoner.module'
import { SummonerLeaguesModule } from './summoner-leagues/summoner-leagues.module'
import { DatabaseConnection } from './database/database.connection'
import { CacheService } from './cache/cache.service'
import { OriginMiddleware } from '@twisted.gg/common'

@Module({
  imports: [
    DatabaseConnection,
    ConfigModule,
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
