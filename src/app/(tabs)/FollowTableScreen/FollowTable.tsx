import { StyleSheet, Pressable } from "react-native";
import { Text, View } from "@Components/Themed";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Stack, router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { username } from "..";
import DatePicker from "react-native-modern-datepicker";
import { SetStateAction } from "react";

import * as Progress from 'react-native-progress';

export default function FollowTableScreen() {

  const Month = new Date().getMonth() + 1;
  const Year = new Date().getFullYear();
  const Day = new Date().getDate();
  const today = `${Year}/${Month}/${Day}`;

  function handleSelectDate(date: SetStateAction<string>): void {
    const pageName = date.toString().slice(0, 10).split("/");
    router.push(`/FollowTableScreen/${pageName}`);
  }

  return (
    <LinearGradient colors={["#3EC0E9", "#347589"]} style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.heading}>جدول متابعة الصلاة</Text>

      <View style={styles.header}>
        <Link href="/Account" asChild>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="user-circle"
                size={30}
                style={{
                  marginRight: 15,
                  opacity: pressed ? 0.5 : 1,
                  color: "white",
                }}
              />
            )}
          </Pressable>
        </Link>
        <Text style={styles.welcome}>اهلا بك، {username}</Text>
      </View>
      <View style={styles.followTable}>
        <DatePicker
          selected={today}
          current={today}
          maximumDate={today}
          mode="calendar"
          style={styles.datePicker}
          onDateChange={(date) => handleSelectDate(date)}
        />
      </View>
      <Text style={[styles.heading,{fontSize:20, marginTop:20,}]}>المواظبة على الصلاة هذا الشهر</Text>
      <Text style={[styles.heading,{fontSize:20}]}>3/30</Text>
      <Progress.Bar progress={3/30} style={styles.progress} width={350} height={20} color="#3DB3D8" unfilledColor="#fff" borderColor="#fff"  />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 40,
  },
  header: {
    position: "absolute",
    backgroundColor: "transparent",
    top: 0,
    marginTop: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 30,
    color: "white",
    fontFamily: "CairoRegular",
    fontWeight: "600",
  },
  welcome: {
    fontSize: 20,
    alignSelf: "flex-end",
    fontFamily: "CairoRegular",
    fontWeight: "600",
    color: "white",
  },
  followTable: {
    marginTop:20,
    width: 350,
    height: 400,
    borderRadius: 25,
    overflow: "hidden",
  },
  datePicker:{
    width: "100%",
    height: "100%",
    fontSize: 20,
  },
  progress:{
    borderRadius: 25,
    marginTop: 20,
  }
});
