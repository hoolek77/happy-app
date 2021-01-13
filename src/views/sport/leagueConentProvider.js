import ContentProvider from '../../shared/contentProvider'

import LeagueList from './leagueList'
import League from './leagues'

export class LeagueContentProvider extends ContentProvider {
  constructor(api, view, countryId) {
    super(api, view)

    this.countryId = countryId

    this.leagueListModel = new LeagueList()
  }

  async getContent() {
    try {
      let { data: leagues = [] } = await this.api.fetch(
        'leagues',
        'country_id',
        `${this.countryId}`
      )
      const leaguesArray = []
      for (const league of Object.values(leagues)) {
        leaguesArray.push(league)
      }
      const firstItem = {
        name: 'choose league',
      }
      leaguesArray.unshift(firstItem)

      if (leagues) {
        this.leagueListModel.addLeague(
          leaguesArray.map((item) => new League(item))
        )

        return this.view.render(this.leagueListModel)
      }
    } catch (err) {
      console.log(err)
    }

    return ''
  }
}
