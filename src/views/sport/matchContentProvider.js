import ContentProvider from '../../shared/contentProvider'

import MatchesList from './matchesList'
import Match from './match'

export class MatchContentProvider extends ContentProvider {
  constructor(api, view, seasonId, dataStart, dataEnd) {
    super(api, view)

    this.seasonId = seasonId
    this.dataStart = dataStart
    this.dataEnd = dataEnd

    this.matchesListModel = new MatchesList()
  }

  async getContent() {
    try {
      let { data: matches = [] } = await this.api.fetch(
        'matches',
        'season_id',
        this.seasonId,
        'date_from',
        this.dataStart,
        'date_to',
        this.dataEnd
      )

      const matchesArray = []
      for (const match of Object.values(matches)) {
        matchesArray.push(match)
      }
      this.matchesListModel.addMatch(
        matchesArray.reverse().map((item) => new Match(item))
      )

      return this.view.render(this.matchesListModel)
    } catch (err) {
      return this.view.renderError('Sport data could not be fetched.')
    }

    return ''
  }
}
