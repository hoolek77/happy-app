import View from '../../shared/view'

import './sport.css'

export class LeagueView extends View {
  render(leagues) {
    const selectLeagueElement = document.querySelector('.league')
    selectLeagueElement.innerHTML = ''
    leagues.leagues.forEach((countryItem) => {
      const listItem = this.createLeagueListItem(countryItem)
      selectLeagueElement.appendChild(listItem)
    })
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
}
