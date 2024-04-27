import { Alert, Platform, Pressable, StyleSheet } from "react-native";
import { Text, View, Image, TextInput } from "react-native";
import { Stack, router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useLogin } from "./providers/LoginProvider";
import * as ImagePicker from "expo-image-picker";
import { Auth, updateProfile, signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseAuth";

interface Result {
  assets: [
    {
      assetId: string;
      base64: null;
      duration: null;
      exif: null;
      fileName: string;
      fileSize: number;
      height: number;
      type: string;
      uri: string;
      width: number;
    }
  ];
  canceled: boolean;
}

export default function ModalScreen() {
  const {
    displayName,
    profilePic,
    changeProfilePic,
    changeDisplayName,
    changeLogin,
  } = useLogin();
  const [changing, setChanging] = useState(false);
  const [username, setUsername] = useState("");

  const pickImage = async () => {
    let result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

    console.log(result);

    if (!result.canceled) {
      changeProfilePic(result.assets[0].uri);

      updateProfile(auth.currentUser!!, {
        photoURL: result.assets[0].uri,
      })
        .then(() => {})
        .catch((error) => {
          Alert.alert("Error", error.message);
        });
    }
  };

  function goBack() {
    router.back();
  }
  function logOut() {
    if (Platform.OS == "android") {
      Alert.alert("تسجيل الخروج", "هل تريد تسجيل الخروج ؟", [
        {
          text: "لا",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "نعم",
          onPress: () => {
            signOut(auth)
              .then(() => {})
              .catch((error) => {
                // An error happened.
              });
            changeLogin(false);
            router.push("/");
          },
        },
      ]);
    } else if (confirm("هل تريد تسجيل الخروج ؟")) {
      changeLogin(false);
      router.push("/");
    }
  }

  function changeUserName(): void {
    setChanging(true);
  }

  function handleChangeUserName() {
    updateProfile(auth.currentUser!!, {
      displayName: username,
    })
      .then(() => {
        changeDisplayName(username);
        setChanging(false);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  }
  return (
    <LinearGradient colors={["#3EC0E9", "#347589"]} style={styles.container}>
      <Stack.Screen
        options={{
          title: ``,
          presentation: "modal",
          animation:"slide_from_right",
          headerShown: false,
        }}
      />
      <View style={styles.header}>
        <Pressable onPress={() => goBack()}>
          {({ pressed }) => (
            <FontAwesome
              style={[styles.goBack, { opacity: pressed ? 0.5 : 1 }]}
              name="arrow-left"
            />
          )}
        </Pressable>
        <View style={styles.profilePicContainer}>
          <FontAwesome
            onPress={pickImage}
            style={styles.editButton}
            name="pencil"
          />
          {!profilePic ? (
            <FontAwesome name="user-circle" style={styles.profilePicAlias} />
          ) : (
            <Image
              style={styles.profilePic}
              source={{ uri: profilePic ? profilePic : "" }}
            />
          )}
        </View>
      </View>
      <View style={styles.usernameContainer}>
        {displayName ? (
          <Text style={styles.username}>{displayName}</Text>
        ) : (
          <Text style={styles.username}>اسم المستخدم</Text>
        )}
        {!changing && (
          <FontAwesome
            onPress={changeUserName}
            style={styles.editButton}
            name="pencil"
          />
        )}
        {changing && (
          <TextInput
            style={styles.changeUsernameInput}
            value={username}
            onChangeText={setUsername}
          />
        )}
        {changing && (
          <FontAwesome
            onPress={handleChangeUserName}
            style={styles.editButton}
            name="check"
          />
        )}
      </View>
      <View style={styles.item}>
        <Pressable onPress={() => router.push("/ChooseCountry")}>
          <Text style={styles.itemText}>تغيير المدينة</Text>
        </Pressable>
      </View>
      <View style={styles.item}>
        <Pressable onPress={() => logOut()}>
          <Text style={styles.itemText}>تسجيل الخروج</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    padding: 20,
  },
  header: {
    marginTop: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  profilePicContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profilePic: {
    height: 85,
    width: 85,
    borderRadius: 99,
  },
  profilePicAlias: {
    fontSize: 80,
    color: "white",
  },
  editButton: {
    fontSize: 20,
    color: "white",
  },
  goBack: {
    textAlign: "left",
    color: "white",
    fontSize: 25,
  },
  usernameContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    width:"100%",
    borderColor: "white",
    paddingBottom: 20,

  },
  username: {
    fontSize: 25,
    color: "white",
    fontFamily: "CairoRegular",
    fontWeight: "600",
    
  },
  changeUsernameInput: {
    width: 100,
    height: 30,
    backgroundColor: "white",
  },
  item: {
    width: "100%",
    borderBottomWidth: 1,
    backgroundColor: "transparent",
    borderColor: "white",
  },
  itemText: {
    color: "white",
    marginVertical: 20,
    fontSize: 18,
    fontFamily: "CairoRegular",
    fontWeight: "600",
  },
});
