import { Controller, Post, Get, Query, Body, Patch, Param } from '@nestjs/common'
import { SummonerService } from './summoner.service'
import { ApiOperation, ApiUseTags, ApiOkResponse } from '@nestjs/swagger'
import { GetSummonerQueryDTO } from '@twisted.gg/common'
import { GetSummonerLeaguesDTO, GetSummonerDTO, ISummonerModel } from '@twisted.gg/models'
import { AddMatches } from '../dto/add-matches.dto'
import { GetSummonerNameByIdResponse } from '../dto/get-name-by-id.dto'
import { GetSummonerLeagueDto } from './dto/GetSummonerLeague.dto'

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

  @Get('multi')
  @ApiOkResponse({ type: { users: [GetSummonerDTO] } })
  @ApiOperation({
    title: 'Find multiple users'
  })
  @ApiUseTags('Getters')
  async getMultiple (@Query() params: GetSummonerQueryDTO) {
    return this.service.getMultiple(params)
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

  @Get('summonerName/multi')
  @ApiOkResponse({ type: GetSummonerNameByIdResponse })
  @ApiUseTags('Getters')
  getMultiSummonerNameById (@Query('id') id: string[]) {
    return this.service.getMultipleNameById(id)
  }

  @Get('summonerName/:id')
  @ApiOkResponse({ type: GetSummonerNameByIdResponse })
  @ApiOperation({
    title: 'Get summoner name by id'
  })
  @ApiUseTags('Getters')
  getSummonerNameById (@Param('id') id: string) {
    return this.service.getSingleNameById(id)
  }

  @Get('league')
  @ApiOkResponse({ type: GetSummonerLeaguesDTO })
  @ApiOperation({
    title: 'Summoner league',
    description: 'Find summoner league'
  })
  @ApiUseTags('Getters')
  league (@Query() params: GetSummonerLeagueDto) {
    return this.service.league(params)
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
}
