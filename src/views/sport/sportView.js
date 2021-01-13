import View from '../../shared/view'

import './sport.css'
import { SPORT_API } from '../../environment'
import { LeagueContentProvider } from './leagueConentProvider'
import { SeasonContentProvider } from './seasonContentProvider'
import { LeagueView } from './leagueView'
import { SeasonView } from './seasonView'
import { SportAPI } from './index'

export class SportView extends View {
  render(countries, leagues, seasons, matches) {
    const div = document.createElement('div')
    const selectCountryElement = document.createElement('select')
    const selectLeagueElement = document.createElement('select')
    const selectSeasonElement = document.createElement('select')
    const showTeams = document.createElement('button')
    const ulElement = document.createElement('ul')
    showTeams.addEventListener('click', this.handleMatchClick)
    showTeams.className = 'btnSport'
    showTeams.innerText = 'Show teams'

    document.addEventListener('input', this.leagueChange.bind(this), false)
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
      listItem.addEventListener('click', this.handleMatchClick.bind(this))
      ulElement.appendChild(listItem)
    })

    div.appendChild(selectCountryElement)
    div.appendChild(selectLeagueElement)
    div.appendChild(selectSeasonElement)
    div.appendChild(showTeams)
    div.appendChild(ulElement)

    return div.outerHTML
  }

  leagueChange(e) {
    if (e.target.className !== 'country') return
    const name = e.target.value
    const seasonList = document.querySelector('.season')
    seasonList.innerHTML = ''
    const selectedCountry = document.querySelector(
      `option[data-country-name="${name}"]`
    )
    const selectedCountryId = selectedCountry.dataset.id
    const leagueApi = new SportAPI(SPORT_API.API_BASE_URL, SPORT_API.API_KEY)
    const leagues = new LeagueContentProvider(
      leagueApi,
      new LeagueView(),
      selectedCountryId
    )
    const mainContentAppearAnimationClassName = 'appear-animation'
    const spinnerDiv = document.querySelector('.sportSpinner')
    setTimeout(async () => {
      let viewContent = await leagues.getContent()
    }, 0)
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
    listItem.dataset.id = seasonId
    listItem.dataset.seasonName = name

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

  handleMatchClick(e) {
    console.log('123')
  }
}
