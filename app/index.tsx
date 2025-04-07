import { StyleSheet, Text, TextInput, View, Pressable, TouchableWithoutFeedback, Keyboard, Modal, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'expo-router'
import { useRouter } from "expo-router";
import SpriteViewer from "@/components/SpriteViewer";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TextButton from "@/components/TextButton";

interface PokeData {
  cardImage: string;
  pokedexNumber: number | "N/A";
}

export default function Index() {
  const [text, setText] = useState("");
  const [sprite, setSprite] = useState("");
  const [card, setCard] = useState("");
  const [pokeData, setPokeData] = useState<PokeData | null>(null);
  const [snModalVisible, setSnModalVisible] = useState<boolean>(false);
  const [mcModalVisible, setMcModalVisible] = useState<boolean>(false);
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

  const handleMultipleChoiceDifficulty = (id: number) => {
    router.push(`/multipleChoice/${id}`);
  }

  const handleSearchButton = () => {
    router.push(`/+not-found`);
  }

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={styles.container}>
      <View>
        {/* <Text style={styles.titleText}>Pokémon Count!</Text> */}
        <Image 
          source={require('@/assets/images/pokemon-count-logo.png')}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Enter a Pokémon!"
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={fetchSprite}>
          <Text>
            Submit
          </Text>
        </Pressable> */}

        {/* Same Number Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={snModalVisible}
          onRequestClose={() => {
            setSnModalVisible(!snModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Select the 'Same Number?' game difficulty: </Text>
              <TextButton 
                text="Easy" 
                btnColor="#2196F3" 
                onPress={() => {
                  handleSameNumberDifficulty(5);
                  setSnModalVisible(!snModalVisible);
                }} 
              />
              <TextButton 
                text="Normal" 
                btnColor="#2196F3" 
                onPress={() => {
                  handleSameNumberDifficulty(10);
                  setSnModalVisible(!snModalVisible);
                }} 
              />
              <TextButton 
                text="Hard" 
                btnColor="#2196F3" 
                onPress={() => {
                  handleSameNumberDifficulty(20);
                  setSnModalVisible(!snModalVisible);
                }} 
              />
              <TextButton 
                text="Cancel" 
                btnColor="#FF3131" 
                onPress={() => {
                  setSnModalVisible(!snModalVisible);
                }} 
              />
            </View>
          </View>
        </Modal>

        {/* Same Number Modal Button */}
        <Pressable
          style={[styles.button, { alignItems: "center", backgroundColor: "#FF0000" }]}
          onPress={() => setSnModalVisible(true)}
        >
          <MaterialCommunityIcons name="equal-box" size={38} color={"#FFF"} />
          <Text style={styles.textStyle}>Same Number?</Text>
        </Pressable>

        {/* Multiple Choice Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={mcModalVisible}
          onRequestClose={() => {
            setMcModalVisible(!mcModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Select the 'Multiple Choice' game difficulty: </Text>
              <TextButton 
                text="Easy" 
                btnColor="#2196F3" 
                onPress={() => {
                  handleMultipleChoiceDifficulty(5);
                  setMcModalVisible(!mcModalVisible);
                }} 
              />
              <TextButton 
                text="Normal" 
                btnColor="#2196F3" 
                onPress={() => {
                  handleMultipleChoiceDifficulty(10);
                  setMcModalVisible(!mcModalVisible);
                }} 
              />
              <TextButton 
                text="Hard" 
                btnColor="#2196F3" 
                onPress={() => {
                  handleMultipleChoiceDifficulty(20);
                  setMcModalVisible(!mcModalVisible);
                }} 
              />
              <TextButton 
                text="Cancel" 
                btnColor="#FF3131" 
                onPress={() => {
                  setMcModalVisible(!mcModalVisible);
                }} 
              />
            </View>
          </View>
        </Modal>

        {/* Multiple Choice Modal Button */}
        <Pressable
          style={[styles.button, { alignItems: "center", backgroundColor: "#3B4CCA" }]}
          onPress={() => setMcModalVisible(true)}
        >
          <MaterialCommunityIcons name="numeric-4-box-multiple" size={38} color={"#FFF"} />
          <Text style={styles.textStyle}>Multiple Choice</Text>
        </Pressable>

        {/* Search Button */}
        <Pressable
          style={[styles.button, { alignItems: "center", backgroundColor: "#FFDE00" }]}
          onPress={() => handleSearchButton()}
        >
          <MaterialCommunityIcons name="toy-brick-search" size={38} color={"#FFF"} />
          <Text style={styles.textStyle}>Search</Text>
        </Pressable>
      </View>
      {/* <View>
        {sprite && (<SpriteViewer sprite={sprite} />)}
      </View> */}
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
  titleText: {
    textAlign: 'center',
    fontSize: 33,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonDifficulty: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})