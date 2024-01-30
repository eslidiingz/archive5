import { Dimensions, PixelRatio } from "react-native";
const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];
const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

export function wp(size) {
    return shortDimension / guidelineBaseWidth * size
}
export function hp(size) {
    return longDimension / guidelineBaseHeight * size;
}
export function widthPercent(w){
    return Dimensions.get('window').width * w
}