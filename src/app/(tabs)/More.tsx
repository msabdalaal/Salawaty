import { SafeAreaView, StyleSheet } from "react-native";
import { Text, View } from "@Components/Themed";
import { LinearGradient } from "expo-linear-gradient";

export default function TabTwoScreen() {
  return (
    <LinearGradient colors={["#3EC0E9", "#347589"]} style={styles.container}>
      <SafeAreaView>
        <Text style={styles.heading}>المزيد</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    color: "white",
    fontFamily: "Regular_Font",
  },
});
