import './style.css'

const errorContainerClassName = 'error__container'
const errorMessageClassName = 'error__message'

export default class View {
  constructor() {}

  render(data) {
    return ''
  }

  renderError(errorMessage) {
    const wrapper = document.createElement('div')
    wrapper.className = errorContainerClassName

    const pElement = document.createElement('p')
    pElement.className = errorMessageClassName
    pElement.textContent = errorMessage

    wrapper.appendChild(pElement)

    return wrapper
  }
}
