import NewsCountry from './newsCountry'

import supportedCountries from './supportedNewsCountries.json'

export default class NewsCountries {
  constructor() {
    this.countries = supportedCountries
      .map((country) => new NewsCountry(country))
      .sort((c1, c2) => {
        const name1 = c1.countryName.toUpperCase()
        const name2 = c2.countryName.toUpperCase()

        if (name1 < name2) {
          return -1
        }

        if (name1 > name2) {
          return 1
        }

        return 0
      })
  }
}
