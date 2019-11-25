import { getModelToken } from '@nestjs/mongoose'
import { ModelsName } from 'twisted-models/dist/enum/collections.enum'

export const useValue = {
  findOne: () => Promise.resolve(),
  find: () => Promise.resolve(),
  create: () => Promise.resolve(),
  countDocuments: () => Promise.resolve()
}

export const DatabaseTestProviders = [
  {
    provide: getModelToken(ModelsName.SUMMONER),
    useValue
  },
  {
    provide: getModelToken(ModelsName.SUMMONER_LEAGUES),
    useValue
  }
]
