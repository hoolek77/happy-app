import View from '../../shared/view'
import CardPreview from '../../shared/cardPreview'

import { SPORT_API } from '../../environment'
import { SportAPI } from './index'
import { MatchInfoContentProvider } from './matchInfoContentProvider'
import { MatchInfoView } from './matchInfoView'

import './sport.css'

const sportApi = new SportAPI(SPORT_API.API_BASE_URL, SPORT_API.API_KEY)

export class MatchView extends View {
  render(matches) {
    console.log(matches)
    const matchesElement = document.querySelector('.matches')
    matchesElement.innerHTML = ''
    matches.matches.forEach((matchItem) => {
      const listItem = this.createMatchItem(matchItem)
      listItem.addEventListener('click', this.handleMatchItemClick.bind(this))
      matchesElement.appendChild(listItem)
    })
  }

  createMatchItem(match) {
    const { awayTeam, homeTeam, stats, matchId } = match

    const listItem = document.createElement('li')
    listItem.addEventListener('click', this.handleMatchItemClick.bind(this))
    listItem.className = 'match__item'
    listItem.dataset.id = matchId
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

  async handleMatchItemClick(e) {
    const matchItemElement = e.currentTarget
    const matchItemId = matchItemElement.dataset.id

    const match = new MatchInfoContentProvider(
      sportApi,
      new MatchInfoView(),
      matchItemId
    )

    setTimeout(async () => {
      let viewContent = await match.getContent()
      const cardPreview = new CardPreview(matchItemElement, viewContent)
      cardPreview.showCardPreview()
    })
  }
}
