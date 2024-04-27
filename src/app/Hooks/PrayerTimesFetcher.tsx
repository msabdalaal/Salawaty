import React, { useState, useEffect } from "react";
import { useLogin } from "../providers/LoginProvider";

function PrayerTimesFetcher(): string[] | null {
  const [prayerTimes, setPrayerTimes] = useState<string[] | null>(null);
  const { city, country } = useLogin();

  useEffect(() => {
    if (city) {
      const fetchPrayerTimes = async () => {
        try {
          console.log(
            `https://api.aladhan.com/v1/timingsByAddress/today?address=${city},${country}`
          );

          const response = await fetch(
            `https://api.aladhan.com/v1/timingsByAddress/today?address=${city},${country}`
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
    }
  }, [city]);

  return prayerTimes;
}

export default PrayerTimesFetcher;
