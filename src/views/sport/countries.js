import Country from './country'

import supportedCountries from './supportedSportCountries.json'

export default class Countries {
  constructor() {
    this.countries = supportedCountries.map((country) => new Country(country))
  }
}
