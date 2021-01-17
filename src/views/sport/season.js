export default class Season {
  constructor({
    season_id,
    name,
    is_current,
    country_id,
    league_id,
    start_date,
    end_date,
  }) {
    this.seasonId = season_id
    this.name = name
    this.isCurrent = is_current
    this.countryId = country_id
    this.leagueID = league_id
    this.startDate = start_date
    this.endDate = end_date
  }
}
