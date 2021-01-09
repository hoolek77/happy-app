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
