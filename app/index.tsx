import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useState } from "react";
import SpriteViewer from "@/components/SpriteViewer";



export default function Index() {
  const [text, setText] = useState("")
  const [sprite, setSprite] = useState("");

  const fetchSprite = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${text.toLowerCase()}`)
      // console.log(response.data.sprites.front_default);
      setSprite(response.data.sprites.other.showdown.front_default)
    } catch (e) {
      console.error(e);
    }
  }

  return (
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
      </View>
      <View>
        {sprite && (<SpriteViewer imgSource={sprite} />)}
      </View>
    </SafeAreaView>
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