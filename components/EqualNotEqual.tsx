import { StyleSheet, View, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
    borderColor: string;
    backgroundColor: string;
    iconName: keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
}

export default function EqualNotEqual({ borderColor, backgroundColor, iconName, onPress }: Props) {
    return (
        <View style={styles.container}>
            <View style={[styles.circleButtonContainer, { borderColor: borderColor }]}>
                <Pressable style={[styles.circleButton, { backgroundColor: backgroundColor }]} onPress={onPress}>
                    <MaterialIcons name={iconName} size={38} color={"#FFF"} />
                </Pressable>
            </View>
            {/* <View style={[styles.circleButtonContainer, { borderColor: "#008000" }]}>
                <View style={[styles.circleButton, { backgroundColor: "#39FF14" }]}>
                    <Pressable>
                        <MaterialIcons name="check" size={38} color={"#FFF"} />
                    </Pressable>
                </View>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    circleButtonContainer: {
        width: 150,
        height: 84,
        marginHorizontal: 30,
        marginTop: 5,
        borderWidth: 4,
        // borderColor: "#FFCB05",
        borderRadius: 42,
        padding: 3,
    },
    circleButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 42,
        backgroundColor: "#fff",
    },
    text: {
        textAlign: "center",
        fontSize: 30,
    },
})