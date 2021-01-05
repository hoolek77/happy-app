import View from '../../shared/view'

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
    const listItem = document.createElement('li')
    listItem.className = 'news__item'

    const html = `
        <header class="news__header">
            <img src="${newsData.urlToImage}" alt="">
            <h2 class="news__title">${newsData.title}</h2>
            <p class="news__info">Published at <span class="news__published-date">${newsData.publishedAt}</span> by <span class="news__author">${newsData.author}</span></p>
        </header>
        <p class="news__description">${newsData.description}</p>
    `

    listItem.innerHTML = html

    return listItem
  }
}
