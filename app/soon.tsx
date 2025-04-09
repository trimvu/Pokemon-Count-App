import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function Soon() {
    return (
        <>
            <Stack.Screen options={{ title: 'Soon!' }} />
            <View style={styles.container}>
                <Text>Coming Soon!</Text>
                <Link href="/" style={styles.link}>
                    <Text>Go to home screen!</Text>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
    },
});
