export function getSpinner() {
  return `
    <div class="${getSpinnerClassName()}">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    `
}

export function getSpinnerClassName() {
  return 'spinner'
}
