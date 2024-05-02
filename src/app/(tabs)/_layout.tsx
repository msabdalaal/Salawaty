import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Colors from "@constants/Colors";
import { useColorScheme } from "@Components/useColorScheme";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarActiveBackgroundColor: "#3DB3D8",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1C4D5C",
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-around",
          bottom: 16,
          right: 20,
          left: 20,
          borderRadius: 20,
          height: 50,
          overflow: "hidden",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: `الرئيسية`,
          tabBarIcon: () => <TabBarIcon name="home" color={"#fff"} />,
        }}
      />
      <Tabs.Screen
        name="PrayerTimes"
        options={{
          title: "أوقات الصلاة",
          tabBarIcon: () => <TabBarIcon name="clock-o" color={"#fff"} />,
        }}
      />
      <Tabs.Screen
        name="FollowTableScreen"
        options={{
          title: "جدول المتابعة",
          headerShown: false,
          tabBarIcon: () => <TabBarIcon name="table" color={"#fff"} />,
        }}
      />
      <Tabs.Screen
        name="Acheivments"
        options={{
          title: "الإنجازات",
          tabBarIcon: () => <TabBarIcon name="trophy" color={"#fff"} />,
        }}
      />
      <Tabs.Screen
        name="More"
        options={{
          title: "المزيد",
          tabBarIcon: () => <TabBarIcon name="ellipsis-h" color={"#fff"} />,
        }}
      />
    </Tabs>
  );
}
