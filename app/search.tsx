import { StyleSheet, View, Text, Pressable, TextInput, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
                {/* <Pressable onPress={() => handleSearchButton(text)}>
                    <Text>
                        Submit
                    </Text>
                </Pressable> */}
                <Pressable
                    style={[styles.button, { alignItems: "center", backgroundColor: "#FFDE00" }]}
                    onPress={() => handleSearchButton(text)}
                >
                    <MaterialCommunityIcons name="toy-brick-search" size={38} color={"#FFF"} />
                    <Text style={styles.textStyle}>Search</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('window');

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
        borderWidth: 5,
        width: width / 2,
        borderColor: '#F4DC26',
        borderRadius: 20,
        textAlign: 'center',
        color: '#000',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10,
        width: width / 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})