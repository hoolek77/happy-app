import ContentProvider from '../../shared/contentProvider'

export default class HomeContentProvider extends ContentProvider {
  constructor() {
    super(null, null)
  }

  getTitle() {
    return 'Happy App'
  }

  getHeaderText() {
    return ''
  }

  async getContent() {
    return ''
  }
}
