import { useEffect, useState } from "react";

interface PrayerTimes {
  [Salah: string]: string;
}
export interface neededPrayerTimes {
  [Salah: string]: string | null;

}

export const PrayerTimes= ()=>{
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>();

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          "https://api.aladhan.com/v1/timingsByAddress/today?address=Cairo,EG"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPrayerTimes(data.data.timings);
      } catch (error) {}
    };
    fetchPrayerTimes();
    return () => {};
  }, []);

  const neededPrayerTimes: neededPrayerTimes = {
    "Fajr": prayerTimes? prayerTimes["Fajr"]: null,
    "Duhr": prayerTimes? prayerTimes["Dhuhr"]: null,
    "Asr": prayerTimes? prayerTimes["Asr"]: null,
    "Maghrib": prayerTimes? prayerTimes["Maghrib"]: null,
    "Ishaa": prayerTimes? prayerTimes["Isha"]: null,
  };

  return neededPrayerTimes
}

const NextPrayer = (): [string | null, string] => {

const neededPrayerTimes:neededPrayerTimes =PrayerTimes();
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
  let nextPrayerName: string = "";
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
  const output:[string | null, string] = [neededPrayerTimes[nextPrayerName], nextPrayerName]
  return output ;
};

export default NextPrayer;
