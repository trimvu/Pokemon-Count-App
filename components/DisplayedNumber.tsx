import { StyleSheet, View, Text, ViewStyle, StyleProp } from "react-native";

type Props = {
    displayNumber: number | string;
    style?: StyleProp<ViewStyle>;
}

export default function DisplayedNumber({ displayNumber, style }: Props) {
    return (
        <View style={[styles.circleButtonContainer, style]}>
            <View style={styles.circleButton}>
                <Text style={styles.text}>
                    {displayNumber}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    circleButtonContainer: {
        width: 84,
        height: 84,
        marginHorizontal: 60,
        marginTop: 145,
        borderWidth: 4,
        borderColor: "#FFCB05",
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