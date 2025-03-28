import { StyleSheet } from "react-native";
import { Image } from "expo-image";

type Props = {
    sprite: string;
}

export default function SpriteViewer({ sprite }: Props) {
    return <Image source={sprite} style={styles.image} contentFit="contain" />
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
    },
})