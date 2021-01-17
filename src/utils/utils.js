export const isTypeOfClass = (obj, baseClass) => {
  return (
    typeof obj === 'function' &&
    Object.getPrototypeOf(obj).name === baseClass.name
  )
}

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  return new Date(dateString).toLocaleDateString(undefined, options)
}

export const stripHTMLTags = (string) => {
  return string.replace(/<\/?[^>]+(>|$)/g, '')
}

export const getClosestParentElement = (elem, selector) => {
  while (elem && elem !== document) {
    if (elem.matches(selector)) {
      return elem
    }

    elem = elem.parentNode
  }

  return null
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getHeightFromViewportHeight = (vh) => {
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )

  return (vh * h) / 100
}

export const getWidthFromViewportWidth = (vw) => {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

  return (vw * w) / 100
}
