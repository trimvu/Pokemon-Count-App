import { StyleSheet, Text, TextInput, View, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useEffect, useState } from "react";
import SpriteViewer from "@/components/SpriteViewer";
import CardViewer from "@/components/CardViewer";

interface PokeData {
    cardImage: string;
    pokedexNumber: number | "N/A";
}

export default function SameNumber() {
    const [pokeData, setPokeData] = useState<PokeData | null>(null);
    const [randomNumber, setRandomNumber] = useState<number>(Math.floor(Math.random() * 20) + 1);
    const [sprite, setSprite] = useState<string>("");

    const poke_url = "https://api.pokemontcg.io/v2/cards";
    const api_key = process.env.EXPO_PUBLIC_API_KEY;

    const fetchRandomCard = async () => {
        try {
            let randomNumber = Math.floor(Math.random() * 15756);
            const response = await axios.get(`${poke_url}?pageSize=1&page=${randomNumber}&q=supertype:"Pokémon"`, {
                headers: {
                    'X-Api-Key': api_key,
                },
            });

            console.log(response.data.data?.[0]?.images?.large);
            setPokeData({
                cardImage: response.data.data?.[0]?.images?.large,
                pokedexNumber: response.data?.data?.[0]?.nationalPokedexNumbers?.[0] || "N/A",
            });
        } catch (e) {
            console.error(e);
        }
    }

    const fetchSprite = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeData?.pokedexNumber}`)
            console.log(response.data.sprites.front_default);
            // setSprite(response.data?.sprites?.other?.showdown?.front_default)
            setSprite(response.data?.sprites?.front_default)
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

    return (
        <View style={styles.container}>
            <CardViewer cardImg={pokeData?.cardImage} />
            <View style={styles.spriteContainer}>
                {Array.from({ length: randomNumber }).map((_, index) => (
                    <SpriteViewer key={index} sprite={sprite} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 50,
    },
    spriteContainer: {
        flexDirection: 'row', // Arrange bubbles in a row
        flexWrap: "wrap",
        justifyContent: 'space-around', // Even spacing
        alignItems: 'center', // Align images vertically
        padding: 10,
    }
})