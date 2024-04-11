import { StyleSheet, Text, View, Pressable, Platform, Alert } from "react-native";
import { useState, useEffect } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import PrayerTimesFetcher from "../Hooks/PrayerTimesFetcher";
import NextPrayer from '../Functions/NextPrayer'
import { LinearGradient } from "expo-linear-gradient";
// import EditScreenInfo from "@Components/EditScreenInfo";
// import { ReactNode } from "react";

import db from "../db/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface prayersDone {
  [salah: string]: {
    [type: string]: boolean;
  };
}

function CheckMark(){
  return(
    <View style={styles.checkMarkBackground}>
              <AntDesign style={styles.checkMark} name="check" size={24} color="black" />
              </View>
  )
}

export default function HomeScreen(this: any) {

  const [nextPrayerTime, nextPrayerName]= NextPrayer()

  const [remainingHours,remainingMinutes]= timeRemaning(nextPrayerTime)
  
  const username: string = "محمد";

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

  const [showSave, setShowSave] = useState(false)

  async function getData() {
    const docSnap = await getDoc(doc(db, "PrayersDone", "prayers"));
    if (docSnap.exists()) {
      setPrayersDone(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      alert("couldn't find data");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function storeData(data: object, dataName: string) {
    await setDoc(doc(db, dataName, "prayers"), data);
  }

  const handleChangePrayer = (salah: any, type: any) => {
    setPrayersDone({
      ...prayersDone,
      [salah]: {
        jamaah: false,
        fard: false,
        kadaa: false,
        [type]: !prayersDone[salah][type],
      },
    });
    setShowSave(true)
  };

  const handleSavePrayers = () => {
    if(Platform.OS == "android"){
      Alert.alert('تأكيد الحفظ', 'هل تريد الحفظ ؟', [
        {
          text: 'Cancel',
          onPress:()=>{},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
          storeData(prayersDone, "PrayersDone");
          setShowSave(false)
        }},
      ]);
    }
    else if(confirm("هل تريد الحفظ ؟")){
      storeData(prayersDone, "PrayersDone");
          setShowSave(false)
    }
    }

  return (
    <LinearGradient colors={['#3EC0E9','#347589']} style={styles.container}>
      <View style={styles.header}>
        <Link href="/modal" asChild>
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
      <Text style={styles.heading}>الصلاة القادمة</Text>
      <View style={styles.whiteContainer}>
        <Text style={styles.containerHeading}>صلاة، {nextPrayerName}</Text>
        <Text style={styles.timeRemaining}>الوقت المتبقي: {remainingHours} ساعة و {remainingMinutes} دقيقة</Text>
      </View>
      <Text style={styles.heading}>جدول متابعة الصلاة</Text>
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
          <Pressable
            onPress={() => handleChangePrayer("fajr", "jamaah")}
            style={styles.tableCell}
          >
            {prayersDone.fajr.jamaah && (
              <CheckMark/>
            )}
          </Pressable>
          <Pressable
            style={styles.tableCell}
            onPress={() => handleChangePrayer("fajr", "fard")}
          >
            {prayersDone.fajr.fard && (
              <CheckMark/>
            )}
          </Pressable>
          <Pressable
            style={[styles.tableCell, styles.lastCol]}
            onPress={() => handleChangePrayer("fajr", "kadaa")}
          >
            {prayersDone.fajr.kadaa && (
              <CheckMark/>
            )}
          </Pressable>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.firstCol]}>
            <Text style={[styles.cellText, styles.firstColText]}>الظهر</Text>
          </View>
          <Pressable
            style={styles.tableCell}
            onPress={() => handleChangePrayer("duhr", "jamaah")}
          >
            {prayersDone.duhr.jamaah && (
              <CheckMark/>
            )}
          </Pressable>
          <Pressable
            style={styles.tableCell}
            onPress={() => handleChangePrayer("duhr", "fard")}
          >
            {prayersDone.duhr.fard && (
              <CheckMark/>
            )}
          </Pressable>
          <Pressable
            style={[styles.tableCell, styles.lastCol]}
            onPress={() => handleChangePrayer("duhr", "kadaa")}
          >
            {prayersDone.duhr.kadaa && (
              <CheckMark/>
            )}
          </Pressable>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.firstCol]}>
            <Text style={[styles.cellText, styles.firstColText]}>العصر</Text>
          </View>
          <Pressable
            style={styles.tableCell}
            onPress={() => handleChangePrayer("asr", "jamaah")}
          >
            {prayersDone.asr.jamaah && (
              <CheckMark/>
            )}
          </Pressable>
          <Pressable
            style={styles.tableCell}
            onPress={() => handleChangePrayer("asr", "fard")}
          >
            {prayersDone.asr.fard && (
              <CheckMark/>
            )}
          </Pressable>
          <Pressable
            style={[styles.tableCell, styles.lastCol]}
            onPress={() => handleChangePrayer("asr", "kadaa")}
          >
            {prayersDone.asr.kadaa && (
              <CheckMark/>
            )}
          </Pressable>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.firstCol]}>
            <Text style={[styles.cellText, styles.firstColText]}>المغرب</Text>
          </View>
          <Pressable
            style={styles.tableCell}
            onPress={() => handleChangePrayer("maghrib", "jamaah")}
          >
            {prayersDone.maghrib.jamaah && (
              <CheckMark/>
            )}
          </Pressable>
          <Pressable
            style={styles.tableCell}
            onPress={() => handleChangePrayer("maghrib", "fard")}
          >
            {prayersDone.maghrib.fard && (
              <CheckMark/>
            )}
          </Pressable>
          <Pressable
            style={[styles.tableCell, styles.lastCol]}
            onPress={() => handleChangePrayer("maghrib", "kadaa")}
          >
            {prayersDone.maghrib.kadaa && (
              <CheckMark/>
            )}
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
          <Pressable
            style={[styles.tableCell, styles.lastRow]}
            onPress={() => handleChangePrayer("ishaa", "jamaah")}
          >
            {prayersDone.ishaa.jamaah && (
              <CheckMark/>
            )}
          </Pressable>
          <Pressable
            style={[styles.tableCell, styles.lastRow]}
            onPress={() => handleChangePrayer("ishaa", "fard")}
          >
            {prayersDone.ishaa.fard && (
              <CheckMark/>
            )}
          </Pressable>
          <Pressable
            style={[
              styles.tableCell,
              styles.bottomLeftCell,
              styles.lastCol,
              styles.lastRow,
            ]}
            onPress={() => handleChangePrayer("ishaa", "kadaa")}
          >
            {prayersDone.ishaa.kadaa && (
              <CheckMark/>
            )}
          </Pressable>
        </View>
      </View>
      {showSave && <Pressable onPress={handleSavePrayers}>
        <LinearGradient
          colors={["#2D7A93", "#1E596B", "#1C4D5C"]}
          style={[styles.button, styles.boxShadow]}
        >
          <Text style={styles.buttonText}>save</Text>
        </LinearGradient>
      </Pressable>}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#3789A3",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    marginTop: 40,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "space-between",
  },
  welcome: {
    fontSize: 20,
    alignSelf: "flex-end",
    fontFamily: "CairoRegular",
    fontWeight: "600",
    color: "white",
  },
  heading: {
    fontSize: 30,
    color: "white",
    fontFamily: "CairoRegular",
    fontWeight: "600",
  },
  whiteContainer: {
    backgroundColor: "white",
    margin: 20,
    padding: 25,
    borderRadius: 25,
    width: 320,
  },
  containerHeading: {
    fontSize: 30,
    fontFamily: "CairoRegular",
    fontWeight: "600",
  },
  timeRemaining: {
    fontSize: 20,
    marginTop: 15,
    fontFamily: "CairoRegular",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  table: {
    marginTop: 20,
  },
  tableCell: {
    width: 80,
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
  checkMarkBackground:{
    width:'100%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6FBDD6'
  },
  checkMark:{
    color: 'white',
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
  },
  boxShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.5,
  },
  button: {
    position: "relative",
    top: -370,
    right: -160,
    backgroundColor: "#1E596B",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    width: 50,
  },
  buttonText: {
    fontFamily: "CairoRegular",
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
});


function timeRemaning(nextPrayerTime: string | null){
  const timeString:string | null = nextPrayerTime?  nextPrayerTime.toString(): null;

  let prayerTime= timeString?.split(":");


  let now = new Date();
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();

  let remainingHours= Number(prayerTime ? prayerTime[0] : null) - currentHour;
  let remainingMinutes= Number(prayerTime ? prayerTime[1] : null) - currentMinute;


  if(remainingHours < 0){
    remainingHours += 24;
  }

  if(remainingMinutes < 0){
    remainingHours -= 1;
    remainingMinutes += 60
  }

  return [remainingHours,remainingMinutes]
}
