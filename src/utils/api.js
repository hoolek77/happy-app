export default class API {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl
    this.apiKey = apiKey
  }

  async fetch(url, options, query = '') {
    const response = await fetch(`${url}${query}`, options)

    if (response.ok) {
      return response.json()
    }

    return Promise.reject(response)
  }
}
