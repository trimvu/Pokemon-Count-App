import { StyleSheet, View, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    borderColor: string;
    backgroundColor: string;
    iconName?: keyof typeof MaterialIcons.glyphMap;
    text?: string | number;
    onPress: () => void;
}

export default function AnswerButton({ borderColor, backgroundColor, iconName, text, onPress }: Props) {
    const pressedBtnColor = () => {
            const r = parseInt(backgroundColor.slice(1, 3), 16);
            const g = parseInt(backgroundColor.slice(3, 5), 16);
            const b = parseInt(backgroundColor.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, 0.5)`;
    }

    return (
        // <SafeAreaView>
            <View style={styles.container}>
                <View style={[styles.circleButtonContainer, { borderColor: borderColor }]}>
                    {/* <Pressable style={[styles.circleButton, { backgroundColor: backgroundColor }]} onPress={onPress}> */}
                    <Pressable
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? pressedBtnColor() : backgroundColor,
                            },
                            styles.circleButton
                        ]}
                        onPress={onPress}
                    >
                        {iconName && <MaterialIcons name={iconName} size={38} color={"#FFF"} />}
                        {text && <Text style={styles.text}>{text}</Text>}
                    </Pressable>
                </View>
            </View >
        // </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        // paddingTop: 50,
    },
    circleButtonContainer: {
        // width: 150,
        // height: 84,
        width: 125,
        height: 75,
        marginHorizontal: 30,
        // marginTop: 5,
        marginVertical: 10,
        borderWidth: 4,
        borderRadius: 42,
        padding: 3,
    },
    circleButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 42,
    },
    text: {
        textAlign: "center",
        fontSize: 38,
        color: "#FFF",
    },
})