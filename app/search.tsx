import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Search() {
    const [text, setText] = useState("");
    const router = useRouter();

    const handleSearchButton = (searchTerm: string) => {
        router.push(`/search/${searchTerm}`);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter a Pokémon!"
                    value={text}
                    onChangeText={setText}
                />
                <Pressable onPress={() => handleSearchButton(text)}>
                    <Text>
                        Submit
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titleText: {
        textAlign: 'center',
        fontSize: 33,
    },
    input: {
        borderColor: "black",
        borderWidth: 1,
    },
})