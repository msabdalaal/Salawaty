import { Redirect, Stack, router, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import db from "../../db/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CheckMark, prayersDone } from "..";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

const DayDetailScreen = () => {
  const [prayersDone, setPrayersDone] = useState<prayersDone>({
    fajr: {
      jamaah: false,
      fard: false,
      kadaa: false,
    },
    duhr: {
      jamaah: false,
      fard: false,
      kadaa: false,
    },
    asr: {
      jamaah: false,
      fard: false,
      kadaa: false,
    },
    maghrib: {
      jamaah: false,
      fard: false,
      kadaa: false,
    },
    ishaa: {
      jamaah: false,
      fard: false,
      kadaa: false,
    },
  });

  const { id } = useLocalSearchParams();

  const Year = id.toString().slice(0, 4);
  const Month = Number(id.toString().slice(5, 7)).toString();
  const Day = Number(id.toString().slice(8, 10)).toString();
  const date = `${Year}/${Month}/${Day}`;

  async function getData() {
    const docSnap = await getDoc(doc(db, `${date}`, "prayers"));
    if (docSnap.exists()) {
      setPrayersDone(docSnap.data());
    } else {
      alert("لا يوجد بيانات لهذ اليوم");
    }
  }

  useEffect(() => {
    getData();
  }, []);

    function goBack() {
        router.replace('/FollowTableScreen/FollowTable');
    }

  return (
    <LinearGradient colors={["#3EC0E9", "#347589"]} style={styles.container}>
      <Pressable onPress={() => goBack()} style={styles.goButton}>
      {({ pressed }) => (
              <FontAwesome style={[styles.goBack, {opacity: pressed? 0.5 : 1}]}  name="arrow-left" />
            )}
        
      </Pressable>
      <Stack.Screen
        options={{
          title: ``,
          presentation: "modal",
          headerShown: false,
        }}
      />

      <Text style={styles.heading}>جدول متابعة الصلاة</Text>
      <Text style={styles.heading}>لتاريخ {date}</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View
            style={[
              styles.tableCell,
              styles.firstCol,
              styles.topRightCell,
              styles.firstRow,
            ]}
          >
            <Text style={[styles.cellText, styles.firstColText]}>الحالة</Text>
          </View>
          <Pressable style={[styles.tableCell, styles.firstRow]}>
            <Text style={[styles.cellText]}>جماعة</Text>
          </Pressable>
          <Pressable
            style={[styles.tableCell, styles.firstRow, styles.firstRow]}
          >
            <Text style={[styles.cellText]}>فرد</Text>
          </Pressable>
          <Pressable
            style={[
              styles.tableCell,
              styles.topLeftCell,
              styles.firstRow,
              styles.lastCol,
            ]}
          >
            <Text style={[styles.cellText]}>قضاء</Text>
          </Pressable>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.firstCol]}>
            <Text style={[styles.cellText, styles.firstColText]}>الصبح</Text>
          </View>
          <Pressable style={styles.tableCell}>
            {prayersDone.fajr.jamaah && <CheckMark />}
          </Pressable>
          <Pressable style={styles.tableCell}>
            {prayersDone.fajr.fard && <CheckMark />}
          </Pressable>
          <Pressable style={[styles.tableCell, styles.lastCol]}>
            {prayersDone.fajr.kadaa && <CheckMark />}
          </Pressable>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.firstCol]}>
            <Text style={[styles.cellText, styles.firstColText]}>الظهر</Text>
          </View>
          <Pressable style={styles.tableCell}>
            {prayersDone.duhr.jamaah && <CheckMark />}
          </Pressable>
          <Pressable style={styles.tableCell}>
            {prayersDone.duhr.fard && <CheckMark />}
          </Pressable>
          <Pressable style={[styles.tableCell, styles.lastCol]}>
            {prayersDone.duhr.kadaa && <CheckMark />}
          </Pressable>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.firstCol]}>
            <Text style={[styles.cellText, styles.firstColText]}>العصر</Text>
          </View>
          <Pressable style={styles.tableCell}>
            {prayersDone.asr.jamaah && <CheckMark />}
          </Pressable>
          <Pressable style={styles.tableCell}>
            {prayersDone.asr.fard && <CheckMark />}
          </Pressable>
          <Pressable style={[styles.tableCell, styles.lastCol]}>
            {prayersDone.asr.kadaa && <CheckMark />}
          </Pressable>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.firstCol]}>
            <Text style={[styles.cellText, styles.firstColText]}>المغرب</Text>
          </View>
          <Pressable style={styles.tableCell}>
            {prayersDone.maghrib.jamaah && <CheckMark />}
          </Pressable>
          <Pressable style={styles.tableCell}>
            {prayersDone.maghrib.fard && <CheckMark />}
          </Pressable>
          <Pressable style={[styles.tableCell, styles.lastCol]}>
            {prayersDone.maghrib.kadaa && <CheckMark />}
          </Pressable>
        </View>
        <View style={styles.tableRow}>
          <View
            style={[
              styles.tableCell,
              styles.firstCol,
              styles.bottomRightCell,
              styles.lastRow,
            ]}
          >
            <Text style={[styles.cellText, styles.firstColText]}>العشاء</Text>
          </View>
          <Pressable style={[styles.tableCell, styles.lastRow]}>
            {prayersDone.ishaa.jamaah && <CheckMark />}
          </Pressable>
          <Pressable style={[styles.tableCell, styles.lastRow]}>
            {prayersDone.ishaa.fard && <CheckMark />}
          </Pressable>
          <Pressable
            style={[
              styles.tableCell,
              styles.lastCol,
              styles.lastRow,
              styles.bottomLeftCell,
            ]}
          >
            {prayersDone.ishaa.kadaa && <CheckMark />}
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    height: "100%",
  },
  goBack: {
    textAlign: "left",
    color: "white",
    fontSize: 25,
  },
  goButton:{
    position: "absolute",
    width:"100%",
    top:0,
    left: 20,
    marginTop:40,
  },
  heading: {
    fontSize: 30,
    color: "white",
    fontFamily: "CairoRegular",
    fontWeight: "600",
  },
  table: {
    marginTop: 20,
    width: "100%",
  },
  tableCell: {
    width: "25%",
    height: 50,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    textAlign: "center",
    verticalAlign: "bottom",
    fontFamily: "CairoRegular",
    fontWeight: "600",
  },
  checkMarkBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6FBDD6",
  },
  checkMark: {
    color: "white",
    fontSize: 40,
  },

  tableRow: {
    flexDirection: "row-reverse",
  },
  firstCol: {
    backgroundColor: "#6FBDD6",
    borderRightWidth: 0,
  },
  lastCol: {
    borderLeftWidth: 0,
  },
  firstRow: {
    borderTopWidth: 0,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  firstColText: {
    color: "black",
  },
  topRightCell: {
    borderTopEndRadius: 25,
  },
  bottomRightCell: {
    borderBottomEndRadius: 25,
  },
  topLeftCell: {
    borderTopStartRadius: 25,
  },
  bottomLeftCell: {
    borderBottomStartRadius: 25,
    overflow: "hidden",
  },
});

export default DayDetailScreen;
