import ContentProvider from '../../shared/contentProvider'

import NewsList from './newsList'
import News from './news'
import NewsCountries from './newsCountries'

export default class NewsContentProvider extends ContentProvider {
  constructor(api, view) {
    super(api, view)

    view.eventListener = this

    this.newsListModel = new NewsList()
    this.currentPage = 1
    this.pageSize = 20
    this.totalResults = 0

    this.supportedCountries = new NewsCountries()
    this.supportedCategories = [
      'business',
      'entertainment',
      'general',
      'health',
      'science',
      'sports',
      'technology',
    ]

    this.storageCountryKey = 'selectedCountry'
    this.storageCategoryKey = 'selectedCategory'

    this.selectedCountry = this._readSelectedCountryFromStorage()
    this.selectedCategory = window.localStorage.getItem(this.storageCategoryKey)
    this.searchText = null
  }

  setup() {
    this.view.bindEvents()
  }

  cleanUp() {
    this.view.unbindEvents()
  }

  getTitle() {
    return 'News'
  }

  getHeaderText() {
    return 'News'
  }

  async getContent() {
    this.searchText = null
    this.currentPage = 1

    try {
      const news = await this._fetchNewsData(this.currentPage)
      this.newsListModel.addNews(news)

      return this.view.render(
        news,
        this.supportedCountries.countries,
        this.supportedCategories,
        this.selectedCountry,
        this.selectedCategory
      )
    } catch (err) {
      return this.view.renderError('News data could not be fetched.')
    }
  }

  getClickedNews(id) {
    const news = this.newsListModel.findNews(id)

    return news
  }

  async loadMoreNews() {
    if (this._hasMoreNews()) {
      this.currentPage++

      this._loadNews()
    }
  }

  onCountryChange(countryIsoCode) {
    this.selectedCountry =
      this.supportedCountries.countries.find(
        (country) => country.isoCode === countryIsoCode
      ) || null

    this.currentPage = 1

    this.view.clearNewsList()
    this._loadNews()

    if (this.selectedCountry) {
      window.localStorage.setItem(
        this.storageCountryKey,
        JSON.stringify(this.selectedCountry)
      )
    } else {
      window.localStorage.removeItem(this.storageCountryKey)
    }
  }

  onCategoryChange(category) {
    if (this.supportedCategories.includes(category)) {
      this.selectedCategory = category
    } else {
      this.selectedCategory = null
    }

    this.currentPage = 1

    this.view.clearNewsList()
    this._loadNews()

    if (this.selectedCategory) {
      window.localStorage.setItem(
        this.storageCategoryKey,
        this.selectedCategory
      )
    } else {
      window.localStorage.removeItem(this.storageCategoryKey)
    }
  }

  onSearchTextEnetered(searchText) {
    this.searchText = encodeURIComponent(searchText)

    this.currentPage = 1

    this.view.clearNewsList()
    this._loadNews()
  }

  async _loadNews() {
    this.view.showSpinner()

    try {
      const news = await this._fetchNewsData(this.currentPage)
      this.newsListModel.addNews(news)

      this.view.renderNewData(news)
    } catch (err) {}

    this.view.hideSpinner()
  }

  async _fetchNewsData(page) {
    let { status = '', totalResults = 0, articles = [] } = await this.api.fetch(
      page,
      this.selectedCountry,
      this.selectedCategory,
      this.searchText
    )

    if (status === 'ok') {
      this.totalResults = totalResults

      if (page === 1) {
        this.newsListModel.clear()
      }

      return articles.map((item, index) => new News(index, item))
    }
  }

  _hasMoreNews() {
    const startIndex = (this.currentPage - 1) * this.pageSize + 1

    return this.totalResults === 0 || startIndex < this.totalResults
  }

  _readSelectedCountryFromStorage() {
    const country = window.localStorage.getItem(this.storageCountryKey)

    if (country) {
      return JSON.parse(country)
    }

    return null
  }
}
