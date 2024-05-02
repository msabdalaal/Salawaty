import { StyleSheet, Pressable, Dimensions } from "react-native";
import { Text, View } from "@Components/Themed";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, router } from "expo-router";
import DatePicker from "react-native-modern-datepicker";
import { SetStateAction, useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import db from "@/app/db/firestore";
import { doc, getDoc } from "firebase/firestore";
import Header from "@Components/Header";
import { useLogin } from "@/app/providers/LoginProvider";

export default function FollowTableScreen() {
  const { uid } = useLogin();
  const Month = new Date().getMonth() + 1;
  const Year = new Date().getFullYear();
  const Day = new Date().getDate();
  const today = `${Year}/${Month}/${Day}`;
  let [streak, setStreak] = useState(0);
  let [loading, setLoading] = useState(true);

  async function getData() {
    let docSnap;
    let counter = 0;
    for (let day = Day; day > 0; day--) {
      docSnap = await getDoc(doc(db, `${Year}/${Month}/${day}`, `${uid}`));
      if (docSnap.exists()) {
        if (docSnap.data()["dayDone"]["isDone"] == true) {
          counter++;
        }
      } else {
      }
    }
    setLoading(false);
    setStreak(counter);
  }

  useEffect(() => {
    getData();
  }, []);

  function handleSelectDate(date: SetStateAction<string>): void {
    const pageName = date.toString().slice(0, 10).split("/");
    router.push(`/FollowTableScreen/${pageName}`);
  }
  const windowWidth = Dimensions.get("window").width;
  return (
    <LinearGradient colors={["#3EC0E9", "#347589"]} style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.heading}>جدول متابعة الصلاة</Text>
      <Header />
      <View style={styles.followTable}>
        <DatePicker
          selected={today}
          mode="calendar"
          style={styles.datePicker}
          onDateChange={(date) => handleSelectDate(date)}
        />
      </View>
      <Text style={[styles.heading, { fontSize: 20, marginTop: 20 }]}>
        المواظبة على الصلاة هذا الشهر
      </Text>
      <Text
        style={[styles.heading, { fontSize: 20 }]}
      >{`${streak}/${Day}`}</Text>
      {loading ? (
        <Progress.Bar
          indeterminate
          progress={streak / Day}
          width={windowWidth - 40}
          style={styles.progress}
          height={20}
          color="#3DB3D8"
          unfilledColor="#fff"
          borderColor="#fff"
        />
      ) : (
        <Progress.Bar
          progress={streak / Day}
          style={styles.progress}
          width={windowWidth - 40}
          height={20}
          color="#3DB3D8"
          unfilledColor="#fff"
          borderColor="#fff"
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 80,
  },
  heading: {
    fontSize: 30,
    color: "white",
    fontFamily: "Bold_Font",
  },
  followTable: {
    marginTop: 20,
    width: "100%",
    height: 350,
    borderRadius: 25,
    overflow: "hidden",
  },
  datePicker: {
    width: "100%",
    height: "100%",
    fontSize: 20,
  },
  progress: {
    borderRadius: 25,
    marginTop: 20,
  },
});
