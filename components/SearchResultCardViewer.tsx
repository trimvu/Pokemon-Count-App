import { StyleSheet, Dimensions, View, ActivityIndicator } from "react-native";
import { Image } from "expo-image";

type Props = {
    cardImg: string;
}

export default function SearchResultCardViewer({ cardImg }: Props) {
    if (!cardImg) {
        return <ActivityIndicator />
    }
    
    return (
        <Image source={cardImg} style={styles.image} contentFit="contain" />
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    image: {
        // backgroundColor: 'black',
        width: width / 3,
        height: height / 3,
    },
})