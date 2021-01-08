import View from '../../shared/view'
import CardPreview from '../../shared/cardPreview'

import { formatDate, stripHTMLTags } from '../../utils'

import './news.css'

const newsClassName = 'news'
const newsItemClassName = 'news__item'
const newsItemSelector = `.${newsItemClassName}`
const newsHeaderClassName = 'news__header'
const newsImageClassName = 'news__image'
const newsTitleClassName = 'news__title'
const newsInfoClassName = 'news__info'
const newsDescriptionClassName = 'news__description'
const contentClassName = 'news__content'
const linkClassName = 'news__article-link'
export default class NewsListView extends View {
  render(data) {
    const ulElement = document.createElement('ul')
    ulElement.className = newsClassName

    data.news.forEach((newsItem) => {
      const listItem = this._createListItem(newsItem)
      ulElement.appendChild(listItem)
    })

    return ulElement
  }

  _createListItem(newsData) {
    const { id } = newsData

    const listItem = document.createElement('li')
    listItem.addEventListener('click', this._handleNewsItemClick.bind(this))
    listItem.className = newsItemClassName
    listItem.dataset.id = id
    listItem.innerHTML = this._createListItemContent(newsData)

    return listItem
  }

  _createListItemContent(newsData, expandedContent = false) {
    const {
      urlToImage: imageUrl = '',
      author,
      title,
      publishedAt,
      description,
      content,
      url,
    } = newsData

    return `
        <header class="${newsHeaderClassName}">
          <div class="${newsImageClassName}">
            <img src="${imageUrl}" alt="">
          </div>
          <h2 class="${newsTitleClassName}">${title}</h2>
          <p class="${newsInfoClassName}">Published at ${formatDate(
      publishedAt
    )}</p>
          ${
            expandedContent && author
              ? `<p class="${newsInfoClassName}">Author: ${author}</p>`
              : ''
          }
        </header>
        ${
          expandedContent
            ? `<p class="${contentClassName}">${stripHTMLTags(
                this._removeCharsInfoFromContent(content)
              )}</p><p class="${linkClassName}"><a class="link" href="${url}" target="_blank">Read the whole article</a></p>`
            : `<p class="${newsDescriptionClassName}">${description}</p>`
        }
    `
  }

  _removeCharsInfoFromContent(content) {
    return content.replace(/\[\+\d+ chars\]/, '')
  }

  async _handleNewsItemClick(e) {
    const newsItemElement = e.currentTarget

    if (newsItemElement) {
      const news = this.eventListener.getClickedNews(
        +newsItemElement.dataset.id
      )

      const previewContent = this._createListItemContent(news, true)

      const cardPreview = new CardPreview(newsItemElement, previewContent)
      cardPreview.showCardPreview()
    }
  }
}
