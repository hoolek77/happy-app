import { svgWeather } from './svgWeather.js'
import { WeatherApi } from './weatherApi.js'
import { Carousel } from './slider.js'
import './weather.css'
import ContentProvider from '../../shared/contentProvider/index.js'

export class WeatherContentProvider extends ContentProvider {
  constructor() {
    super()
  }

  getTitle() {
    return 'Weather'
  }

  getHeaderText() {
    return 'Weather'
  }

  displayResults(weather) {
    const city = document.querySelectorAll('.location .city')
    city.forEach((element) => {
      element.innerText = `${weather.city.name}, ${weather.city.country}`
    })

    const temp = document.querySelector('.current-weather .temp')
    temp.innerText = `${weather.list[0].main.temp.toFixed(1)} °C`

    const weatherStatus = document.querySelector('.current-weather .weather')
    weatherStatus.innerText = weather.list[0].weather[0].main

    const weatherIcon = document.querySelector('.current-weather .weather-icon')

    switch (weather.list[0].weather[0].main) {
      case 'Clouds':
        weatherIcon.innerHTML = svgWeather.svgWeatherClouds
        break
      case 'Rain':
        weatherIcon.innerHTML = svgWeather.svgWeatherRain
        break
      case 'Clear':
        if (weather.list[0].sys.pod === 'n') {
          weatherIcon.innerHTML = svgWeather.svgWeatherClearNight
        } else {
          weatherIcon.innerHTML = svgWeather.svgWeatherClear
        }
        break
      case 'Rain':
        weatherIcon.innerHTML = svgWeather.svgWeatherRain
        break
      case 'Snow':
        weatherIcon.innerHTML = svgWeather.svgWeatherSnow
        break
      case 'Storm':
        if (weather.list[0].sys.pod === 'n') {
          weatherIcon.innerHTML = svgWeather.svgWeatherStormNight
        } else {
          weatherIcon.innerHTML = svgWeather.svgWeatherStormDay
        }
        break
      default:
        weatherIcon.innerHTML = svgWeather.svgWeatherDefault
        break
    }

    const weatherIconTomorrow = document.querySelector(
      '.current-weather .weather-tomorrow-icon'
    )

    switch (weather.list[7].weather[0].main) {
      case 'Clouds':
        weatherIconTomorrow.innerHTML = svgWeather.svgWeatherClouds
        break
      case 'Rain':
        weatherIconTomorrow.innerHTML = svgWeather.svgWeatherRain
        break
      case 'Clear':
        if (weather.list[0].sys.pod === 'n') {
          weatherIconTomorrow.innerHTML = svgWeather.svgWeatherClearNight
        } else {
          weatherIconTomorrow.innerHTML = svgWeather.svgWeatherClear
        }
        break
      case 'Rain':
        weatherIconTomorrow.innerHTML = svgWeather.svgWeatherRain
        break
      case 'Snow':
        weatherIconTomorrow.innerHTML = svgWeather.svgWeatherSnow
        break
      case 'Storm':
        if (weather.list[0].sys.pod === 'n') {
          weatherIconTomorrow.innerHTML = svgWeather.svgWeatherStormNight
        } else {
          weatherIconTomorrow.innerHTML = svgWeather.svgWeatherStormDay
        }
        break
      default:
        weatherIconTomorrow.innerHTML = svgWeather.svgWeatherDefault
        break
    }

    const weatherPlusThree = document.querySelector('.weather-plus-three')
    weatherPlusThree.innerHTML = `
      <h2>In 3 hours:</h2>
      <div class="weather-plus-temp">${weather.list[1].main.temp.toFixed(
        1
      )}°C</div>
    `

    const weatherPlusSix = document.querySelector('.weather-plus-six')
    weatherPlusSix.innerHTML = `
      <h2>In 6 hours:</h2>
      <div class="weather-plus-temp">${weather.list[2].main.temp.toFixed(
        1
      )}°C</div>
    `

    const tempTomorrow = document.querySelector('.temp-tomorrow')
    tempTomorrow.innerText = `${weather.list[7].main.temp.toFixed(1)} °C`

    const weatherStatusTomorrow = document.querySelector(
      '.current-weather .weather-tomorrow'
    )
    weatherStatusTomorrow.innerText = weather.list[7].weather[0].main

    const weatherPlusThreeTomorrow = document.querySelector(
      '.weather-plus-three-tomorrow'
    )
    weatherPlusThreeTomorrow.innerHTML = `
      <h2>In 3 hours:</h2>
      <div class="weather-plus-temp">${weather.list[8].main.temp.toFixed(
        1
      )}°C</div>
    `

    const weatherPlusSixTomorrow = document.querySelector(
      '.weather-plus-six-tomorrow'
    )
    weatherPlusSixTomorrow.innerHTML = `
      <h2>In 6 hours:</h2>
      <div class="weather-plus-temp">${weather.list[9].main.temp.toFixed(
        1
      )}°C</div>
    `
  }

