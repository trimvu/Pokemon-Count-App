import { StyleSheet, View, Text, ActivityIndicator, Pressable, FlatList, StatusBar, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import useSearchFetch from "@/hooks/useSearchFetch";
import CardViewer from "@/components/CardViewer";
import SearchResultCardViewer from "@/components/SearchResultCardViewer";
import Animated, { LinearTransition } from 'react-native-reanimated'
import DisplayedNumber from "@/components/DisplayedNumber";
import TextButton from "@/components/TextButton";

export default function SearchResult() {
    const [page, setPage] = useState<number>(1);
    const router = useRouter();
    const { searchTerm } = useLocalSearchParams();

    const {
        isLoading,
        error,
        response,
        totalCount,
        fetchedPage,
        refetch,
    } = useSearchFetch({ page, searchTerm });

    useEffect(() => {
        refetch();
    }, [page])

    const loadingScreen = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ActivityIndicator style={[styles.container, { justifyContent: 'center' }]} size="large" color="#00ff00" />
            </SafeAreaView>
        )
    }

    if (isLoading) {
        return loadingScreen()
    }

    if (error) {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <Text style={styles.text}>Something went wrong!</Text>
                </View>
            </SafeAreaView>
        )
    }

    const handlePreviousBtn = () => {
        if (page > 1) {
            setPage(() => page - 1);
            refetch();
        }
    }

    const handleNextBtn = () => {
        if (totalCount === null) return;

        if (page < Math.ceil(totalCount / 10)) {
            setPage(() => page + 1);
            refetch();
        }
    }

    const handleSearch = (cardId: string) => {
        router.push(`/card/${cardId}`);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    Result(s) for: {searchTerm}
                </Text>

                {/* {
                    totalCount === null ? (
                        loadingScreen()
                    ) : (
                        <Text>
                            Page: {page} of {Math.ceil(totalCount / 10)}
                        </Text>
                    )
                } */}

                {/* <Text>
                    Page: {page}
                </Text> */}

                {/* <CardViewer cardImg={response?.cardImage} /> */}

                {fetchedPage === page && response ? (
                    <FlatList
                        data={response}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <View style={styles.cardContainer}>
                                <Pressable onPress={() => handleSearch(item.id)}>
                                    <SearchResultCardViewer cardImg={item.images.small} />
                                </Pressable>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ flexGrow: 1 }}
                    />
                ) : (
                    loadingScreen()
                )}

                {/* <Animated.FlatList
                    data={response}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={styles.cardContainer}>
                            <Pressable onPress={() => handleSearch(item.id)}>
                                <SearchResultCardViewer cardImg={item.images.small} />
                            </Pressable>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ flexGrow: 1 }}
                // itemLayoutAnimation={LinearTransition}
                // keyboardDismissMode='on-drag'
                /> */}

                {totalCount !== null && Math.ceil(totalCount / 10) === 0 ? <Text style={styles.text}>No result for: {searchTerm}</Text> : <></>}

                <View style={styles.footerContainer}>
                    <TextButton
                        text="Previous"
                        btnColor={page === 1 || page === 0 ? "#808080" : "#2196F3"}
                        onPress={handlePreviousBtn}
                    />

                    <DisplayedNumber
                        displayNumber={
                            totalCount === null ? (
                                ''
                            ) : (
                                Math.ceil(totalCount / 10) === 0
                            ) ? (
                                `0 / 0`
                            ) : (
                                `${page}/${Math.ceil(totalCount / 10)}`
                            )
                        }
                        style={{ marginTop: 0, marginHorizontal: 0 }}
                    />

                    <TextButton
                        text="Next"
                        btnColor={
                            totalCount === null ? "#808080" : page === Math.ceil(totalCount / 10) || Math.ceil(totalCount / 10) === 0 ? "#808080" : "#2196F3"
                        }
                        onPress={handleNextBtn}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: StatusBar.currentHeight || 0,
        paddingBottom: 25,
    },
    text: {
        fontSize: 33,
    },
    cardContainer: {
        alignContent: 'center',
        marginHorizontal: width / 15,
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
})