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
