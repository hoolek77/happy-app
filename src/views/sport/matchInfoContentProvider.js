import ContentProvider from '../../shared/contentProvider'

import MatchInfo from './matchInfo'
import MatchInfoList from './matchInfoList'

export class MatchInfoContentProvider extends ContentProvider {
  constructor(api, view, matchId) {
    super(api, view)
    this.matchId = matchId

    this.matchInfoListModel = new MatchInfoList()
  }

  async getContent() {
    try {
      let { data: match = [] } = await this.api.fetch(`matches/${this.matchId}`)

      return this.view.render(match)
    } catch (err) {
      console.log(err)
    }

    return ''
  }
}
