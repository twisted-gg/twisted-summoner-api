import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsEnum } from 'class-validator'
import { MatchType, SummonerServiceInsertMatch } from '../enums/summoners.enum'

export class AddMatches {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  summoner_id!: string

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  match_id!: string

  @ApiModelProperty({ enum: Object.values(SummonerServiceInsertMatch) })
  @IsEnum(Object.values(SummonerServiceInsertMatch))
  @IsNotEmpty()
  type!: SummonerServiceInsertMatch
}
