import { StyleSheet } from "react-native";
import { Image } from "expo-image";

type Props = {
    cardImg: string | undefined;
}

export default function CardViewer({ cardImg }: Props) {
    return <Image source={cardImg} style={styles.image} contentFit="contain" />
}

const styles = StyleSheet.create({
    image: {
        width: 400,
        height: 400,
    },
})