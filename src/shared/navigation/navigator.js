import HomeView from '../../views/home'

export default class Navigator {
  constructor(router) {
    this.router = router
    this.router.subscribeForEvent(this._onRouteChange.bind(this))

    this.headerElement = document.querySelector('.header')
    this.navElement = document.querySelector('.nav')
    this.navMenuButtonElement = this.navElement.querySelector(
      '.nav__menu-button'
    )
    this.navListElement = this.navElement.querySelector('.nav-list')
    this.linksList = document.querySelectorAll('.nav-list__link')
    this.homeNavItemElement = this.navElement.querySelector(
      '.nav-list__item--home'
    )
    this.mainViewElement = document.querySelector('.view')
    this.viewHeaderElement = this.mainViewElement.querySelector('.view__header')
    this.viewContentElement = this.mainViewElement.querySelector(
      '.view__content'
    )
    this.navListItemSelector = '.nav-list__item'
    this.navOpenClassName = 'nav--open'
    this.activeManuItemClassName = 'nav-list__item--is-active'
    this.moveAnimationClassName = 'move-animation'
    this.compactHeaderClassName = 'header--compact'
    this.mainContentAppearAnimationClassName = 'appear-animation'

    this._bindEvents()

    this.router.start()
  }

  _bindEvents() {
    this.linksList.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        this.router.navigateTo(e.target.href)
      })
    })

    this.navMenuButtonElement.addEventListener('click', () => {
      this._toggleMenu()
    })
  }

  _onRouteChange(view, link) {
    let isMovingNavigation = false

    this._clearActiveMenuLinks()

    if (this._shouldShowMenuTiles(view)) {
      this._hideHomeTile()
      this._showMenuTiles()
    } else {
      if (this._shouldMoveNavigation()) {
        isMovingNavigation = true
        this._moveNavigation(link)
      } else {
        this._setActiveMenuLink(link)
      }
    }

    this._hideMenu()

    setTimeout(
      async () => {
        this._setViewHeader(view.getHeaderText())
        this._clearViewContent(view)
        this.mainViewElement.classList.add(
          this.mainContentAppearAnimationClassName
        )
        this.viewContentElement.innerHTML = await view.getContent()
        this.mainViewElement.classList.remove(
          this.mainContentAppearAnimationClassName
        )
      },
      isMovingNavigation ? 800 : 0
    )
  }

  _clearViewContent(view) {
    this.viewContentElement.innerHTML = view.getSpinner()
  }

  _setViewHeader(text) {
    this.viewHeaderElement.textContent = text
  }

  _shouldShowMenuTiles(view) {
    return view instanceof HomeView
  }

  _shouldMoveNavigation() {
    return !this.headerElement.classList.contains(this.compactHeaderClassName)
  }

  _moveNavigation(link) {
    this.headerElement.classList.add(this.moveAnimationClassName)

    setTimeout(() => {
      this._setActiveMenuLink(link)
      this._showHomeTile()

      this.navListElement.style.display = 'none'

      this.headerElement.classList.add(this.compactHeaderClassName)

      setTimeout(() => (this.navListElement.style.display = 'flex'), 1000)
    }, 500)
  }

  _showHomeTile() {
    this.homeNavItemElement.style.display = 'block'
  }

  _hideHomeTile() {
    this.homeNavItemElement.style.display = 'none'
  }

  _showMenuTiles() {
    this.headerElement.classList.remove(this.moveAnimationClassName)
    this.headerElement.classList.remove(this.compactHeaderClassName)
  }

  _toggleMenu() {
    if (this.navElement.classList.contains(this.navOpenClassName)) {
      this._hideMenu()
    } else {
      this._showMenu()
    }
  }

  _showMenu() {
    this.navElement.classList.add(this.navOpenClassName)
  }
  _hideMenu() {
    this.navElement.classList.remove(this.navOpenClassName)
  }

  _clearActiveMenuLinks() {
    const menuItems = this.navElement.querySelectorAll(this.navListItemSelector)

    menuItems.forEach((item) =>
      item.classList.remove(this.activeManuItemClassName)
    )
  }

  _setActiveMenuLink(link) {
    const menuItemElement = this.navElement.querySelector(
      `${this.navListItemSelector}--${link}`
    )

    if (menuItemElement) {
      menuItemElement.classList.add(this.activeManuItemClassName)
    }
  }
}
