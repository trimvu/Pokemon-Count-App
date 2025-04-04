import { StyleSheet, Text, TextInput, View, Pressable, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useEffect, useState } from "react";
import SpriteViewer from "@/components/SpriteViewer";
import CardViewer from "@/components/CardViewer";
import DisplayedNumber from "@/components/DisplayedNumber";
import AnswerButton from "@/components/AnswerButton";
import usePokemonTCGFetch from "@/hooks/usePokemonTCGFetch";
import usePokeAPIFetch from "@/hooks/usePokeAPIFetch";

import { useLocalSearchParams, useRouter } from "expo-router";

interface PokeData {
    cardImage: string;
    pokedexNumber: number | "N/A";
}

export default function SameNumber() {
    const { id } = useLocalSearchParams();
    // console.log(id);
    const [pokeData, setPokeData] = useState<PokeData | null>(null);
    const [randomNumber, setRandomNumber] = useState<number>(Math.floor((Math.random() * Number(id)) + 1));
    const [sprite, setSprite] = useState<string>("");
    const router = useRouter();
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

    // console.log(randomNumber);

    const poke_url = "https://api.pokemontcg.io/v2/cards";
    const api_key = process.env.EXPO_PUBLIC_API_KEY;

    // const fetchRandomCard = async () => {
    //     try {
    //         let random = Math.floor(Math.random() * 15756);
    //         const response = await axios.get(`${poke_url}?pageSize=1&page=${random}&q=supertype:"Pokémon"`, {
    //             headers: {
    //                 'X-Api-Key': api_key,
    //             },
    //         });

    //         // console.log(response.data.data?.[0]?.images?.large);
    //         setPokeData({
    //             cardImage: response.data.data?.[0]?.images?.large,
    //             pokedexNumber: response.data?.data?.[0]?.nationalPokedexNumbers?.[0] || "N/A",
    //         });
    //     } catch (e) {
    //         console.error("error", e);
    //     }
    // }



    // const fetchSprite = async () => {
    //     try {
    //         if (!pokemonTCGResponse?.pokedexNumber) return;

    //         if (pokemonTCGResponse?.pokedexNumber === 'N/A') {
    //             const response = await axios.get(`https://pokeapi.co/api/v2/item/4/`)
    //             setSprite(response.data?.sprites?.default);
    //         } else {
    //             const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonTCGResponse?.pokedexNumber}`)
    //             // console.log(response.data.sprites.front_default);
    //             // setSprite(response.data?.sprites?.other?.showdown?.front_default)
    //             setSprite(response.data?.sprites?.front_default)
    //         }

    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    // useEffect(() => {
    //     fetchRandomCard()
    // }, [])

    // useEffect(() => {
    //     fetchSprite()
    // }, [pokemonTCGResponse?.pokedexNumber]);

    const coinFlip = () => {
        return (Math.random() < 0.50) ? "heads" : "tails";
    }

    const generateRandom = () => {
        return Math.floor((Math.random() * Number(id)) + 1);
    }

    const chooseNumber = () => {
        const flip = coinFlip();
        // console.log(flip);
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
        // fetchRandomCard();
        refetchPokemonTCG()
        const newRandom = generateRandom();
        // console.log("new random", newRandom);
        setRandomNumber(newRandom);
        const newDisplay = chooseNumber();
        console.log("new display", newDisplay);
        // setDisplayNumber(newDisplay);
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
                {/* <View><Text>{randomNumber}</Text></View> */}
                {/* <View>{displayNubmer}</View> */}
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