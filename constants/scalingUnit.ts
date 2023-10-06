import {Dimensions} from "react-native"
const {width, height} = Dimensions.get("window")

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350
const guidelineBaseHeight = 680
const screenWidth = width
const screenHeight = height

export {screenWidth, screenHeight}
