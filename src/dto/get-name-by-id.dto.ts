import { ApiModelProperty } from '@nestjs/swagger'

export class GetSummonerNameByIdResponse {
  @ApiModelProperty()
  id!: string

  @ApiModelProperty()
  name!: string
}
