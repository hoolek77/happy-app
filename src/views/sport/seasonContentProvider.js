import ContentProvider from '../../shared/contentProvider'

import SeasonList from './seasonList'
import Season from './season'

export class SeasonContentProvider extends ContentProvider {
  constructor(api, view, leagueId) {
    super(api, view)

    this.leagueId = leagueId

    this.seasonListModel = new SeasonList()
  }

  async getContent() {
    try {
      let { data: seasons = [] } = await this.api.fetch(
        'seasons',
        'league_id',
        `${this.leagueId}`
      )
      const seasonsArray = []
      for (const season of Object.values(seasons)) {
        seasonsArray.push(season)
      }
      seasonsArray.unshift({ name: 'Wybierz' })

      if (seasons) {
        this.seasonListModel.addSeason(
          seasonsArray.map((item) => new Season(item))
        )

        return this.view.render(this.seasonListModel)
      }
    } catch (err) {
      console.log(err)
    }

    return ''
  }
}
