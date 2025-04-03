import { StyleSheet, Text, TextInput, View, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'expo-router'
import { useRouter } from "expo-router";
import SpriteViewer from "@/components/SpriteViewer";

interface PokeData {
  cardImage: string;
  pokedexNumber: number | "N/A";
}

export default function Index() {
  const [text, setText] = useState("");
  const [sprite, setSprite] = useState("");
  const [card, setCard] = useState("");
  const [pokeData, setPokeData] = useState<PokeData | null>(null);
  const router = useRouter();

  // const poke_url = "https://api.pokemontcg.io/v2/cards";
  
  // const fetchCardSearch = async () => {
  //   try {
  //     const randomNumber = Math.floor(Math.random() * 15756);
  //     const response = await axios.get(`${poke_url}?pageSize=1&page=${randomNumber}&q=supertype:"Pokémon"`, {
  //       headers: {
  //         'X-Api-Key': api_key,
  //       },
  //     });

  //     // console.log(response.data.data?.[0]?.images?.large);
  //     setPokeData({
  //       cardImage: response.data.data?.[0]?.images?.large,
  //       pokedexNumber: response.data?.data?.[0]?.nationalPokedexNumbers?.[0] || "N/A",
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  const fetchSprite = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${text.toLowerCase()}`)
      // console.log(response.data.sprites.front_default);
      setSprite(response.data.sprites.other.showdown.front_default)
    } catch (e) {
      console.error(e);
    }
  }

  const handleSameNumberDifficulty = (id: number) => {
    router.push(`/sameNumber/${id}`);
  }

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Pokémon!</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a Pokémon!"
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={fetchSprite}>
          <Text>
            Submit
          </Text>
        </Pressable>

        {/* <Link href={{ pathname: "/sameNumber/[id]", params: { id: "5" } }} asChild> */}
          <Pressable onPress={() => handleSameNumberDifficulty(5)}>
            <Text>
              Same Number - 5
            </Text>
          </Pressable>
        {/* </Link> */}
        {/* <Link href={{ pathname: "/sameNumber/[id]", params: { id: "10" } }} asChild> */}
          <Pressable onPress={() => handleSameNumberDifficulty(10)}>
            <Text>
              Same Number - 10
            </Text>
          </Pressable>
        {/* </Link> */}
        {/* <Link href={{ pathname: "/sameNumber/[id]", params: { id: "20" } }} asChild> */}
          <Pressable onPress={() => handleSameNumberDifficulty(20)}>
            <Text>
              Same Number - 20
            </Text>
          </Pressable>
        {/* </Link> */}
      </View>
      <View>
        {sprite && (<SpriteViewer sprite={sprite} />)}
      </View>
    </SafeAreaView>
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
  },
})