import View from '../../shared/view'
import CardPreview from '../../shared/cardPreview'

import { formatDate } from '../../utils'

import './news.css'

const newsClassName = 'news'
const newsItemClassName = 'news__item'
const newsItemSelector = `.${newsItemClassName}`
const newsHeaderClassName = 'news__header'
const newsTitleClassName = 'news__title'
const newsInfoClassName = 'news__info'
const newsDescriptionClassName = 'news__description'
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
    const {
      id,
      urlToImage: imageUrl = '',
      title,
      publishedAt,
      description,
    } = newsData

    const listItem = document.createElement('li')
    listItem.addEventListener('click', this._handleNewsItemClick.bind(this))
    listItem.className = newsItemClassName
    listItem.dataset.id = id

    const html = `
        <header class="${newsHeaderClassName}">
            <img src="${imageUrl}" alt="">
            <h2 class="${newsTitleClassName}">${title}</h2>
            <p class="${newsInfoClassName}">Published at ${formatDate(
      publishedAt
    )}</p>
        </header>
        <p class="${newsDescriptionClassName}">${description}</p>
    `

    listItem.innerHTML = html

    return listItem
  }

  async _handleNewsItemClick(e) {
    const newsItemElement = e.currentTarget

    if (newsItemElement) {
      this.eventListener.onNewsItemClicked(+newsItemElement.dataset.id)

      const cardPreview = new CardPreview(newsItemElement)
      cardPreview.showCardPreview()
    }
  }
}
