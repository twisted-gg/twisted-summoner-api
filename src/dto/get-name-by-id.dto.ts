import { ApiModelProperty } from '@nestjs/swagger'

export class GetSummonerNameByIdResponse {
  @ApiModelProperty()
  name!: string
}
