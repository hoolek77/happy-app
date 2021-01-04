import View from '../../shared/view'

export default class NewsListView extends View {
  constructor() {
    super()
    this.setTitle('News')
  }

  getHeaderText() {
    return 'News'
  }

  async getContent() {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms))
    await delay(2000)
    return `
        <p>News content loaded</p>
    `
  }
}
