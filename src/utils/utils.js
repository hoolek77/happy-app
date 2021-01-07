export const isTypeOfClass = (obj, baseClass) => {
  return (
    typeof obj === 'function' &&
    Object.getPrototypeOf(obj).name === baseClass.name
  )
}
