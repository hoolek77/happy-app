import './content/styles/main.css'

import { Router, Navigator } from './shared/navigation'

import HomeView from './views/home'
import NewsListView from './views/news/'
import SportView from './views/sport/'

export default class App {
  constructor() {
    this._setupNavigation()
  }

  _setupNavigation() {
    this.router = new Router()

    this.router.addRoute('/', HomeView)
    this.router.addRoute('/news', NewsListView)
    this.router.addRoute('/sport', SportView)

    this.navigator = new Navigator(this.router)
  }
}
