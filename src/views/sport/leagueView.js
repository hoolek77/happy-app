import View from '../../shared/view'

import './sport.css'

export class LeagueView extends View {
  render(leagues) {
    const selectLeagueElement = document.querySelector('.league')
    selectLeagueElement.innerHTML = ''
    leagues.leagues.forEach((countryItem) => {
      const listItem = this.createListItem(countryItem)
      selectLeagueElement.appendChild(listItem)
    })
  }

  createListItem(countryData) {
    const { countryId, name, countryCode, continent } = countryData

    const listItem = document.createElement('option')
    listItem.className = 'country__item'
    listItem.dataset.id = countryId
    listItem.dataset.countryName = name

    const html = `${name}`

    listItem.innerHTML = html

    return listItem
  }
}
