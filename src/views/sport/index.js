import View from '../../shared/view'

export default class SportView extends View {
  constructor() {
    super()
    this.setTitle('Sport')
  }

  getHeaderText() {
    return 'Sport'
  }

  async getContent() {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms))
    await delay(2000)
    return `
        <p>Sport content loaded</p>
    `
  }
}