  async getContent() {
    setTimeout(() => {
      function setQuery(e) {
        if (e.keyCode == 13) {
          weatherApi.fetch(searchBox.value)
          searchBox.value = ''
        }
      }

      const searchBox = document.querySelector('.search-box')
      searchBox.addEventListener('keypress', setQuery)

      const carousel = new Carousel(
        document.querySelector('.left'),
        document.querySelector('.right'),
        document.querySelector('.slider-weather')
      )

      carousel.rightArrow.addEventListener('click', () => {
        carousel.rightArrowHandler()
        carousel.rightArrow.style.display = 'none'
        carousel.leftArrow.style.display = 'block'
      })
      carousel.leftArrow.addEventListener('click', () => {
        carousel.leftArrowHandler()
        carousel.rightArrow.style.display = 'block'
        carousel.leftArrow.style.display = 'none'
      })
    }, 0)

    const weatherApi = new WeatherApi()

    weatherApi.fetchLocation(weatherApi.baseUrl, weatherApi.apiKey)

    const html = `
        <div class="popup">
          <div class="overlay"></div>
          <div class="content">
            <div class="close-btn"">&times;</div>
            <h1>An error occurred</h1>
            <p>Check if you provided correct city name</p>
          </div>
        </div>
        <div class="container-weather">
          <div class="carousel-weather">
            <div class="slider-weather">
              <section class="current">
                <h2 class="weather-heading">Today's weather</h2>
                <div class="weather-container">
                  <div class="weather-left">
                    ${svgWeather.svgWeatherLeft}
                  </div>
                  <div class="weather-right">
                    <header class="weather-header">
                      <input type="text" placeholder="search for a city" class="search-box" />
                    </header>
                    <main>
                      <div class="weather-info">
                        <div class="location">
                          <div class="city"></div>
                        </div>
                        <div class="current-weather">
                          <div class="temp"></div>
                          <div class="weather"></div>
                          <div class="weather-icon"></div>
                        </div>
                        <div class="weather-in-next-hours">
                          <div class="weather-plus-three"></div>
                          <div class="weather-plus-six"></div>
                        </div>
                      </div>
                    </main>
                  </div>
                </div">
              </section>
              <section class="tomorrow">
                <h2 class="weather-heading">Tomorrow's weather</h2>
                <div class="weather-container">
                  <div class="weather-left tomorrow-svg">${svgWeather.svgWeatherRight}</div>
                  <div class="weather-right">
                    
                    <main>
                      <div class="weather-info">
                        <div class="location location-tomorrow">
                          <div class="city"></div>
                        </div>
                        <div class="current-weather">
                          <div class="temp temp-tomorrow"></div>
                          <div class="weather weather-tomorrow"></div>
                          <div class="weather-icon weather-tomorrow-icon"></div>
                        </div>
                        <div class="weather-in-next-hours">
                          <div class="weather-plus-three weather-plus-three-tomorrow"></div>
                          <div class="weather-plus-six weather-plus-six-tomorrow"></div>
                        </div>
                      </div>
                    </main>
                  </div>
                </div>
              </section>
            </div>
            <div class="controls">
              <span class="arrow left">
                <i class="fas fa-arrow-left"></i>
              </span>
              <span class="arrow right">
                <i class="fas fa-arrow-right"></i>
              </span>
            </div>
        </div>
    </div>
    `
    return html
  }
}
