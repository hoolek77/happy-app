import View from '../../shared/view'

export default class HomeView extends View {
  constructor() {
    super()
    this.setTitle('Happy App')
  }

  getHeaderText() {
    return ''
  }

  async getContent() {
    return ''
  }
}
