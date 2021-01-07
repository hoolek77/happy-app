export default class CountryList {
  constructor() {
    this.country = []
  }

  addCountry(country) {
    this.country.push(...country)
  }
}
