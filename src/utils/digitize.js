/**
 *
 * @param {number} number
 * @param {boolean} useAbs - Default = false.
 * @returns
 */
const digitize = (number, useAbs = false) => {
  if (useAbs) {
    number = Math.abs(number)
  }
  if (number > 99.9) {
    return Math.round(number)
  } else if (number > 9.99) {
    return Math.round(number * 10) / 10
  } else if (number > 0.999) {
    return Math.round(number * 100) / 100
  } else if (number >= 0.001) {
    return Math.round(number * 1000) / 1000
  } else if (number > 0) {
    return '< 0.001'
  } else {
    return 0
  }
}
export default digitize
