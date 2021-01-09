export default class NewsList {
  constructor() {
    this.news = []
  }

  addNews(news) {
    this.news.push(...news)
  }

  findNews(newsId) {
    return this.news.find((item) => item.id === newsId)
  }
}
