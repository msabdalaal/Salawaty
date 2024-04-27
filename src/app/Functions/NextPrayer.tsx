import { useEffect, useState } from "react";
import { useLogin } from "../providers/LoginProvider";

interface PrayerTimes {
  [Salah: string]: string;
}
export interface neededPrayerTimes {
  [Salah: string]: string | null;
}
export interface neededDate {
  [date: string]: string | null;
}

export const PrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>();
  const [date, setDate] = useState();
  const { city, country } = useLogin();
  useEffect(() => {
    if (city) {
      const fetchPrayerTimes = async () => {
        try {
          const response = await fetch(
            `https://api.aladhan.com/v1/timingsByAddress/today?address=${city},${country}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setPrayerTimes(data.data.timings);
          setDate(data.data.date);
        } catch (error) {}
      };
      fetchPrayerTimes();
      return () => {};
    }
    }, [city]);

  const neededPrayerTimes: neededPrayerTimes = {
    Fajr: prayerTimes ? prayerTimes["Fajr"] : null,
    Dhuhr: prayerTimes ? prayerTimes["Dhuhr"] : null,
    Asr: prayerTimes ? prayerTimes["Asr"] : null,
    Maghrib: prayerTimes ? prayerTimes["Maghrib"] : null,
    Isha: prayerTimes ? prayerTimes["Isha"] : null,
  };

  const neededDate: neededDate = {
    weekDay: date ? date["hijri"]["weekday"]["ar"] : null,
    hijriDay: date ? date["hijri"]["day"] : null,
    hijriMonth: date ? date["hijri"]["month"]["ar"] : null,
    hijriYear: date ? date["hijri"]["year"] : null,
    gregorianDate: date ? date["readable"] : null,
  };

  return [neededPrayerTimes, neededDate];
};

const NextPrayer = (): [string | null, string] => {
  const neededPrayerTimes: neededPrayerTimes = PrayerTimes()[0];
  function getCurrentTimeInMinutes(): number {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return hours * 60 + minutes;
  }

  const currentTimeInMinutes = getCurrentTimeInMinutes();

  function timeStringToMinutes(timeString: any): number {
    const [hoursStr, minutesStr] = timeString.split(":");
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    return hours * 60 + minutes;
  }

  const timeString = "10:35";
  const timeInMinutes = timeStringToMinutes(timeString);

  let nextPrayer = 0;
  let nextPrayerName: string = "Fajr";
  let nextPrayerTime = "";
  Object.values(neededPrayerTimes).map((value, id) => {
    if (timeStringToMinutes(value || "") < currentTimeInMinutes) {
      nextPrayer = id;
    }
  });

  nextPrayer++;
  Object.keys(neededPrayerTimes).map((value, id) => {
    if (id == nextPrayer) {
      nextPrayerName = value;
    }
  });

  let arabicNextPrayerName = "";

  switch (nextPrayerName) {
    case "Dhuhr":
      arabicNextPrayerName = "الظهر";
      break;
    case "Asr":
      arabicNextPrayerName = "العصر";
      break;
    case "Maghrib":
      arabicNextPrayerName = "المغرب";
      break;
    case "Fajr":
      arabicNextPrayerName = "الفجر";
      break;
    case "Isha":
      arabicNextPrayerName = "العشاء";
      break;
    default:
      break;
  }

  const output: [string | null, string] = [
    neededPrayerTimes[nextPrayerName],
    arabicNextPrayerName,
  ];
  return  output;
};

export default NextPrayer;
