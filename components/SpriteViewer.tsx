import { StyleSheet } from "react-native";
import { Image } from "expo-image";

type Props = {
    imgSource: string;
}

export default function SpriteViewer({ imgSource }: Props) {
    return <Image source={imgSource} style={styles.image} contentFit="contain" />
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    },
})