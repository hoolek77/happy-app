import ContentProvider from '../../shared/contentProvider'

export default class NewsContentProvider extends ContentProvider {
  constructor(api, view) {
    super(api, view)
  }

  getTitle() {
    return 'News'
  }

  getHeaderText() {
    return 'News'
  }

  async getContent() {
    // to simulate long running operation
    const delay = (ms) => new Promise((res) => setTimeout(res, ms))
    await delay(2000)
    const data = {} // data fetch from api

    return this.view.render(data)
  }
}
