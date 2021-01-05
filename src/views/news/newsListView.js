import View from '../../shared/view'

import { formatDate } from '../../utils'

import './news.css'

export default class NewsListView extends View {
  render(data) {
    const ulElement = document.createElement('ul')
    ulElement.className = 'news'

    data.news.forEach((newsItem) => {
      const listItem = this.createListItem(newsItem)
      ulElement.appendChild(listItem)
    })

    return ulElement.outerHTML
  }

  createListItem(newsData) {
    const {
      urlToImage: imageUrl = '',
      title,
      publishedAt,
      description,
    } = newsData

    const listItem = document.createElement('li')
    listItem.className = 'news__item'

    const html = `
        <header class="news__header">
            <img src="${imageUrl}" alt="">
            <h2 class="news__title">${title}</h2>
            <p class="news__info">Published at ${formatDate(publishedAt)}</p>
        </header>
        <p class="news__description">${description}</p>
    `

    listItem.innerHTML = html

    return listItem
  }
}
