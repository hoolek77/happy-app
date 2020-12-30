import NewsList from './newsList'
import News from './news'

export default class NewsController {
  constructor(newsApi, newsListView) {
    this.newsApi = newsApi
    this.newsListView = newsListView

    this.newsListModel = new NewsList()
  }

  async fetchNews() {
    try {
      let { status = '', articles = [] } = await this.newsApi.fetch()

      if (status === 'ok') {
        this.newsListModel.addNews(articles.map((item) => new News(item)))
        console.log(this.newsListModel.news)
        this.newsListView.renderList(this.newsListModel)
      }
    } catch (err) {
      console.error(err)
    }
  }
}
