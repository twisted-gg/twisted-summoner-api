import { Controller, Post, Get, Query, Body, Patch, Param } from '@nestjs/common'
import { SummonerService } from './summoner.service'
import { ApiOperation, ApiUseTags, ApiOkResponse } from '@nestjs/swagger'
import { GetSummonerQueryDTO } from '@twisted.gg/common'
import { GetSummonerLeaguesDTO, GetSummonerDTO } from '@twisted.gg/models'
import { AddMatches } from '../dto/add-matches.dto'

@Controller()
export class SummonerController {
  constructor (
    private readonly service: SummonerService
  ) {}

  @Get()
  @ApiOkResponse({ type: GetSummonerDTO })
  @ApiOperation({
    title: 'Find / create username'
  })
  @ApiUseTags('Getters')
  get (@Query() params: GetSummonerQueryDTO) {
    return this.service.get(params)
  }

  @Get('by-id/:id')
  @ApiOkResponse({ type: GetSummonerDTO })
  @ApiOperation({
    title: 'Find user by id'
  })
  @ApiUseTags('Getters')
  getById (@Param('id') id: string) {
    return this.service.getById(id)
  }

  @Get('leagues/historic')
  @ApiOkResponse({ type: [GetSummonerLeaguesDTO] })
  @ApiOperation({
    title: 'Leagues historic',
    description: 'Return leagues historic from an user'
  })
  @ApiUseTags('Getters')
  leagues (@Query() params: GetSummonerQueryDTO) {
    return this.service.leaguesHistoric(params)
  }

  @Post()
  @ApiOkResponse({ type: GetSummonerDTO })
  @ApiOperation({
    title: 'Update / create new user'
  })
  @ApiUseTags('Update')
  update (@Body() body: GetSummonerQueryDTO) {
    return this.service.update(body)
  }

  @Patch('match')
  @ApiOperation({
    title: 'Add matches to summoner'
  })
  @ApiUseTags('Update')
  async addMatches (@Query() params: AddMatches) {
    await this.service.insertMatches([params.summoner_id], params.match_id, params.type)
  }
}
