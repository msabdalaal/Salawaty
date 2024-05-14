import { SetStateAction, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import {} from "expo-notifications";
import { isDevice } from "expo-device";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    // alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      bypassDnd: true,
    });
  }

  return token;
}
export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListenerRef = useRef<Notifications.Subscription | null>(
    null
  );
  const responseListenerRef = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListenerRef.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListenerRef.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response);
      });

    return () => {
      if (notificationListenerRef.current) {
        Notifications.removeNotificationSubscription(
          notificationListenerRef.current
        );
      }
      if (responseListenerRef.current) {
        Notifications.removeNotificationSubscription(
          responseListenerRef.current
        );
      }
    };
  }, []);

  return null;
}

export async function schedulePushNotification(
  identifier: string,
  title: string,
  body: string,
  time: number
) {
  //   console.log("hello");

  const notificationTime = new Date();
  //   var days = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];
  //   const weekday = days.indexOf(day) + 1;
  const id = await Notifications.scheduleNotificationAsync({
    identifier,
    content: {
      title: title,
      body: body,
      //   sound: "../../assets/sound/takbeer.mp3",
    },
    trigger: {
      seconds: time,
      repeats: false,
    },
  });
  //   console.log("notif id on scheduling", id, title);
  return id;
}

export async function cancelNotification(notifId: string) {
  await Notifications.cancelScheduledNotificationAsync(notifId);
}
