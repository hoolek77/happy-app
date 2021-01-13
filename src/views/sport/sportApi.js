import API from '../../utils/api'

export class SportAPI extends API {
  constructor(baseUrl, apiKey) {
    super(baseUrl, apiKey)
  }

  fetch(
    options,
    filter = '',
    id = '',
    filter2 = '',
    id2 = '',
    filter3 = '',
    id3 = ''
  ) {
    const sportUrl = `${this.baseUrl}${options}?`
    const key = `apikey=${this.apiKey}`
    const query = `&${filter}=${id}`
    const query2 = `&${filter2}=${id2}`
    const query3 = `&${filter3}=${id3}`
    return super.fetch(`${sportUrl}${key}${query}${query2}${query3}`)
  }
}
