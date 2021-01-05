import './style.css'

export default class View {
  constructor() {}

  setTitle(title) {
    document.title = title
  }

  getSpinner() {
    return `
    <div class="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    `
  }

  getHeaderText() {
    return ''
  }

  async getContent() {
    return ''
  }
}
