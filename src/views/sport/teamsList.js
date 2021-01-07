export default class TeamsList {
  constructor() {
    this.teams = []
  }

  addTeam(teams) {
    this.teams.push(...teams)
  }
}
