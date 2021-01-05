import { isTypeOfClass } from '../../utils'
import ContentProvider from '../contentProvider'

export default class Router {
  constructor() {
    this.routes = []
    this.eventsHandlers = []
  }

  start() {
    window.addEventListener('popstate', this._onRouteChange.bind(this))

    this._onRouteChange()
  }

  addRoute(path, contentProvider) {
    if (!path || !contentProvider) {
      throw new Error('Please provide route path and content provider.')
    }

    if (typeof path !== 'string') {
      throw new Error('Path must be type of string.')
    }

    if (!(contentProvider instanceof ContentProvider)) {
      throw new Error(
        'Content provider must be instance of class ContentProvider.'
      )
    }

    const route = {
      path,
      contentProvider,
      link: path.slice(1),
    }

    this.routes.push(route)
  }

  navigateTo(url) {
    history.pushState(null, null, url)
    this._onRouteChange()
  }

  subscribeForEvent(handler) {
    this.eventsHandlers.push(handler)
  }

  unsubscribeFromEvent(handler) {
    this.eventsHandlers = this.eventsHandlers.filter((item) => {
      if (item !== handler) {
        return item
      }
    })
  }

  _fireRouteChangedEvent(contentProvider, link) {
    this.eventsHandlers.forEach((handler) => handler(contentProvider, link))
  }

  _onRouteChange() {
    const currentPath = window.location.hash
      ? window.location.hash.slice(1)
      : '/'

    let foundRoute = this.routes.find(
      (route) => currentPath.match(this._pathToRegex(route.path)) !== null
    )

    if (!foundRoute && this.routes.length > 0) {
      foundRoute = this.routes[0]
    }

    if (!foundRoute) {
      return
    }

    this._fireRouteChangedEvent(foundRoute.contentProvider, foundRoute.link)
  }

  _pathToRegex(path) {
    return new RegExp(
      `^${path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)')}$`
    )
  }
}
