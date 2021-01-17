import {
  getClosestParentElement,
  getHeightFromViewportHeight,
  getWidthFromViewportWidth,
} from '../../utils'

import '../closeButton/style.css'
import './style.css'

const BIG_SCREEN_BREAKPOINT = 1280
const MEDIUM_SCREEN_BREAKPOINT = 980
const SMALL_SCREEN_BREAKPOINT = 768

export default class CardPreview {
  constructor(cardElement, previewContent = null, options = {}) {
    this.options = {
      previewWidth: '65vw',
      previewHeight: '90vh',
      ...options,
    }

    this.cardElement = cardElement
    this.previewContent = previewContent
    this.cardElementClone = cardElement.cloneNode(true)

    this.previewVisibleClassName = 'is-expanded'
    this.modalOpenClass = 'modal-open'
    this.previewOverlayClassName = 'card-preview__overlay'
    this.closeButtonContainerClassName = 'close-button-container'
    this.closeButtonClassName = 'close-button'

    this._hidePreview = this._hidePreview.bind(this)
    this._handleWindowResize = this._handleWindowResize.bind(this)

    this._setPreviewSize()
    this._bindEvents()
    this._initCardInitialPosition()
    this._setCardElementCloneInitialPosition()
    this._addCardElementCloneToPage()
    this._addOverlay()

    this.cardElementClone.classList.add(this.previewVisibleClassName)
  }

  async showCardPreview() {
    document.querySelector('body').classList.add(this.modalOpenClass)

    if (this.previewContent) {
      this._hideOriginalCardContent().then(() =>
        this._removeOriginalCardContent()
      )
    }

    await this._moveAndResizeCardElementClone(
      '50%',
      '50%',
      this.previewWidth,
      this.previewHeight
    )

    this._addCloseButton()

    if (this.previewContent) {
      if (typeof this.previewContent === 'string') {
        this.cardElementClone.insertAdjacentHTML(
          'afterbegin',
          this.previewContent
        )
      } else {
        this.cardElementClone.insertAdjacentElement(
          'afterbegin',
          this.previewContent
        )
      }
    }

    this._bindClickOutsidePreviewEvent()
  }

  _bindEvents() {
    window.addEventListener('resize', this._handleWindowResize)
  }

  _unbindEvents() {
    window.removeEventListener('resize', this._handleWindowResize)
  }

  _handleWindowResize() {
    this._initCardInitialPosition()
    this._setPreviewSize()

    this._moveAndResizeCardElementClone(
      '50%',
      '50%',
      this.previewWidth,
      this.previewHeight
    )
  }

  _setPreviewSize() {
    this.previewWidth = this.options.previewWidth
    this.previewHeight = this.options.previewHeight

    if (window.innerWidth <= BIG_SCREEN_BREAKPOINT) {
      this.previewWidth = '80vw'
    }

    if (window.innerWidth <= MEDIUM_SCREEN_BREAKPOINT) {
      this.previewWidth = '90vw'
    }

    if (window.innerWidth <= SMALL_SCREEN_BREAKPOINT) {
      this.previewWidth = '100vw'
      this.previewHeight = '100vh'
    }
  }

  _initCardInitialPosition() {
    const {
      top,
      left,
      width,
      height,
    } = this.cardElement.getBoundingClientRect()

    this.cardInitialTopPosition = top
    this.cardInitialLeftPosition = left
    this.cardInitialWidth = width
    this.cardInitialHeight = height
  }

  _setCardElementCloneInitialPosition() {
    this.cardElementClone.style.position = 'fixed'
    this.cardElementClone.style.top = `${this.cardInitialTopPosition}px`
    this.cardElementClone.style.left = `${this.cardInitialLeftPosition}px`
    this.cardElementClone.style.width = `${this.cardInitialWidth}px`
    this.cardElementClone.style.height = `${this.cardInitialHeight}px`
  }

