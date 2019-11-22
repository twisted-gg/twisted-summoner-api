import { ApiModelProperty, ApiResponseModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsArray } from 'class-validator'
import { Regions } from 'twisted/dist/constants'
import { RegionsList } from 'twisted-common/src/enum'
import { SummonerServiceInsertMatch } from '../../enums/summoners.enum'
import { BaseDTO } from 'twisted-common/src/config'
import { GetSummonerLeaguesDTO } from './summoner-leagues.dto'

// Partial
class GetSummonerDTOMatches {
  @ApiResponseModelProperty()
  gameId!: boolean
}

class GetSummonerDTOLeagues {
  @ApiResponseModelProperty({
    type: GetSummonerLeaguesDTO
  })
  queueType!: GetSummonerLeaguesDTO
}

// DTO
export class GetSummonerDTO extends BaseDTO {
  @ApiResponseModelProperty()
  _id!: string

  @ApiResponseModelProperty()
  name!: string

  @ApiResponseModelProperty()
  profileIconId!: number

  @ApiResponseModelProperty()
  summonerLevel!: number

  @ApiResponseModelProperty()
  revisionDate!: number

  @ApiResponseModelProperty()
  id!: string

  @ApiResponseModelProperty()
  puuid!: string

  @ApiResponseModelProperty()
  accountId!: string

  @ApiResponseModelProperty()
  loading!: boolean

  @ApiResponseModelProperty()
  bot!: boolean

  @ApiResponseModelProperty()
  region!: Regions

  @ApiResponseModelProperty({
    type: GetSummonerDTOMatches
  })
  matches!: Map<string, boolean>

  @ApiResponseModelProperty({
    type: GetSummonerDTOLeagues
  })
  leagues!: Map<string, GetSummonerDTOLeagues>
}

export class AddMatches {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  match_id!: string

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  summoner_id!: string

  @ApiModelProperty({
    enum: Object.values(SummonerServiceInsertMatch),
    type: String
  })
  @IsNotEmpty()
  @IsEnum(Object.values(SummonerServiceInsertMatch))
  type!: SummonerServiceInsertMatch
}
