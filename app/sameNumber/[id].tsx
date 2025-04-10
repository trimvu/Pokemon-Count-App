import { StyleSheet, Text, View, ActivityIndicator, Pressable, Modal, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import SpriteViewer from "@/components/SpriteViewer";
import CardViewer from "@/components/CardViewer";
import DisplayedNumber from "@/components/DisplayedNumber";
import AnswerButton from "@/components/AnswerButton";
import usePokemonTCGFetch from "@/hooks/usePokemonTCGFetch";
import usePokeAPIFetch from "@/hooks/usePokeAPIFetch";
import { useLocalSearchParams } from "expo-router";
import TextButton from "@/components/TextButton";

export default function SameNumber() {
    const { id } = useLocalSearchParams();
    const [randomNumber, setRandomNumber] = useState<number>(Math.floor((Math.random() * Number(id)) + 1));
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalStatus, setModalStatus] = useState<'correct' | 'incorrect-1' | 'incorrect-2'>('correct');

    const {
        isLoading: isPokemonTCGLoading,
        error: pokemonTCGError,
        response: pokemonTCGResponse,
        refetch: refetchPokemonTCG,
    } = usePokemonTCGFetch();
    const {
        isLoading: isPokeAPILoading,
        error: pokeAPIError,
        response: pokeAPIResponse,
    } = usePokeAPIFetch(pokemonTCGResponse?.pokedexNumber);

    const coinFlip = () => {
        return (Math.random() < 0.50) ? "heads" : "tails";
    }

    const generateRandom = () => {
        return Math.floor((Math.random() * Number(id)) + 1);
    }

    const chooseNumber = () => {
        const flip = coinFlip();
        if (flip === "heads") {
            return randomNumber;
        } else {
            let newNum = generateRandom();

            while (newNum === randomNumber) {
                newNum = generateRandom();
            }

            return newNum;
        }
    }

    const [displayNubmer, setDisplayNumber] = useState<number>(0);

    useEffect(() => {
        setDisplayNumber(chooseNumber());
    }, [randomNumber])

    const reset = () => {
        refetchPokemonTCG()
        const newRandom = generateRandom();
        setRandomNumber(newRandom);
        const newDisplay = chooseNumber();
        // console.log("new display", newDisplay);
        setDisplayNumber(newDisplay);
    }

    const gameLogicCheck = () => {
        if (displayNubmer === randomNumber) {
            setModalStatus('correct');
            // alert("Correct!");
        } else {
            // alert(`Incorrect! Actual count ${randomNumber}.`);
            setModalStatus('incorrect-1');
        }
        setModalVisible(true);
        // reset()
    }

    const gameLogicClose = () => {
        if (displayNubmer !== randomNumber) {
            // alert("Correct!");
            setModalStatus('correct');
        } else {
            // alert("They are actually the same!");
            setModalStatus('incorrect-2');
        }
        setModalVisible(true);
        // reset()
    }

    if (isPokemonTCGLoading || isPokeAPILoading) {
        return <ActivityIndicator size="large" color="#00ff00" />
    }

    if (pokemonTCGError || pokeAPIError) {
        return (
            <View>
                <Text>Something went wrong!</Text>
                <AnswerButton borderColor="#FF0000" backgroundColor="#FF3131" iconName="close" onPress={reset} />
            </View>
        )
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <CardViewer cardImg={pokemonTCGResponse?.cardImage} />
                <View style={styles.spriteContainer}>
                    {Array.from({ length: randomNumber }).map((_, index) => (
                        <SpriteViewer key={index} sprite={pokeAPIResponse} imgWidth={50} imgHeight={50} />
                    ))}
                </View>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                {modalStatus === 'correct' && "Correct!"}
                                {modalStatus === 'incorrect-1' && `Incorrect! Actual count: ${randomNumber}.`}
                                {modalStatus === 'incorrect-2' && "They are actually the same!"}
                            </Text>
                            {modalStatus === 'correct' ? <SpriteViewer sprite="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/133.gif" imgWidth={100} imgHeight={100} /> : <SpriteViewer sprite="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/133.gif" imgWidth={100} imgHeight={100} />}
                            <TextButton 
                                text="Next" 
                                btnColor={modalStatus === 'correct' ? "#00FF00" : "#FF0000"}
                                onPress={() => {
                                    setModalVisible(!modalVisible); 
                                    reset()}
                                } 
                            />
                        </View>
                    </View>
                </Modal>
                <View style={styles.footerContainer}>
                    <DisplayedNumber displayNumber={displayNubmer} />
                    <View style={styles.optionsRow}>
                        <AnswerButton borderColor="#FF0000" backgroundColor="#FF3131" iconName="close" onPress={gameLogicClose} />
                        <AnswerButton borderColor="#008000" backgroundColor="#39FF14" iconName="check" onPress={gameLogicCheck} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
    },
    footerContainer: {
        position: "absolute",
        bottom: height < 860 ? -725 : -200,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    spriteContainer: {
        width: "100%",
        height: 180,
        paddingBottom: 100, 
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 10,
    },
    optionsRow: {
        flexDirection: "row",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        paddingHorizontal: 135,
        paddingVertical: 100,
        alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        boxShadow: "0px, 2px, 4px, rgba(0, 0, 0, 0.25)",
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})