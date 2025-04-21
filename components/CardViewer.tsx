import { StyleSheet, Dimensions, StyleProp, ViewStyle, ImageStyle } from "react-native";
import { Image } from "expo-image";

type Props = {
    cardImg: string | undefined;
    style?: ImageStyle;
}

export default function CardViewer({ cardImg, style }: Props) {
    return <Image source={cardImg} style={[styles.image, style]} contentFit="contain" />
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    image: {
        width: width,
        height: height * 0.38,
    },
})