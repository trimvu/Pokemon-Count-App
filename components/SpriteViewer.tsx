import { StyleSheet } from "react-native";
import { Image } from "expo-image";

type Props = {
    imgWidth: number;
    imgHeight: number;
    sprite: string;
}

export default function SpriteViewer({ imgWidth, imgHeight, sprite }: Props) {
    return <Image source={sprite} style={{ width: imgWidth, height: imgHeight }} contentFit="contain" />
}

// const styles = StyleSheet.create({
//     image: {
//         width: 50,
//         height: 50,
//     },
// })