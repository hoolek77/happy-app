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
      let { data: countries = [] } = await this.api.fetch(
        'countries',
        'continent',
        'Europe'
      )

      const countriesArray = []
      for (const country of Object.values(countries)) {
        countriesArray.push(country)
      }

      let { data: teams = [] } = await this.api.fetch(
        'teams',
        'country_id',
        '48'
      )

      const teamsArray = []
      for (const team of Object.values(teams)) {
        if (teamsArray.length < 20) {
          teamsArray.push(team)
        }
      }

      let { data: leagues = [] } = await this.api.fetch(
        'leagues',
        'country_id',
        '48'
      )

      const leaguesArray = []
      for (const league of Object.values(leagues)) {
        leaguesArray.push(league)
      }

      if (countries) {
        this.countryListModel.addCountry(
          countriesArray.map((item) => new Country(item))
        )
        this.leagueListModel.addLeague(
          leaguesArray.map((item) => new League(item))
        )
        this.teamsListModel.addTeam(teamsArray.map((item) => new Team(item)))

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
