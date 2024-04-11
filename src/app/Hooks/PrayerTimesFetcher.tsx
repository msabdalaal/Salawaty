import React, { useState, useEffect } from 'react';

function PrayerTimesFetcher(): string[] | null {
  const [prayerTimes, setPrayerTimes] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch("https://api.aladhan.com/v1/timingsByAddress/today?address=Cairo,EG");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPrayerTimes(data.data.timings);
      } catch (error) {
      }
    };

    fetchPrayerTimes();

    // Cleanup function
    return () => {
      // Any cleanup code here, if necessary
    };
  }, []); // Empty dependency array means this effect will only run once, equivalent to componentDidMount

  return prayerTimes;
}

export default PrayerTimesFetcher;
