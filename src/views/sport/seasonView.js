import View from '../../shared/view'

import './sport.css'

export class SeasonView extends View {
  render(seasons) {
    const selectSeasonsElement = document.querySelector('.season')
    selectSeasonsElement.innerHTML = ''
    seasons.seasons.forEach((seasonsItem) => {
      const listItem = this.createSeasonListItem(seasonsItem)
      selectSeasonsElement.appendChild(listItem)
    })
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
}
