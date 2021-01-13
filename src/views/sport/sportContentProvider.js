import ContentProvider from '../../shared/contentProvider'

import CountryList from './countryList'
import Country from './country'

import LeagueList from './leagueList'
import League from './leagues'

import SeasonList from './seasonList'
import Season from './season'

import MatchesList from './matchesList'
import Match from './match'

export class SportContentProvider extends ContentProvider {
  constructor(api, view) {
    super(api, view)

    this.countryListModel = new CountryList()
    this.leagueListModel = new LeagueList()
    this.seasonListModel = new SeasonList()
    this.matchesListModel = new MatchesList()
  }

  getTitle() {
    return 'Sport'
  }

  getHeaderText() {
    return 'Sport'
  }

  async getContent() {
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

      let { data: leagues = [] } = await this.api.fetch(
        'leagues',
        'country_id',
        '9'
      )

      const leaguesArray = []
      for (const league of Object.values(leagues)) {
        leaguesArray.push(league)
      }

      let { data: seasons = [] } = await this.api.fetch(
        'seasons',
        'league_id',
        '168'
      )

      const seasonsArray = []
      for (const season of Object.values(seasons)) {
        seasonsArray.push(season)
      }

      let { data: matches = [] } = await this.api.fetch(
        'matches',
        'season_id',
        '352',
        'date_from',
        '2020-09-12',
        'date_to',
        '2020-09-13'
      )

      const matchesArray = []
      for (const match of Object.values(matches)) {
        matchesArray.push(match)
      }

      if (countries) {
        countriesArray.shift()
        this.countryListModel.addCountry(
          countriesArray.map((item) => new Country(item))
        )
        this.leagueListModel.addLeague(
          leaguesArray.map((item) => new League(item))
        )
        this.seasonListModel.addSeason(
          seasonsArray.map((item) => new Season(item))
        )
        this.matchesListModel.addMatch(
          matchesArray.map((item) => new Match(item))
        )

        return this.view.render(
          this.countryListModel,
          this.leagueListModel,
          this.seasonListModel,
          this.matchesListModel
        )
      }
    } catch (err) {
      console.log(err)
    }

    return ''
  }
}
