import View from '../../shared/view'

import './sport.css'
import { SPORT_API } from '../../environment'
import { SeasonContentProvider } from './seasonContentProvider'
import { MatchContentProvider } from './matchContentProvider'
import { SeasonView } from './seasonView'
import { SportAPI } from './index'
import { MatchView } from './matchView'

export class SportView extends View {
  render(countries, leagues, seasons, matches) {
    const div = document.createElement('div')
    const selectCountryElement = document.createElement('select')
    const selectLeagueElement = document.createElement('select')
    const selectSeasonElement = document.createElement('select')
    const showTeams = document.createElement('button')
    const ulElement = document.createElement('ul')
    showTeams.addEventListener('click', this.handleMatchClick.bind(this), false)
    showTeams.className = 'btnSport'
    showTeams.innerText = 'Show teams'

    document.addEventListener('input', this.seasonsChange.bind(this), false)

    selectCountryElement.className = 'country'
    countries.countries.forEach((countryItem) => {
      const listItem = this.createCountryListItem(countryItem)
      selectCountryElement.appendChild(listItem)
    })

    selectLeagueElement.className = 'league'
    leagues.leagues.forEach((countryItem) => {
      const listItem = this.createLeagueListItem(countryItem)
      selectLeagueElement.appendChild(listItem)
    })

    selectSeasonElement.className = 'season'
    seasons.seasons.forEach((season) => {
      const seasonItem = this.createSeasonListItem(season)
      selectSeasonElement.appendChild(seasonItem)
    })
    ulElement.className = 'matches'
    matches.matches.forEach((matchItem) => {
      const listItem = this.createMatchItem(matchItem)
      ulElement.appendChild(listItem)
    })

    div.appendChild(selectCountryElement)
    div.appendChild(selectLeagueElement)
    div.appendChild(selectSeasonElement)
    div.appendChild(showTeams)
    div.appendChild(ulElement)

    return div
  }

  seasonsChange(e) {
    if (e.target.className !== 'league') return
    const name = e.target.value
    const selectedLeague = document.querySelector(
      `option[data-league-name="${name}"]`
    )

    const selectedLeagueId = selectedLeague.dataset.id
    const seasonApi = new SportAPI(SPORT_API.API_BASE_URL, SPORT_API.API_KEY)
    const seasons = new SeasonContentProvider(
      seasonApi,
      new SeasonView(),
      selectedLeagueId
    )
    setTimeout(async () => {
      let viewContent = await seasons.getContent()
    })
  }

  handleMatchClick(e) {
    const season = document.querySelector('.season').value
    const seasonSelected = document.querySelector(
      `option[data-season-name="${season}"]`
    )

    const seasonId = seasonSelected.dataset.seasonId
    const startDate = seasonSelected.dataset.seasonStart
    const endDate = seasonSelected.dataset.seasonEnd
    console.log(seasonSelected)
    const matchApi = new SportAPI(SPORT_API.API_BASE_URL, SPORT_API.API_KEY)
    const match = new MatchContentProvider(
      matchApi,
      new MatchView(),
      seasonId,
      startDate,
      endDate
    )
    setTimeout(async () => {
      let viewContent = await match.getContent()
    })
  }

  createCountryListItem(countryData) {
    const { countryId, name, countryCode, continent } = countryData

    const listItem = document.createElement('option')
    listItem.className = 'country__item'
    listItem.dataset.id = countryId
    listItem.dataset.countryName = name

    const html = `${name}`

    listItem.innerHTML = html

    return listItem
  }
  createLeagueListItem(countryData) {
    const { leagueId, name, countryCode, continent } = countryData

    const listItem = document.createElement('option')
    listItem.className = 'league__item'
    listItem.dataset.id = leagueId
    listItem.dataset.leagueName = name

    const html = `${name}`

    listItem.innerHTML = html

    return listItem
  }
  createSeasonListItem(seasonData) {
    const {
      seasonId,
      name,
      isCurrent,
      countryId,
      leagueId,
      startDate,
      endDate,
    } = seasonData

    const listItem = document.createElement('option')
    listItem.className = 'season__item'
    listItem.dataset.seasonId = seasonId
    listItem.dataset.seasonName = name
    listItem.dataset.seasonStart = startDate
    listItem.dataset.seasonEnd = endDate

    const html = `${name}`

    listItem.innerHTML = html

    return listItem
  }

  createMatchItem(match) {
    const { awayTeam, homeTeam, stats } = match

    const listItem = document.createElement('li')
    listItem.className = 'match__item'
    const html = `
      <header class="match__header">
      <div class='firstTeam'>
        <img class="match__img" src="${homeTeam.logo}" alt="">
        <span class"match__title">${homeTeam.name}</span>
        </div>
        <div class='match__score'>
        VS
        <br>
        ${stats.home_score} - ${stats.away_score}
        </div>
        <div class ='secondTeam'>
        <img class="match__img" src="${awayTeam.logo}" alt="">
        <span class"match__title">${awayTeam.name}</span>
        </div>
      </header>
    `

    listItem.innerHTML = html
    return listItem
  }
}
