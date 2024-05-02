// import { useState, useEffect } from "react";
// import { useLogin } from "../providers/LoginProvider";
// import { getDataLocally, storeDataLocally } from "@Functions/localStorage";

// function PrayerTimesFetcher(): string[] | null {
//   const [prayerTimes, setPrayerTimes] = useState<string[] | null>(null);
//   const { city, country } = useLogin();

//   useEffect(() => {
//     if (city) {
//       const fetchPrayerTimes = async () => {
//         try {
//           const response = await fetch(
//             `https://api.aladhan.com/v1/timingsByAddress/today?address=${city},${country}`
//           );
//           if (!response.ok) {
//             try {
//               const data = await getDataLocally("PrayerTimeFetch");
//               setPrayerTimes(data.timings);
//             } catch {
//               throw new Error("Connect to Internet");
//             }
//           }
//           const data = await response.json();
//           setPrayerTimes(data.data.timings);
//           storeDataLocally(data.data,"PrayerTimeFetch")
//         } catch (error) {}
//       };

//       fetchPrayerTimes();

//       return () => {};
//     }
//   }, [city]);

//   return prayerTimes;
// }

// export default PrayerTimesFetcher;
