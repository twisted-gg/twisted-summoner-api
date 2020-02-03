import { ConfigService } from '../config/config.service'
import * as rp from 'request-promise'

const baseUrl = new ConfigService().get('services.mmr')

export async function leagueToMmr (rank: string, tier: string, points: number): Promise<number> {
  const options: rp.OptionsWithUri = {
    uri: `${baseUrl}/league-to-mmr`,
    qs: {
      rank,
      tier,
      points
    },
    json: true
  }
  try {
    const { mmr } = await rp(options)
    return mmr
  } catch (e) {
    return -1
  }
}
