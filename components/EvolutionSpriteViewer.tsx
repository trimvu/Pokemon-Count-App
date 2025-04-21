import { StyleSheet, ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import usePokeAPIFetch from "@/hooks/usePokeAPIFetch";
import SpriteViewer from "./SpriteViewer";

type Props = {
    imgWidth: number;
    imgHeight: number;
    sprite: string;
}

export default function EvolutionSpriteViewer({ imgWidth, imgHeight, sprite }: Props) {
    const spriteFetch = usePokeAPIFetch(sprite);

    if (spriteFetch.isLoading) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ActivityIndicator style={[styles.container, { justifyContent: 'center' }]} size="large" color="#00ff00" />
            </SafeAreaView>
        )
    }

    if (spriteFetch.error) {
        return <View><Text>Something went wrong!</Text></View>
    }

    return <SpriteViewer imgWidth={imgWidth} imgHeight={imgHeight} sprite={spriteFetch.response} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})