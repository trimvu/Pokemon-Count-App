import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import SpriteViewer from "@/components/SpriteViewer";
import CardViewer from "@/components/CardViewer";
import DisplayedNumber from "@/components/DisplayedNumber";
import AnswerButton from "@/components/AnswerButton";
import usePokemonTCGFetch from "@/hooks/usePokemonTCGFetch";
import usePokeAPIFetch from "@/hooks/usePokeAPIFetch";
import { useLocalSearchParams } from "expo-router";

export default function SameNumber() {
    const { id } = useLocalSearchParams();
    const [randomNumber, setRandomNumber] = useState<number>(Math.floor((Math.random() * Number(id)) + 1));

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
        console.log("new display", newDisplay);
    }

    const gameLogicCheck = () => {
        if (displayNubmer === randomNumber) {
            alert("Correct!");
        } else {
            alert(`Incorrect! Actual count ${randomNumber}.`);
        }
        reset()
    }

    const gameLogicClose = () => {
        if (displayNubmer !== randomNumber) {
            alert("Correct!");
        } else {
            alert("They are actually the same!");
        }
        reset()
    }

    if (isPokemonTCGLoading || isPokeAPILoading) {
        return <ActivityIndicator size="large" />
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
                        <SpriteViewer key={index} sprite={pokeAPIResponse} />
                    ))}
                </View>
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
})