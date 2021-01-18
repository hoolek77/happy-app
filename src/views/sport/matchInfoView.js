import View from '../../shared/view'
import './sport.css'

const errorContainerClassName = 'error__container'
const errorMessageClassName = 'error__message'

export class MatchInfoView extends View {
  render(match) {
    const wrap = document.createElement('div')
    const matchInfo = this.createMatchInfo(match)
    wrap.innerHTML = matchInfo
    return wrap
  }

  matchStatistics(statistics) {
    return statistics
  }

  createMatchInfo(match) {
    const {
      home_team,
      stats,
      match_events,
      away_team,
      match_start,
      match_statistics,
    } = match
    const aTeamStatistics = []
    const bTeamStatistics = []

    if (match.status !== 'notstarted' && match_statistics) {
      aTeamStatistics.push(match_statistics[0])
      bTeamStatistics.push(match_statistics[1])
      const html = `
    <header class="matchInfo__header">
    <div class='firstTeam'>
      <img class="match__img" src="${home_team.logo}" alt="">
      <span class"match__title">${home_team.name}</span>
    </div>
    <div class='match__score'>
      ${stats.ft_score}
    </div>
    <div class ='secondTeam'>
      <img class="match__img" src="${away_team.logo}" alt="">
      <span class"match__title">${away_team.name}</span>
    </div>
    <div></div>
    <div class="matchInfo__detail">
        <div></div>      
        <div class='matchStartDiv'><span class='matchStart'>${
          match_start || 'no data'
        }</span></div>
        <div></div>
        <div>${aTeamStatistics[0].possessionpercent || 'no data'}</div>
        <div>Possession</div>
        <div>${bTeamStatistics[0].possessionpercent || 'no data'}</div>
        <div>${aTeamStatistics[0].shots_total || 'no data'}</div>
        <div>Shots</div>
        <div>${bTeamStatistics[0].shots_total || 'no data'}</div>
        <div>${aTeamStatistics[0].shots_on_target || 'no data'}</div>
        <div>Shots on Target</div>
        <div>${bTeamStatistics[0].shots_on_target || 'no data'}</div>
        <div>${aTeamStatistics[0].corners || 'no data'}</div>
        <div>Corners</div>
        <div>${bTeamStatistics[0].corners || 'no data'}</div>
        <div>${aTeamStatistics[0].fouls || 'no data'}</div>
        <div>Fouls</div>
        <div>${bTeamStatistics[0].fouls || 'no data'}</div>
    </div>
    <div></div>
    </header>
    `
      return html
    }
    if (match.status !== 'notstarted' && match.status && !match_statistics) {
      const html = `
      <header class="matchInfo__header">
      <div class='firstTeam'>
        <img class="match__img" src="${home_team.logo}" alt="">
        <span class"match__title">${home_team.name}</span>
      </div>
      <div class='match__score'>
      ${stats.ft_score}
      </div>
      <div class ='secondTeam'>
        <img class="match__img" src="${away_team.logo}" alt="">
        <span class"match__title">${away_team.name}</span>
      </div>
      <div></div>
      <div class="matchInfo__detail">
      <div></div>      
      <div class='matchStartDiv'>Started: <br><span class='matchStart'>${
        match_start || '0 - 0'
      }</span></div>
      <div></div>
      <div></div>      
      <div><h1>No data</h1></div>
      <div></div>
      </div>
      `
      return html
    } else {
      const html = `
      <header class="matchInfo__header">
      <div class='firstTeam'>
        <img class="match__img" src="${home_team.logo}" alt="">
        <span class"match__title">${home_team.name}</span>
      </div>
      <div class='match__score'>
        0 - 0
      </div>
      <div class ='secondTeam'>
        <img class="match__img" src="${away_team.logo}" alt="">
        <span class"match__title">${away_team.name}</span>
      </div>
      <div></div>
      <div class="matchInfo__detail">
      <div></div>      
      <div class='matchStartDiv'>Will start: <br><span class='matchStart'>${match_start}</span></div>
      <div></div>
      </div>
      `
      return html
    }
  }

  renderError(errorMessage) {
    const wrapper = document.createElement('div')
    wrapper.className = errorContainerClassName

    const pElement = document.createElement('p')
    pElement.className = errorMessageClassName
    pElement.textContent = errorMessage

    wrapper.appendChild(pElement)

    return wrapper
  }
}
