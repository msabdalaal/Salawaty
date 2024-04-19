import { Alert, Platform, Pressable, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useLogin } from "./providers/LoginProvider";

export default function ModalScreen() {
  const { loggedin, changeLogin } = useLogin();

  function goBack() {
    router.back();
  }
  function logOut() {

    if (Platform.OS == "android") {
      Alert.alert("تسجيل الخروج", "هل تريد تسجيل الخروج ؟", [
        {
          text: "لا",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "نعم",
          onPress: () => {
            changeLogin(false);
            router.push("/");
          },
        },
      ]);
    } else if (confirm("هل تريد تسجيل الخروج ؟")) {
      changeLogin(false);
      router.push("/");
    }
  }

  return (
    <LinearGradient colors={["#3EC0E9", "#347589"]} style={styles.container}>
      <Stack.Screen
        options={{
          title: ``,
          presentation: "modal",
          headerShown: false,
        }}
      />
      <View style={styles.header}>
      <Pressable onPress={() => goBack()}>
      {({ pressed }) => (
              <FontAwesome style={[styles.goBack, {opacity: pressed? 0.5 : 1}]}  name="arrow-left" />
            )}
        
      </Pressable>
        <FontAwesome name="user-circle" style={styles.profilePic} />
      </View>
      <Text style={styles.username}>محمد سيد</Text>
      <View style={styles.item}>
        <Pressable onPress={() => logOut()}>
          <Text style={styles.itemText}>تسجيل الخروج</Text>
        </Pressable>
      </View>
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
  },
  profilePic: {
    fontSize: 80,
    color: "white",
  },
  goBack: {
    textAlign: "left",
    color: "white",
    fontSize: 25,
  },
  username: {
    fontSize: 25,
    color: "white",
    fontFamily: "CairoRegular",
    fontWeight: "600",
  },
  item: {
    width: "100%",
    marginTop: 20,
    borderTopWidth: 1,
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
