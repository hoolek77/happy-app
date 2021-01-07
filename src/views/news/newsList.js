export default class NewsList {
  constructor() {
    this.news = []
  }

  addNews(news) {
    this.news.push(...news)
  }
}
