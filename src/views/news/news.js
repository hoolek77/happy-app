export default class News {
  constructor({
    author,
    title,
    description,
    content,
    publishedAt,
    url,
    urlToImage,
  }) {
    this.author = author
    this.title = title
    this.description = description
    this.content = content
    this.publishedAt = publishedAt
    this.url = url
    this.urlToImage = urlToImage
  }
}
