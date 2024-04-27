import { Text,StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import NextPrayer from '@Functions/NextPrayer';

export default function  TimeRemaining()  {
    const  [nextPrayerTime] = NextPrayer();
    // let [remainingHours, remainingMinutes] = timeRemaning(nextPrayerTime);
    const [hours,setHours] = useState<number>(0)
    const [minutes,setMinutes] = useState<number>(0)
    const [seconds,setSeconds] = useState<number>(0)


    useEffect(() => {
        if(nextPrayerTime){
        let [remainingHours, remainingMinutes,remainingSeconds] = timeRemaning(nextPrayerTime);
        setHours(remainingHours)
        setMinutes(remainingMinutes)
        setSeconds(remainingSeconds)
        const interval = setInterval(() => {
        let [remainingHours, remainingMinutes,remainingSeconds] = timeRemaning(nextPrayerTime);
            setHours(remainingHours)
            setMinutes(remainingMinutes)
            setSeconds(remainingSeconds)
        }, 1000);
      
        return () => clearInterval(interval);
        }
        
      }, [nextPrayerTime]);



    return (
        <><Text style={[styles.timeRemaining,{marginTop:15}]}>
        الوقت المتبقي:</Text>
      <Text style={[styles.timeRemaining,{textAlign:"center", fontSize:25}]}>
      {hours} ساعة : {minutes} دقيقة : {seconds}
      </Text>
      </>
    )
  }

  const styles = StyleSheet.create({
    timeRemaining: {
        fontSize: 20,
        fontFamily: "CairoRegular",
      },
  })

function timeRemaning(nextPrayerTime: string | null) {
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
    remainingSeconds = ((remainingHours * 3600) + (remainingMinutes * 60) - currentSecond) % 60;

    return [remainingHours, remainingMinutes, remainingSeconds];
  }