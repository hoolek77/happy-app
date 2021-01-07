export default class News {
  constructor(
    id,
    { author, title, description, content, publishedAt, url, urlToImage }
  ) {
    this.id = id
    this.author = author
    this.title = title
    this.description = description
    this.content = content
    this.publishedAt = publishedAt
    this.url = url
    this.urlToImage = urlToImage
  }
}
