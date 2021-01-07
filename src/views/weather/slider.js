export class Carousel {
  constructor(leftArrow, rightArrow, slider) {
    this.leftArrow = leftArrow
    this.rightArrow = rightArrow
    this.slider = slider
    this.sectionIndex = 0
  }

  leftArrowHandler() {
    this.sectionIndex = this.sectionIndex > 0 ? this.sectionIndex - 1 : 0
    this.slider.style.transform = `translateX(${this.sectionIndex * -50}%)`
  }

  rightArrowHandler() {
    this.sectionIndex = this.sectionIndex < 1 ? this.sectionIndex + 1 : 1
    this.slider.style.transform = `translateX(${this.sectionIndex * -50}%)`
  }
}
