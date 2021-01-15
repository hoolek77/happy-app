import View from '../../shared/view'
import CardPreview from '../../shared/cardPreview'

import './sport.css'

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

  async handleMatchItemClick(e) {
    const matchItemElement = e.currentTarget
    const matchItemId = matchItemElement.dataset.id

    const previewContent = '123'

    const cardPreview = new CardPreview(matchItemElement, previewContent)
    cardPreview.showCardPreview()
  }
}
