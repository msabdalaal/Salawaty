import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import Colors from '@constants/Colors';
import { useColorScheme } from '@Components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveBackgroundColor:'#3DB3D8',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#1C4D5C',
          height:70,
          flexDirection: 'row',
          justifyContent: 'space-around',
          
        },
        tabBarLabelStyle:{
          fontSize: 13,
          fontWeight: 'bold',
          paddingBottom:5
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: `الرئيسية`,
          tabBarIcon: () => <TabBarIcon name="home" color={'#fff'} />,
        }}
      />
      <Tabs.Screen
        name="PrayerTimes"
        options={{
          title: 'أوقات الصلاة',
          tabBarIcon: () => <TabBarIcon name="clock-o" color={'#fff'} />,
        }}
      />
      <Tabs.Screen
        name="FollowTable"
        options={{
          title: 'جدول المتابعة',
          tabBarIcon: () => <TabBarIcon name="table" color={'#fff'} />,
        }}
      />
      <Tabs.Screen
        name="Acheivments"
        options={{
          title: 'الإنجازات',
          tabBarIcon: () => <TabBarIcon name="trophy" color={'#fff'} />,
        }}
      />
      <Tabs.Screen
        name="More"
        options={{
          title: 'المزيد',
          tabBarIcon: () => <TabBarIcon name="ellipsis-h" color={'#fff'} />,
        }}
      />
    </Tabs>
  );
}
