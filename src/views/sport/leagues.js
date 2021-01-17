import League from './league'

import supportedLeague from './supportedSportLeague.json'

export default class Leagues {
  constructor() {
    this.leagues = supportedLeague.map((league) => new League(league))
  }
}
