import EditScreenInfo from "@Components/EditScreenInfo";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  FlatList,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Fajr from "@assets/images/fajr.png";
import duhr from "@assets/images/duhr.png";
import asr from "@assets/images/asr.png";
import maghrib from "@assets/images/maghrib.png";
import ishaa from "@assets/images/ishaa.png";
import { FC } from "react";
import NextPrayer, {
  PrayerTimes,
  neededDate,
  neededPrayerTimes,
} from "@Functions/NextPrayer";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { username } from "./index";

interface Prayer {
  icon: ImageSourcePropType;
  prayerTime: neededPrayerTimes[""];
  name: string;
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
      <LinearGradient
        colors={["#2D7A93", "#1E596B", "#1C4D5C"]}
        style={[
          styles.iconContainer,
          NextPrayer()[1] == props.name ? styles.iconStroked : null,
        ]}
      >
        <Image resizeMode="contain" source={props.icon} style={styles.icon} />
      </LinearGradient>
      <Text style={styles.prayerName}>{props.name}</Text>
      <Text style={styles.prayerTime}>{time12}</Text>
    </View>
  );
};

export default function PrayerTimesScreen() {
  const neededPrayerTimes: neededPrayerTimes = PrayerTimes()[0];
  const neededDate: neededDate = PrayerTimes()[1];

  return (
    <LinearGradient colors={["#3EC0E9", "#347589"]} style={styles.container}>
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
      <Text style={styles.heading}>أوقات الصلاة</Text>
      <View style={styles.date}>
        <Text style={styles.dateText}>{neededDate["weekDay"]}</Text>
        <Text style={styles.dateText}>
          {neededDate["hijriDay"]} {neededDate["hijriMonth"]}{" "}
          {neededDate["hijriYear"]}
        </Text>
        <Text style={styles.dateText}>{neededDate["gregorianDate"]}</Text>
      </View>
      <View style={styles.prayerTimes}>
        <View style={styles.prayerRow}>
          <Prayer
            prayerTime={neededPrayerTimes["Fajr"]}
            icon={Fajr}
            name="الفجر"
          />
          <Prayer
            prayerTime={neededPrayerTimes["Dhuhr"]}
            icon={duhr}
            name="الظهر"
          />
          <Prayer
            prayerTime={neededPrayerTimes["Asr"]}
            icon={asr}
            name="العصر"
          />
        </View>
        <View style={styles.prayerRow}>
          <Prayer
            prayerTime={neededPrayerTimes["Maghrib"]}
            icon={maghrib}
            name="المغرب"
          />
          <Prayer
            prayerTime={neededPrayerTimes["Isha"]}
            icon={ishaa}
            name="العشاء"
          />
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
    paddingTop: 40,
  },
  header: {
    width: "100%",
    position: "absolute",
    top: 0,
    flexDirection: "row",
    marginTop: 40,
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
    marginTop: 40,
  },
  date: {
    width:"100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginTop: 20,
    padding: 15,
  },
  dateText: {
    fontFamily: "CairoRegular",
    fontWeight: "600",
    fontSize: 20,
    padding: 5,
  },
  prayerTimes: {
    width: "100%",
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
    flexDirection: "row-reverse",
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
    width: 40,
    height: 40,
  },
  iconStroked: {
    borderColor: "#3EC0E9",
    borderWidth: 3,
    borderRadius: 99,
  },
  prayerName: {
    fontFamily: "CairoRegular",
    fontWeight: "600",
    fontSize: 20,
  },
  prayerTime: {
    fontFamily: "CairoRegular",
    fontWeight: "600",
    fontSize: 14,
  },
});
