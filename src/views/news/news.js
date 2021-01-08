export default class News {
  constructor(
    id,
    { author, title, description, content, publishedAt, url, urlToImage }
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.content = content
    this.publishedAt = publishedAt
    this.url = url
    this.urlToImage = urlToImage

    this._parseAuthor(author)
  }

  _parseAuthor(author) {
    this.author = author

    if (author && author.includes('"@type":"Person"')) {
      const pos = author.indexOf('"name":')

      if (pos > -1) {
        const startNamePos = pos + 8

        const endNamePos = author.indexOf('"', startNamePos)

        if (endNamePos > -1) {
          this.author = author.slice(startNamePos, endNamePos)
        }
      }
    }
  }
}
