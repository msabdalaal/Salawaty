import EditScreenInfo from "@Components/EditScreenInfo";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Fajr from "@assets/images/fajr.png";
import duhr from "@assets/images/duhr.png";
import asr from "@assets/images/asr.png";
import maghrib from "@assets/images/maghrib.png";
import ishaa from "@assets/images/ishaa.png";
import { FC } from "react";
import { PrayerTimes, neededPrayerTimes } from "@Functions/NextPrayer";

interface Prayer {
  icon: ImageSourcePropType;
  prayerTime: neededPrayerTimes[""];
  name: string,
}

function convertTo12HourFormat(time: string | null): string {
  if (!time) return "";
  const [hours, minutes] = time.split(":").map(Number);
  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    throw new Error("Invalid time format");
  }
  let hours12 = hours % 12 || 12;
  const period = hours < 12 ? "AM" : "PM";
  const time12HourFormat = `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
  return time12HourFormat;
}

const Prayer: FC<Prayer> = (props): JSX.Element => {
  const time12 = convertTo12HourFormat(props.prayerTime);
  return (
    <View style={styles.prayer}>
      <LinearGradient colors={["#2D7A93", "#1E596B","#1C4D5C"]} style={styles.iconContainer}>
        <Image resizeMode="contain" source={props.icon} style={styles.icon} />
      </LinearGradient>
      <Text style={styles.prayerName}>{props.name}</Text>
      <Text>{time12}</Text>
    </View>
  );
};

export default function PrayerTimesScreen() {
  const neededPrayerTimes: neededPrayerTimes = PrayerTimes();

  return (
    <LinearGradient colors={["#3EC0E9", "#347589"]} style={styles.container}>
      <View style={styles.date}>
        <Text style={styles.dateText}>30 رمضان 1445</Text>
        <Text style={styles.dateText}>9 ابريل 2024</Text>
      </View>
      <View style={styles.prayerTimes}>
        <View style={styles.prayerRow}>
          <Prayer prayerTime={neededPrayerTimes["Fajr"]} icon={Fajr} name='Fajr' />
          <Prayer prayerTime={neededPrayerTimes["Duhr"]} icon={duhr} name='Duhr' />
          <Prayer prayerTime={neededPrayerTimes["Asr"]} icon={asr} name='Asr' />
        </View>
        <View style={styles.prayerRow}>
          <Prayer prayerTime={neededPrayerTimes["Maghrib"]} icon={maghrib} name='Maghrib' />
          <Prayer prayerTime={neededPrayerTimes["Ishaa"]} icon={ishaa} name='Ishaa' />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  date: {
    width: 320,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  dateText: {
    fontFamily: "CairoRegular",
    fontWeight: "600",
    fontSize: 20,
  },
  prayerTimes: {
    width: 320,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
    marginVertical: 20,
    borderRadius: 25,
  },
  prayer: {
    justifyContent: "center",
    alignItems: "center",
  },
  prayerRow: {
    flexDirection: "row",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 999,
    marginHorizontal: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
  prayerName:{
    fontFamily: 'CairoRegular',
    fontWeight: '600',
    fontSize:20,
  },
});
