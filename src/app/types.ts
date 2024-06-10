import { ImageSourcePropType } from "react-native";
import Notifications from "expo-notifications";

export interface prayerTimes {
  [Salah: string]: string;
}
export interface neededPrayerTimes {
  [Salah: string]: string | null;
}
export interface neededDate {
  [date: string]: string | null;
}

export interface prayer {
  icon: ImageSourcePropType;
  prayerTime: neededPrayerTimes[""];
  name: string;
}

export interface prayersDone {
  [salah: string]: {
    [type: string]: boolean;
  };
}

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}

export type LoginType = {
  loggedin: boolean;
  profilePic: string | null;
  displayName: string | null;
  uid: string | null;
  country: string | null;
  city: string | null;
  changeLogin: (state: boolean) => void;
  changeCountry: (country: string | null) => void;
  changeCity: (city: string | null) => void;
  changeDisplayName: (displayName: string | null) => void;
  changeProfilePic: (url: string | null) => void;
};