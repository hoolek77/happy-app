import ContentProvider from '../../shared/contentProvider'

import NewsList from './newsList'
import News from './news'

export default class NewsContentProvider extends ContentProvider {
  constructor(api, view) {
    super(api, view)

    this.newsListModel = new NewsList()
  }

  getTitle() {
    return 'News'
  }

  getHeaderText() {
    return 'News'
  }

  async getContent() {
    try {
      let { status = '', articles = [] } = await this.api.fetch()

      if (status === 'ok') {
        this.newsListModel.addNews(articles.map((item) => new News(item)))

        return this.view.render(this.newsListModel)
      }
    } catch (err) {
      console.error(err)
    }

    return ''
  }
}
