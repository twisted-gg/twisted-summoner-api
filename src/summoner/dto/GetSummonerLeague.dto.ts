import { GetSummonerQueryDTO } from '@twisted.gg/models'
import { IsString, IsNotEmpty } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class GetSummonerLeagueDto extends GetSummonerQueryDTO {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  league!: string
}
