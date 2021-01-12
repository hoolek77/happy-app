import View from '../../shared/view'
import CardPreview from '../../shared/cardPreview'
import { getSpinner, getSpinnerClassName } from '../../shared/spinner'

import { formatDate, stripHTMLTags, capitalizeFirstLetter } from '../../utils'

import './news.css'

const newsClassName = 'news'
const newsItemClassName = 'news__item'
const newsHeaderClassName = 'news__header'
const newsImageClassName = 'news__image'
const newsTitleClassName = 'news__title'
const newsInfoClassName = 'news__info'
const newsDescriptionClassName = 'news__description'
const contentClassName = 'news__content'
const linkClassName = 'news__article-link'
const formClassName = 'form'
const newsFormClassName = 'news__form'
const countriesSelectClassName = 'news__countries'
const categoriesSelectClassName = 'news__categories'
const selectClassName = 'form__select'
const worldSelect = 'world'
const allCategories = 'all'

export default class NewsListView extends View {
  constructor() {
    super()

    this.isScrolled = false

    this._handleScroll = this._handleScroll.bind(this)
  }

  render(data, countries, categories) {
    const mainWrapper = document.createElement('div')
    const formElement = this._createForm(countries, categories)
    const ulElement = this._createNewsList(data)

    mainWrapper.appendChild(formElement)
    mainWrapper.appendChild(ulElement)

    return mainWrapper
  }

  renderNewData(data) {
    const ulElement = document.querySelector(`.${newsClassName}`)

    if (ulElement) {
      data.forEach((newsItem) => {
        const listItem = this._createListItem(newsItem)
        ulElement.appendChild(listItem)
      })
    }
  }

  showSpinner() {
    const ulElement = document.querySelector(`.${newsClassName}`)

    if (ulElement) {
      ulElement.parentNode.insertAdjacentHTML('beforeend', getSpinner())
    }
  }

  hideSpinner() {
    const ulElement = document.querySelector(`.${newsClassName}`)

    if (ulElement) {
      const spinner = ulElement.parentNode.querySelector(
        `.${getSpinnerClassName()}`
      )
      spinner.remove()
    }
  }

  bindEvents() {
    window.addEventListener('scroll', this._handleScroll, { passive: true })
  }

  unbindEvents() {
    window.removeEventListener('scroll', this._handleScroll)
  }

  _createForm(countries, categories) {
    const formElement = document.createElement('form')
    formElement.classList.add(formClassName)
    formElement.classList.add(newsFormClassName)

    const selectsWrapperElement = document.createElement('div')
    const countriesSelect = this._createCountriesSelect(countries)
    selectsWrapperElement.appendChild(countriesSelect)

    const categoriesSelect = this._createCategoriesSelect(categories)
    selectsWrapperElement.appendChild(categoriesSelect)

    formElement.appendChild(selectsWrapperElement)

    return formElement
  }

  _createCountriesSelect(countries) {
    const selectElement = document.createElement('select')
    selectElement.classList.add(selectClassName)
    selectElement.classList.add(countriesSelectClassName)

    selectElement.add(
      new Option(capitalizeFirstLetter(worldSelect), worldSelect)
    )

    countries.forEach((country) => {
      const option = new Option(country.countryName, country.isoCode)
      selectElement.add(option, undefined)
    })

    return selectElement
  }

  _createCategoriesSelect(categories) {
    const selectElement = document.createElement('select')
    selectElement.classList.add(selectClassName)
    selectElement.classList.add(categoriesSelectClassName)

    selectElement.add(
      new Option(capitalizeFirstLetter(allCategories), allCategories)
    )

    categories.forEach((category) => {
      const option = new Option(capitalizeFirstLetter(category), category)
      selectElement.add(option, undefined)
    })

    return selectElement
  }

  _createNewsList(data) {
    const ulElement = document.createElement('ul')
    ulElement.className = newsClassName

    data.forEach((newsItem) => {
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

  _handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement

    if (scrollTop + clientHeight >= scrollHeight - 10 && !this.isScrolled) {
      this.isScrolled = true

      this.eventListener.loadMoreNews()

      setTimeout(() => (this.isScrolled = false), 1000)
    }
  }
}
