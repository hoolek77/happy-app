import API from '../../utils/api'

export default class SportAPI extends API {
  constructor(baseUrl, apiKey) {
    super(baseUrl, apiKey)
  }

  fetch(options, filter = '', id = '') {
    let sportUrl = `${this.baseUrl}${options}?`
    let key = `apikey=${this.apiKey}`
    let query = `&${filter}=${id}`

    return super.fetch(`${sportUrl}${key}${query}`)
  }
}

// https://app.sportdataapi.com/api/v1/soccer/leagues?apikey&country_id=16
// https://app.sportdataapi.com/api/v1/soccer/countries?apikey&continent=Europe
// https://app.sportdataapi.com/api/v1/soccer/teams?apikey=&country_id=48
