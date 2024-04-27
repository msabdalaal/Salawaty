import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  Alert,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import NextPrayer from "../Functions/NextPrayer";
import { LinearGradient } from "expo-linear-gradient";
import db from "../db/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useLogin } from "../providers/LoginProvider";
import Header from "@Components/Header";
import TimeRemaining from "@Components/TimeRemaining";

export interface prayersDone {
  [salah: string]: {
    [type: string]: boolean;
  };
}

export function CheckMark() {
  return (
    <View style={styles.checkMarkBackground}>
      <AntDesign
        style={styles.checkMark}
        name="check"
        size={24}
        color="black"
      />
    </View>
  );
}

export default function HomeScreen(this: any) {
  const { loggedin, uid, city } = useLogin();

  const [nextPrayerTime, nextPrayerName] = NextPrayer();
  const [prayersDone, setPrayersDone] = useState<prayersDone>({
    fajr: {
      jamaah: false,
      fard: false,
      kadaa: false,
      done: false,
    },
    duhr: {
      jamaah: false,
      fard: false,
      kadaa: false,
      done: false,
    },
    asr: {
      jamaah: false,
      fard: false,
      kadaa: false,
      done: false,
    },
    maghrib: {
      jamaah: false,
      fard: false,
      kadaa: false,
      done: false,
    },
    ishaa: {
      jamaah: false,
      fard: false,
      kadaa: false,
      done: false,
    },
    dayDone: {
      isDone: false,
    },
  });

  const [showSave, setShowSave] = useState(false);

  const Month = new Date().getMonth() + 1;
  const Year = new Date().getFullYear();
  const Day = new Date().getDate();
  const today = `${Year}/${Month}/${Day}`;

  async function getData() {
    const docSnap = await getDoc(doc(db, `${today}/${uid}`));
    if (docSnap.exists()) {
      setPrayersDone(docSnap.data());
    } else {
      // alert("خطأ في استعادة البيانات");
    }
  }

  useEffect(() => {
    if (uid) getData();
  }, [uid]);

  async function storeData(data: object, dataPath: string) {
    await setDoc(doc(db, dataPath, `${uid}`), data);
  }
  const handleChangePrayer = (salah: any, type: any) => {
    const data: prayersDone = {
      ...prayersDone,
      [salah]: {
        jamaah: false,
        fard: false,
        kadaa: false,
        [type]: !prayersDone[salah][type],
      },
    };
    if (data[salah]["jamaah"] || data[salah]["fard"] || data[salah]["kadaa"]) {
      data[salah]["done"] = true;
    } else {
      data[salah]["done"] = false;
    }

    if (
      data["fajr"]["done"] &&
      data["duhr"]["done"] &&
      data["asr"]["done"] &&
      data["maghrib"]["done"] &&
      data["ishaa"]["done"]
    ) {
      data["dayDone"]["isDone"] = true;
    } else {
      data["dayDone"]["isDone"] = false;
    }

    setPrayersDone(data);
    setShowSave(true);
  };

  const handleSavePrayers = () => {
    if (Platform.OS == "android") {
      Alert.alert("تأكيد الحفظ", "هل تريد الحفظ ؟", [
        {
          text: "لا",
          style: "destructive",
        },
        {
          text: "نعم",
          onPress: () => {
            storeData(prayersDone, `${today}`);
            setShowSave(false);
          },
        },
      ]);
    } else if (confirm("هل تريد الحفظ ؟")) {
      storeData(prayersDone, `${today}`);
      setShowSave(false);
    }
  };

  if (!loggedin) {
    return <Redirect href="../Login" />;
  }  
  return (
    <LinearGradient colors={["#3EC0E9", "#347589"]} style={styles.container}>
      <Header />
      <Text style={[styles.heading, { marginTop: 40 }]}>الصلاة القادمة</Text>
        <View style={styles.whiteContainer}>
      {city != "" ? (
        <>
          <Text style={styles.containerHeading}>صلاة، {nextPrayerName}</Text>
          <TimeRemaining />
        </>
      ) : (
        <Text style={styles.containerHeading}>الرجاء اختيار البلد والمدينة</Text>
      )}
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
            {prayersDone.fajr.jamaah && <CheckMark />}
          </Pressable>
          <Pressable
            style={styles.tableCell}
            onPress={() => handleChangePrayer("fajr", "fard")}
          >
            {prayersDone.fajr.fard && <CheckMark />}
          </Pressable>
          <Pressable
            style={[styles.tableCell, styles.lastCol]}
            onPress={() => handleChangePrayer("fajr", "kadaa")}
          >
            {prayersDone.fajr.kadaa && <CheckMark />}
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
            {prayersDone.duhr.jamaah && <CheckMark />}
          </Pressable>
          <Pressable
            style={styles.tableCell}
            onPress={() => handleChangePrayer("duhr", "fard")}
          >
            {prayersDone.duhr.fard && <CheckMark />}
          </Pressable>
          <Pressable
            style={[styles.tableCell, styles.lastCol]}
            onPress={() => handleChangePrayer("duhr", "kadaa")}
          >
            {prayersDone.duhr.kadaa && <CheckMark />}
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
            {prayersDone.asr.jamaah && <CheckMark />}
          </Pressable>
          <Pressable
            style={styles.tableCell}
            onPress={() => handleChangePrayer("asr", "fard")}
          >
            {prayersDone.asr.fard && <CheckMark />}
          </Pressable>
          <Pressable
            style={[styles.tableCell, styles.lastCol]}
            onPress={() => handleChangePrayer("asr", "kadaa")}
          >
            {prayersDone.asr.kadaa && <CheckMark />}
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
            {prayersDone.maghrib.jamaah && <CheckMark />}
          </Pressable>
          <Pressable
            style={styles.tableCell}
            onPress={() => handleChangePrayer("maghrib", "fard")}
          >
            {prayersDone.maghrib.fard && <CheckMark />}
          </Pressable>
          <Pressable
            style={[styles.tableCell, styles.lastCol]}
            onPress={() => handleChangePrayer("maghrib", "kadaa")}
          >
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
          <Pressable
            style={[styles.tableCell, styles.lastRow]}
            onPress={() => handleChangePrayer("ishaa", "jamaah")}
          >
            {prayersDone.ishaa.jamaah && <CheckMark />}
          </Pressable>
          <Pressable
            style={[styles.tableCell, styles.lastRow]}
            onPress={() => handleChangePrayer("ishaa", "fard")}
          >
            {prayersDone.ishaa.fard && <CheckMark />}
          </Pressable>
          <Pressable
            style={[
              styles.tableCell,
              styles.lastCol,
              styles.lastRow,
              styles.bottomLeftCell,
            ]}
            onPress={() => handleChangePrayer("ishaa", "kadaa")}
          >
            {prayersDone.ishaa.kadaa && <CheckMark />}
          </Pressable>
        </View>
      </View>
      {showSave && (
        <Pressable
          style={[styles.buttonPosition, styles.boxShadow]}
          onPress={handleSavePrayers}
        >
          <LinearGradient
            colors={["#2D7A93", "#1E596B", "#1C4D5C"]}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonText}>save</Text>
          </LinearGradient>
        </Pressable>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
    paddingTop: 40,
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
    width: "100%",
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
  boxShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.5,
  },
  buttonStyle: {
    borderRadius: 10,
    padding: 15,
    alignContent: "center",
    justifyContent: "center",
  },
  buttonPosition: {
    position: "absolute",
    top: "52%",
    right: 5,
  },
  buttonText: {
    fontFamily: "CairoRegular",
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
});
