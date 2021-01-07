import ContentProvider from '../../shared/contentProvider'

import CountryList from './countryList'
import Country from './country'

import LeagueList from './leagueList'
import League from './leagues'

import TeamsList from './teamsList'
import Team from './team'

export default class SportContentProvider extends ContentProvider {
  constructor(api, view) {
    super(api, view)

    this.countryListModel = new CountryList()
    this.leagueListModel = new LeagueList()
    this.teamsListModel = new TeamsList()
  }

  getTitle() {
    return 'Sport'
  }

  getHeaderText() {
    return 'Sport'
  }

  async getContent() {
    // delete push push
    try {
      let { data: country = [] } = await this.api.fetch(
        'countries',
        'continent',
        'Europe'
      )

      let d = []
      let e = []
      for (const [a, b] of Object.entries(country)) {
        d.push(b)
      }
      d.forEach((element) => {
        e.push(element)
      })

      let { data: teams = [] } = await this.api.fetch(
        'teams',
        'country_id',
        '48'
      )

      let f = []
      let g = []
      for (const [a, b] of Object.entries(teams)) {
        f.push(b)
      }
      f.forEach((element) => {
        if (g.length < 20) {
          g.push(element)
        }
      })

      let { data: league = [] } = await this.api.fetch(
        'leagues',
        'country_id',
        '48'
      )

      let h = []
      let j = []
      for (const [a, b] of Object.entries(league)) {
        h.push(b)
      }
      h.forEach((element) => {
        j.push(element)
      })

      if (country) {
        this.countryListModel.addCountry(e.map((item) => new Country(item)))
        this.leagueListModel.addLeague(j.map((item) => new League(item)))
        this.teamsListModel.addTeam(g.map((item) => new Team(item)))

        return this.view.render(
          this.countryListModel,
          this.leagueListModel,
          this.teamsListModel
        )
      }
    } catch (err) {
      console.log(err)
    }

    return ''
  }
}
