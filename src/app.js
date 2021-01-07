import './content/styles/main.css'

import { Router, Navigator } from './shared/navigation'

import { NEWS_API, SPORT_API } from './environment'

import { HomeContentProvider } from './views/home'
import { NewsAPI, NewsContentProvider, NewsListView } from './views/news/'

import { SportAPI, SportContentProvider, SportView } from './views/sport/'

export default class App {
  constructor() {
    this._setupNavigation()
  }

  _setupNavigation() {
    this.router = new Router()

    this.router.addRoute('/', new HomeContentProvider())

    const newsApi = new NewsAPI(NEWS_API.API_BASE_URL, NEWS_API.API_KEY)
    const countryApi = new SportAPI(SPORT_API.API_BASE_URL, SPORT_API.API_KEY)
    this.router.addRoute(
      '/news',
      new NewsContentProvider(newsApi, new NewsListView())
    )

    this.router.addRoute(
      '/sport',
      new SportContentProvider(countryApi, new SportView())
    )

    this.navigator = new Navigator(this.router)
  }
}
