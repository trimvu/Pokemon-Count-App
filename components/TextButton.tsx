import { StyleSheet, Text, View, Pressable } from "react-native";

type Props = {
    text: string;
    btnColor: string;
    onPress: () => void;
}

export default function TextButton({ text, btnColor, onPress }: Props) {
    return (
        <View>
            <Pressable
                style={[styles.button, { backgroundColor: btnColor }]}
                onPress={onPress}
            >
                <Text style={styles.textStyle}>
                    {text}
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10,
        width: 100,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})