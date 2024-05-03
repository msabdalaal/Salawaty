import Notification from "@Functions/Notifications";
import { schedulePushNotification } from "@Functions/Notifications";
import { useEffect } from "react";
import { useLogin } from "../providers/LoginProvider";

const Month = new Date().getMonth() + 1;
const Year = new Date().getFullYear();
const Day = new Date().getDate();
const today = `${Year}/${Month}/${Day}`;

function secondsUntilTime(timeString: string) {
  const [hours, minutes] = timeString.split(":").map(Number);
  const now = new Date();
  const targetTime = new Date();

  targetTime.setHours(hours, minutes, 0, 0);

  // Calculate the difference in seconds
  const diffInSeconds = (targetTime.getTime() - now.getTime()) / 1000;

  // If the difference is negative, it means the time has already passed
  if (diffInSeconds < 0) {
    return -1;
  }

  return Math.floor(diffInSeconds); // Return the floor of the difference in seconds
}

// Example usage:
// Outputs the number of seconds until 14:23 today, or -1 if it's already past

export const SchedulePrayersNotifications = (
  prayer: string,
  timeString: string
) => {
  const { city } = useLogin();

  Notification();

  useEffect(() => {
    if (timeString) {
      let time = secondsUntilTime(timeString);
      if (time != -1) {
        schedulePushNotification(
          `${today}/${prayer}`,
          `حان موعد اذان ${prayer}`,
          `حسب التوقيت المحلي لمدينة ${city}`,
          time
        );
      }
    }
  }, [timeString]);
};
