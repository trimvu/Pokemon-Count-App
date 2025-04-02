import { StyleSheet, Text, TextInput, View, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useEffect, useState } from "react";
import SpriteViewer from "@/components/SpriteViewer";
import CardViewer from "@/components/CardViewer";
import DisplayedNumber from "@/components/DisplayedNumber";
import EqualNotEqual from "@/components/EqualNotEqual";

interface PokeData {
    cardImage: string;
    pokedexNumber: number | "N/A";
}

export default function SameNumber() {
    const [pokeData, setPokeData] = useState<PokeData | null>(null);
    const [randomNumber, setRandomNumber] = useState<number>(Math.floor((Math.random() * 20) + 1));
    const [sprite, setSprite] = useState<string>("");

    // console.log(randomNumber);

    const poke_url = "https://api.pokemontcg.io/v2/cards";
    const api_key = process.env.EXPO_PUBLIC_API_KEY;

    const fetchRandomCard = async () => {
        try {
            let random = Math.floor(Math.random() * 15756);
            const response = await axios.get(`${poke_url}?pageSize=1&page=${random}&q=supertype:"Pokémon"`, {
                headers: {
                    'X-Api-Key': api_key,
                },
            });

            // console.log(response.data.data?.[0]?.images?.large);
            setPokeData({
                cardImage: response.data.data?.[0]?.images?.large,
                pokedexNumber: response.data?.data?.[0]?.nationalPokedexNumbers?.[0] || "N/A",
            });
        } catch (e) {
            console.error("error", e);
        }
    }

    const fetchSprite = async () => {
        try {
            if (!pokeData?.pokedexNumber) return;

            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeData?.pokedexNumber}`)
            // console.log(response.data.sprites.front_default);
            // setSprite(response.data?.sprites?.other?.showdown?.front_default)
            setSprite(response.data?.sprites?.front_default)

            if (pokeData?.pokedexNumber === 'N/A') {
                const response = await axios.get(`https://pokeapi.co/api/v2/item/4/`)
                setSprite(response.data?.sprites?.default);
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchRandomCard()
    }, [])

    useEffect(() => {
        fetchSprite()
    }, [pokeData?.pokedexNumber]);

    const coinFlip = () => {
        return Math.random() < 0.5 ? "heads" : "tails";
    }

    const generateRandom = () => {
        return Math.floor((Math.random() * 20) + 1);
    }

    const chooseNumber = () => {
        let flip = coinFlip();
        console.log(flip);
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
    }, [])

    const gameLogic = () => {
        alert("HI!")
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <CardViewer cardImg={pokeData?.cardImage} />
                <View style={styles.spriteContainer}>
                    {Array.from({ length: randomNumber }).map((_, index) => (
                        <SpriteViewer key={index} sprite={sprite} />
                    ))}
                </View>
                {/* <View><Text>{randomNumber}</Text></View> */}
                {/* <View>{displayNubmer}</View> */}
                <View style={styles.footerContainer}>
                    <DisplayedNumber displayNumber={displayNubmer} />
                    <View style={styles.optionsRow}>
                        <EqualNotEqual borderColor="#FF0000" backgroundColor="#FF3131" iconName="close" onPress={gameLogic} />
                        <EqualNotEqual borderColor="#008000" backgroundColor="#39FF14" iconName="check" onPress={gameLogic} />
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