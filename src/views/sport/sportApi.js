import API from '../../utils/api'

export class SportAPI extends API {
  constructor(baseUrl, apiKey) {
    super(baseUrl, apiKey)
  }

  fetch(options, filter = '', id = '') {
    const sportUrl = `${this.baseUrl}${options}?`
    const key = `apikey=${this.apiKey}`
    const query = `&${filter}=${id}`

    return super.fetch(`${sportUrl}${key}${query}`)
  }
}

// https://app.sportdataapi.com/api/v1/soccer/leagues?apikey&country_id=16
// https://app.sportdataapi.com/api/v1/soccer/countries?apikey&continent=Europe
// https://app.sportdataapi.com/api/v1/soccer/teams?apikey=&country_id=48