  _addCardElementCloneToPage() {
    this.cardElement.style.opacity = 0

    this.cardElement.parentNode.appendChild(this.cardElementClone)
  }

  _addCloseButton() {
    this.closeButton = document.createElement('button')
    this.closeButton.className = this.closeButtonClassName

    const wrapper = document.createElement('div')
    wrapper.className = this.closeButtonContainerClassName

    wrapper.style = `
        position: absolute;
        right: 30px;
        top: 30px;
        z-index: 999;
    `

    this.closeButton.addEventListener('click', this._hidePreview)

    wrapper.appendChild(this.closeButton)
    this.cardElementClone.appendChild(wrapper)
  }

  _addOverlay() {
    this.overlayElement = document.createElement('div')
    this.overlayElement.className = this.previewOverlayClassName

    document.querySelector('body').appendChild(this.overlayElement)

    requestAnimationFrame(() => {
      this.overlayElement.style.opacity = 1
    })
  }

  _isCloseButtonClicked(element) {
    return element.classList.contains(this.closeButtonClassName)
  }

  async _hidePreview(e) {
    if (
      getClosestParentElement(e.target, `.${this.previewVisibleClassName}`) &&
      !this._isCloseButtonClicked(e.target)
    ) {
      return
    }

    this.closeButton.remove()

    requestAnimationFrame(() => {
      this.overlayElement.style.opacity = 0
    })

    setTimeout(() => this.overlayElement.remove(), 300)

    await this._moveAndResizeCardElementClone(
      `${this.cardInitialTopPosition}px`,
      `${this.cardInitialLeftPosition}px`,
      `${this.cardInitialWidth}px`,
      `${this.cardInitialHeight}px`
    )

    this.cardElement.style.removeProperty('opacity')

    this.cardElementClone.remove()

    document.querySelector('body').classList.remove(this.modalOpenClass)

    this._unbindClickOutsidePreviewEvent()
    this._unbindEvents()
  }

  _bindClickOutsidePreviewEvent() {
    document.querySelector('body').addEventListener('click', this._hidePreview)
  }

  _unbindClickOutsidePreviewEvent() {
    document
      .querySelector('body')
      .removeEventListener('click', this._hidePreview)
  }

  _moveAndResizeCardElementClone(
    topPosition,
    leftPosition,
    width,
    height,
    duration = 350
  ) {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        this.cardElementClone.style.transition = `
          width ${duration}ms ease-in-out,
          height ${duration}ms ease-in-out,
          left ${duration}ms ease-in-out,
          top ${duration}ms ease-in-out
        `

        let top = topPosition
        let left = leftPosition

        if (topPosition === '50%') {
          top = this._calculateTopCenterPosition(height)
        }

        if (leftPosition === '50%') {
          left = this._calculateLeftCenterPosition(width)
        }

        requestAnimationFrame(() => {
          this.cardElementClone.style.top = top
          this.cardElementClone.style.left = left
          this.cardElementClone.style.width = width
          this.cardElementClone.style.height = height
        })
      })

      setTimeout(resolve, duration)
    })
  }

  _calculateTopCenterPosition(previewCardHeight) {
    const height = getHeightFromViewportHeight(parseInt(previewCardHeight))

    return `calc(50% - ${height / 2}px)`
  }

  _calculateLeftCenterPosition(previewCardWidth) {
    const width = getWidthFromViewportWidth(parseInt(previewCardWidth))

    return `calc(50% - ${width / 2}px)`
  }

  _hideOriginalCardContent(duration = 300) {
    return new Promise((resolve) => {
      ;[...this.cardElementClone.children].forEach((child) => {
        requestAnimationFrame(() => {
          child.style.transition = `opacity ${duration}ms linear`
          child.style.opacity = 0
        })
      })

      setTimeout(resolve, duration)
    })
  }

  _removeOriginalCardContent() {
    ;[...this.cardElementClone.children].forEach(
      (child) => (child.style.display = 'none')
    )
  }
}
