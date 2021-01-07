export default class LeagueList {
  constructor() {
    this.league = []
  }

  addLeague(league) {
    this.league.push(...league)
  }
}
