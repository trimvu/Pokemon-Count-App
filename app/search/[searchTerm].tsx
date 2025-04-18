import { StyleSheet, View, Text, ActivityIndicator, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import useSearchFetch from "@/hooks/useSearchFetch";
import CardViewer from "@/components/CardViewer";

export default function SearchResult() {
    const [page, setPage] = useState<number>(1);
    const { searchTerm } = useLocalSearchParams();

    const {
        isLoading,
        error,
        response,
        refetch,
    } = useSearchFetch({ page, searchTerm });

    useEffect(() => {
        refetch();
    }, [page])

    if (isLoading) {
        return <ActivityIndicator size="large" color="#00ff00" />
    }

    if (error) {
        return (
            <View>
                <Text>Something went wrong!</Text>
            </View>
        )
    }

    const handlePreviousBtn = () => {
        setPage(() => page - 1);
        refetch();
    }

    const handleNextBtn = () => {
        setPage(() => page + 1);
        refetch();
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text>
                    Result(s) for: {searchTerm}
                </Text>
                <Text>
                    Page: {page}
                </Text>
                <CardViewer cardImg={response?.cardImage} />
                <Pressable onPress={handlePreviousBtn}>
                    <Text>Previous</Text>
                </Pressable>
                <Pressable onPress={handleNextBtn}>
                    <Text>Next</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})