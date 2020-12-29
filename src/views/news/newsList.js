import News from './News'

export default class NewsList {
  constructor(api) {
    this.api = api
    this.newsList = []
  }

  async load() {
    try {
      let { status = '', articles = [] } = await this.api.fetchNews()

      if (status === 'ok') {
        this.newsList = articles.map((item) => new News(item))
      }
    } catch (err) {
      console.error(err)
    }
  }
}
