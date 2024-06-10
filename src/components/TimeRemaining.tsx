import { Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import NextPrayer from "@Functions/NextPrayer";

export default function TimeRemaining() {
  let [nextPrayerTime, nextPrayerName] = NextPrayer();
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (nextPrayerTime) {
      const interval = setInterval(() => {
        let [remainingHours, remainingMinutes, remainingSeconds] =
          timeRemaning(nextPrayerTime);
        setHours(remainingHours);
        setMinutes(remainingMinutes);
        setSeconds(remainingSeconds);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [nextPrayerTime]);

  return (
    <>
      <Text style={styles.containerHeading}>صلاة، {nextPrayerName}</Text>

      <Text style={[styles.timeRemaining, { marginTop: 20 }]}>
        الوقت المتبقي:
      </Text>
      <Text style={[styles.timeRemaining, styles.timeText]}>
        {hours} ساعة : {minutes} دقيقة : {seconds}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  containerHeading: {
    fontSize: 30,
    fontFamily: "semiBold_Font",
  },
  timeRemaining: {
    fontSize: 20,
    fontFamily: "semiBold_Font",
  },
  timeText: { textAlign: "center", fontSize: 25, marginTop: 10 },
});

export function timeRemaning(nextPrayerTime: string | null) {
  const timeString: string | null = nextPrayerTime
    ? nextPrayerTime.toString()
    : null;

  let prayerTime = timeString?.split(":");

  let now = new Date();
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();
  let currentSecond = now.getSeconds();

  let remainingHours = Number(prayerTime ? prayerTime[0] : null) - currentHour;
  let remainingMinutes =
    Number(prayerTime ? prayerTime[1] : null) - currentMinute;
  let remainingSeconds = 0;

  if (remainingHours < 0) {
    remainingHours += 24;
  }

  if (remainingMinutes < 0) {
    remainingHours -= 1;
    remainingMinutes += 60;
  }
  remainingSeconds =
    remainingMinutes == 0 && remainingHours == 0
      ? 0
      : (remainingHours * 3600 + remainingMinutes * 60 - currentSecond) % 60;

  return [remainingHours, remainingMinutes, remainingSeconds];
}
