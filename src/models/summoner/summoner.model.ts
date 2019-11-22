import * as mongoose from 'mongoose'
import { ModelsName } from '../../enums/database.enum'
import { IModels } from '../../database/database.types'
import { ModelsOptions } from 'twisted-common/src/config'
import { SummonerLeagueModel } from '../summoner-leagues/summoner-leagues.model'

// Schema definition
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  profileIconId: {
    type: Number,
    required: false,
    default: 0
  },

  summonerLevel: {
    type: Number,
    required: false,
    default: -1
  },

  revisionDate: {
    type: Number,
    required: false,
    default: 0
  },

  id: {
    type: String,
    required: false,
    default: null
  },

  puuid: {
    type: String,
    required: false,
    default: null
  },

  accountId: {
    type: String,
    required: false,
    default: null
  },

  loading: {
    type: Boolean,
    required: false,
    default: true
  },

  bot: {
    type: Boolean,
    required: false,
    default: false
  },

  region: {
    type: String,
    required: true
  },

  lolMatches: {
    type: Map,
    of: Boolean,
    required: false,
    default: {}
  },

  tftMatches: {
    type: Map,
    of: Boolean,
    required: false,
    default: {}
  },

  leagues: {
    type: Map,
    of: SummonerLeagueModel.schema,
    required: false,
    default: {}
  }
}, ModelsOptions)

// Model definition
export const SummonerModel: IModels = {
  name: ModelsName.SUMMONER,
  collection: ModelsName.SUMMONER,
  schema: schema
}
