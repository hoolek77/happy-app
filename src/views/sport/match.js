export default class Match {
  constructor({
    match_id,
    status_code,
    status,
    match_start,
    minute,
    league_id,
    season_id,
    stag,
    group,
    round,
    referee_id,
    home_team,
    away_team,
    stats,
    venue,
  }) {
    this.matchId = match_id
    this.statusCode = status_code
    this.status = status
    this.matchStart = match_start
    this.minute = minute
    this.leagueId = league_id
    this.seasonId = season_id
    this.stag = stag
    this.group = group
    this.round = round
    this.refereeId = referee_id
    this.homeTeam = home_team
    this.awayTeam = away_team
    this.stats = stats
    this.venue = venue
  }
}
