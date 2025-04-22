import CardViewer from "@/components/CardViewer";
import EvolutionSpriteViewer from "@/components/EvolutionSpriteViewer";
import TextButton from "@/components/TextButton";
import useGetCardById from "@/hooks/useGetCardById";
import usePokeAPIFetch from "@/hooks/usePokeAPIFetch";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Animated, PanResponder, FlatList, Pressable, Dimensions, Modal, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function SearchedCard() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [pokeId, setPokeId] = useState<number | null>(null);
    const { pokeName } = usePokeAPIFetch(pokeId);
    const router = useRouter();
    const { cardId } = useLocalSearchParams();
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
            onPanResponderRelease: () => {
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }).start();
            },
        }),
    ).current;

    const {
        isLoading,
        error,
        response,
        evolvesFrom,
        evolvesTo,
        pokedexNumbers,
    } = useGetCardById({ cardId });

    useEffect(() => {
        if (pokeName) {
            router.push(`/search/${pokeName}`);
        }
    }, [pokeName])

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ActivityIndicator style={[styles.container, { justifyContent: 'center' }]} size="large" color="#00ff00" />
            </SafeAreaView>
        )
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

    const handleSpriteClick = (searchTerm: string | number) => {
        if (typeof searchTerm === "number") {
            setPokeId(searchTerm);
        }

        if (typeof searchTerm === "string") {
            router.push(`/search/${searchTerm}`);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {
                    response !== null ? (
                        <View>
                            <Text>Artist: {response.artist}</Text>
                        </View>
                    ) : (
                        <></>
                    )
                }

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Animated.View
                                style={{
                                    transform: [{ translateX: pan.x }, { translateY: pan.y }],
                                    zIndex: 999,
                                }}
                                {...panResponder.panHandlers}
                            >
                                <CardViewer cardImg={response?.cardImage} style={{ height: height * 0.7, width: width * 0.9 }} />
                            </Animated.View>
                            <TextButton
                                text="Close"
                                btnColor="#FF3131"
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            />
                        </View>
                    </View>
                </Modal>

                <Animated.View
                    style={{
                        transform: [{ translateX: pan.x }, { translateY: pan.y }],
                        zIndex: 999,
                    }}
                    {...panResponder.panHandlers}
                >
                    <CardViewer cardImg={response?.cardImage} />
                </Animated.View>

                <Pressable onPress={() => setModalVisible(true)}>
                    <MaterialCommunityIcons name="magnify-plus-outline" size={38} color={"#000"} />
                </Pressable>

                <Text>Click magnifying glass to enlarge card</Text>
                <Text>Hold card to drag card</Text>

                {
                    evolvesFrom !== undefined ? (
                        <View>
                            <Text style={styles.text}>Evolves from</Text>
                        </View>
                    ) : (
                        <></>
                    )
                }

                {
                    evolvesFrom !== undefined ? (
                        <View>
                            <Pressable onPress={() => handleSpriteClick(evolvesFrom)}>
                                <EvolutionSpriteViewer imgWidth={height < 860 ? 75 : 100} imgHeight={height < 860 ? 75 : 100} sprite={evolvesFrom} />
                            </Pressable>
                        </View>
                    ) : (
                        <></>
                    )
                }

                {
                    response !== null ? (
                        <View>
                            <Text style={styles.text}>{response.name}</Text>
                        </View>
                    ) : (
                        <></>
                    )
                }

                <FlatList
                    data={pokedexNumbers}
                    numColumns={4}
                    renderItem={({ item }) => (
                        <View>
                            <Pressable onPress={() => handleSpriteClick(item)}>
                            <EvolutionSpriteViewer imgWidth={height < 860 ? 75 : 100} imgHeight={height < 860 ? 75 : 100} sprite={item} />
                            </Pressable>
                        </View>
                    )}
                    keyExtractor={item => item.toString()}
                />

                {
                    evolvesTo !== undefined ? (
                        <View>
                            <Text style={styles.text}>Evolves to</Text>
                        </View>
                    ) : (
                        <></>
                    )
                }

                <FlatList
                    data={evolvesTo}
                    numColumns={4}
                    renderItem={({ item }) => (
                        <View>
                            <Pressable onPress={() => handleSpriteClick(item)}>
                                <EvolutionSpriteViewer imgWidth={height < 860 ? 75 : 100} imgHeight={height < 860 ? 75 : 100} sprite={item} />
                            </Pressable>
                        </View>
                    )}
                    keyExtractor={item => item}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: StatusBar.currentHeight || 0,
        // paddingBottom: 25,
    },
    text: {
        fontSize: height < 860 ? 20 : 30,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        height: height,
        width: width,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})