import API from '../../utils/api.js'
import { WeatherContentProvider } from './weatherContentProvider.js'
import { WEATHER_API } from '../../environment.js'

export class WeatherApi extends API {
  constructor() {
    super(WEATHER_API.API_BASE_URL, WEATHER_API.API_KEY)
  }

  weatherContentProvider = new WeatherContentProvider()

  async fetch(query) {
    try {
      const response = await fetch(
        `${this.baseUrl}q=${query}&units=metric&appid=${this.apiKey}`
      )

      if (response.ok) {
        const data = await response.json()

        this.weatherContentProvider.displayResults(data)
      } else {
        this.showError()
      }
    } catch (err) {
      console.log(err)
    }
  }

  fetchLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const response = await fetch(
            `${this.baseUrl}lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${this.apiKey}`
          )
          const data = await response.json()
          this.weatherContentProvider.displayResults(data)
        } catch (err) {
          console.log(err)
        }
      })
    } else {
      console.log('geolocation not supported')
    }
  }

  showError() {
    const errorPopUp = document.querySelector('.popup')
    const closeBtn = document.querySelector('.close-btn')
    const overlay = document.querySelector('.overlay')
    errorPopUp.classList.add('active')
    closeBtn.addEventListener('click', () => {
      errorPopUp.classList.remove('active')
    })
    overlay.addEventListener('click', () => {
      errorPopUp.classList.remove('active')
    })
  }
}
