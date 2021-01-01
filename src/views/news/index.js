import View from '../view'

export default class NewsListView extends View {
  constructor() {
    super()
    this.setTitle('News')
  }

  async getContent() {
    return `
        <h1>News</h1>
        <p>News content loading...</p>
    `
  }
}
