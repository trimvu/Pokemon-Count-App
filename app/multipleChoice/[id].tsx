import { StyleSheet, Text, View, ActivityIndicator, Pressable, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import SpriteViewer from "@/components/SpriteViewer";
import CardViewer from "@/components/CardViewer";
import AnswerButton from "@/components/AnswerButton";
import usePokemonTCGFetch from "@/hooks/usePokemonTCGFetch";
import usePokeAPIFetch from "@/hooks/usePokeAPIFetch";
import { useLocalSearchParams } from "expo-router";
import TextButton from "@/components/TextButton";

export default function MultipleChoice() {
    const { id } = useLocalSearchParams();
    const [randomNumber, setRandomNumber] = useState<number>(Math.floor((Math.random() * Number(id)) + 1));
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalStatus, setModalStatus] = useState<'correct' | 'incorrect'>('correct');
    const [btn1Num, setBtn1Num] = useState<number>(0);
    const [btn2Num, setBtn2Num] = useState<number>(0);
    const [btn3Num, setBtn3Num] = useState<number>(0);
    const [btn4Num, setBtn4Num] = useState<number>(0);
    const [ansOptions, setAnsOptions] = useState<number[]>([]);

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

    const generateRandom = () => {
        return Math.floor((Math.random() * Number(id)) + 1);
    }

    const rollD4 = () => {
        return Math.floor((Math.random() * 4) + 1);
    }
    
    const assignBtnNums = (newRandomNum: number) => {
        const randomArr: number[] = [];
    
        while (randomArr.length < 3) {
            const numAssign = generateRandom();
    
            if (numAssign !== newRandomNum && !randomArr.includes(numAssign)) {
                randomArr.push(numAssign);
            }
        }
    
        setAnsOptions(randomArr);
    };

    const choosePosition = () => {
        let die = rollD4();

        if (!ansOptions.length) {
            assignBtnNums(randomNumber);
        }

        let options = [...ansOptions];
        
        if (die === 1) {
            setBtn1Num(randomNumber);
            setBtn2Num(options.pop() as number);
            setBtn3Num(options.pop() as number);
            setBtn4Num(options.pop() as number);
        }
        if (die === 2) {
            setBtn1Num(options.pop() as number);
            setBtn2Num(randomNumber);
            setBtn3Num(options.pop() as number);
            setBtn4Num(options.pop() as number);
        }
        if (die === 3) {
            setBtn1Num(options.pop() as number);
            setBtn2Num(options.pop() as number);
            setBtn3Num(randomNumber);
            setBtn4Num(options.pop() as number);
        }
        if (die === 4) {
            setBtn1Num(options.pop() as number);
            setBtn2Num(options.pop() as number);
            setBtn3Num(options.pop() as number);
            setBtn4Num(randomNumber);
        }
    }

    useEffect(() => {
        choosePosition();
    }, [randomNumber, ansOptions]);

    const reset = () => {
        refetchPokemonTCG()
        const newRandom = generateRandom();
        setRandomNumber(newRandom);
        assignBtnNums(newRandom);
        choosePosition();
    }

    const handleGuess = (btn: number) => {
        setModalStatus(btn === randomNumber ? 'correct' : 'incorrect');
        setModalVisible(true);
        // reset();
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
                                {modalStatus === 'incorrect' && `Incorrect! Actual count: ${randomNumber}`}
                            </Text>
                            {modalStatus === 'correct' ? <SpriteViewer sprite="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/133.gif" imgWidth={100} imgHeight={100} /> : <SpriteViewer sprite="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/133.gif" imgWidth={100} imgHeight={100} />}
                            <TextButton 
                                text="Next" 
                                // btnColor="#00FF00" 
                                btnColor={modalStatus === 'correct' ? "#00FF00" : "#FF0000"}
                                onPress={() => {
                                    setModalVisible(!modalVisible); 
                                    reset()
                                }} 
                            />
                        </View>
                    </View>
                </Modal>

                <View style={styles.footerContainer}>
                    {/* <DisplayedNumber displayNumber={displayNubmer} /> */}
                    <View style={[styles.optionsRow, { marginTop: 145 }]}>
                        <AnswerButton borderColor="#00008B" backgroundColor="#3B4CCA" text={btn1Num} onPress={() => handleGuess(btn1Num)} />
                        <AnswerButton borderColor="#00008B" backgroundColor="#3B4CCA" text={btn2Num} onPress={() => handleGuess(btn2Num)} />
                    </View>
                    <View style={[styles.optionsRow, { marginTop: 90 }]}>
                        <AnswerButton borderColor="#00008B" backgroundColor="#3B4CCA" text={btn3Num} onPress={() => handleGuess(btn3Num)} />
                        <AnswerButton borderColor="#00008B" backgroundColor="#3B4CCA" text={btn4Num} onPress={() => handleGuess(btn4Num)} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: "center",
    },
    spriteContainer: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
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