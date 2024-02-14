import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/filter.php?i=${keyword}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          setRecipes(data.meals); 
        } else {
          console.log("No meals found");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textinput}
        placeholder="keyword"
        value={keyword}
        onChangeText={(text) => setKeyword(text)}
      />
      <Button title="Find" onPress={getRecipes} />

      <FlatList
        data={recipes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontSize: 16 }}>{item.strMeal}</Text>
            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.image}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 100,
  },
  textinput:{
    
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 8,
    width: "80%",
    paddingHorizontal: 8,

  },
  image: {
    width: '70%', 
    aspectRatio: 1, 
    borderRadius: 10,
    marginRight:20,
    
  },
});
