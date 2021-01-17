export default class ContentProvider {
  constructor(api, view) {
    this.api = api
    this.view = view
  }

  setup() {}

  cleanUp() {}

  getTitle() {
    return ''
  }

  setDocumentTitle(title) {
    document.title = title
  }

  getHeaderText() {
    return ''
  }

  async getContent() {
    return ''
  }
}
