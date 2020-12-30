import 'regenerator-runtime/runtime'

import { NewsAPI, NewsController, NewsListView } from './views/'
import { NEWS_API } from './environment'

import './content/styles/global.css'

const init = () => {
  const rootElement = document.querySelector('main')

  const newsApi = new NewsAPI(NEWS_API.API_BASE_URL, NEWS_API.API_KEY)
  const newsListView = new NewsListView(rootElement)
  const newsController = new NewsController(newsApi, newsListView)

  newsController.fetchNews()
}

document.addEventListener('DOMContentLoaded', init)
