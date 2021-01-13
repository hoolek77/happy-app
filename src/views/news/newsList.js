export default class NewsList {
  constructor() {
    this.news = []
  }

  clear() {
    this.news = []
  }

  addNews(news) {
    this.news.push(...news)
  }

  findNews(newsId) {
    return this.news.find((item) => item.id === newsId)
  }
}
