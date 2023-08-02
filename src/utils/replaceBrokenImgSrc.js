import { dummyImage } from '../images/icons'

const replaceBrokenImgSrc = (e) => {
  if (e.target.src !== dummyImage) {
    e.target.src = dummyImage
  }
}
export default replaceBrokenImgSrc
