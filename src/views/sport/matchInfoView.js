import View from '../../shared/view'

import './sport.css'

export class MatchInfoView extends View {
  render(match) {
    console.log(match)
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
    if (match.status !== 'notstarted') {
      console.log(match.status)
      const homeEvents = []
      const awayEvents = []
      let score = ''
      if (match_events) {
        score = stats.ft_score
        match_events.forEach((element) => {
          if (element.team_id === home_team.team_id) {
            homeEvents.push(`${element.minute} - ${element.type}`)
          } else {
            awayEvents.push(`${element.minute} - ${element.type}`)
          }
        })
      } else {
        score = '0-0'
      }

      const html = `
    <header class="matchInfo__header">
    <div class='firstTeam'>
      <img class="match__img" src="${home_team.logo}" alt="">
      <span class"match__title">${home_team.name}</span>
    </div>
    <div class='match__score'>
      ${score}
    </div>
    <div class ='secondTeam'>
      <img class="match__img" src="${away_team.logo}" alt="">
      <span class"match__title">${away_team.name}</span>
    </div>
    <div></div>
    <div class="matchInfo__detail">
        <div></div>      
        <div class='matchStartDiv'><span class='matchStart'>${match_start}</span></div>
        <div></div>
        <div>${match_statistics[0].possessionpercent}</div>
        <div>Possession</div>
        <div>${match_statistics[1].possessionpercent}</div>
        <div>${match_statistics[0].shots_total}</div>
        <div>Shots</div>
        <div>${match_statistics[1].shots_total}</div>
        <div>${match_statistics[0].shots_on_target}</div>
        <div>Shots on Target</div>
        <div>${match_statistics[1].shots_on_target}</div>
        <div>${match_statistics[0].corners}</div>
        <div>Corners</div>
        <div>${match_statistics[1].corners}</div>
        <div>${match_statistics[0].fouls}</div>
        <div>Fouls</div>
        <div>${match_statistics[1].fouls}</div>
    </div>
    <div></div>
    </header>
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
}
