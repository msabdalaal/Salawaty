import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import countries from "@constants/countries.min.json";
import { useLogin } from "./providers/LoginProvider";

export default function ChooseCountry() {
  const [showCities, setShowCities] = useState(false);
  const [query, setQuery] = useState("");
  const { changeCity, changeCountry, country } = useLogin();

  function handleChangeCountry(country: string) {
    changeCountry(country);
    setShowCities(true);
    setQuery("");
  }
  function handleChangeCity(city: string) {
    changeCity(city);
    router.push("/(tabs)");
  }
  return (
    <LinearGradient colors={["#3EC0E9", "#347589"]} style={styles.container}>
      <Stack.Screen
        options={{
          title: `Choose Country`,
          presentation: "modal",
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          {({ pressed }) => (
            <FontAwesome
              style={[styles.goBack, { opacity: pressed ? 0.5 : 1 }]}
              name="arrow-left"
            />
          )}
        </Pressable>
        <View>
          <Text style={styles.title}>
            {!showCities ? "اختار البلد" : "اختار المدينة"}
          </Text>
        </View>
      </View>
      <TextInput
        style={styles.searchBar}
        value={query}
        onChangeText={setQuery}
        clearButtonMode="while-editing"
      />
      {showCities ? (
        <FlatList
          data={country && countries[country as keyof typeof countries]}
          renderItem={(item) =>
            item.item.toLowerCase().match(query.toLowerCase()) && (
              <Pressable
                style={styles.listItem}
                onPress={() => handleChangeCity(item.item)}
              >
                <Text style={styles.itemText}>{item.item}</Text>
              </Pressable>
            )
          }
          style={styles.list}
        />
      ) : (
        <FlatList
          data={Object.keys(countries)}
          renderItem={(item) =>
            item.item.toLowerCase().match(query.toLowerCase()) && (
              <Pressable
                style={styles.listItem}
                onPress={() => handleChangeCountry(item.item)}
              >
                <Text style={styles.itemText}>{item.item}</Text>
              </Pressable>
            )
          }
          style={styles.list}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    padding: 20,
  },
  header: {
    marginTop: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    marginBottom: 40,
  },
  title: {
    fontSize: 25,
    color: "white",
    fontFamily: "CairoRegular",
    fontWeight: "600",
  },
  goBack: {
    textAlign: "left",
    color: "white",
    fontSize: 25,
  },
  searchBar: {
    width: "100%",
    fontSize: 16,
    fontFamily: "CairoRegular",
    fontWeight: "600",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 10,
  },
  list: {
    width: "100%",
  },
  listItem: {
    width: "100%",
    borderBottomWidth: 1,
    backgroundColor: "transparent",
    borderColor: "white",
  },
  itemText: {
    color: "white",
    marginVertical: 20,
    fontSize: 18,
    fontFamily: "CairoRegular",
    fontWeight: "600",
  },
});
