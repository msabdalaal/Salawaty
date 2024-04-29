import { Link, Redirect, router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
} from "react-native";
import Logo from "@assets/images/Group.png";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useLogin } from "./providers/LoginProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseAuth";
import * as Notifications from "expo-notifications";
import TimeRemaining, { timeRemaning } from "@Components/TimeRemaining";
import NextPrayer from "@Functions/NextPrayer";

export default function Login() {
  const { loggedin, changeLogin, changeDisplayName, changeProfilePic } =
    useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [nextPrayerTime, nextPrayerName] = NextPrayer();

  const handleLogin = () => {
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        changeLogin(true);
        changeDisplayName(user.displayName);
        changeProfilePic(user.photoURL);
        router.push("/(tabs)");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/invalid-email") {
          setError("الرجاء كتابة بريد الكتروني صحيح");
        } else if (errorCode == "auth/missing-password") {
          setError("الرجاء كتابة كلمة المرور");
        } else if (errorCode == "auth/invalid-login-credentials") {
          setError("البريد الالكتروني او كلمة المرور غير صحيحة");
        } else if (errorCode == "auth/too-many-requests") {
          setError(
            "لقج حاولت تسجيل الدخول مرات عديدة برجاء الانتظار والمحاولة مرة اخرى"
          );
        }
      });
  };
  function goToSignUp(): void {
    router.push("/Signup");
  }
  if (loggedin) {
    return <Redirect href="/" />;
  }
  return (
    <LinearGradient colors={["#3EC0E9", "#347589"]} style={styles.container}>
      <View style={[styles.logoContainer, styles.boxShadow]}>
        <Image height={100} width={100} source={Logo}></Image>
      </View>
      <Text style={[styles.logoText, styles.textShadow]}>
        صلواتي | Salawaty
      </Text>
      <Text style={[styles.heading, styles.textShadow]}>قم بتسجيل الدخول</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
        style={[styles.textInput, styles.boxShadow]}
        placeholder="البريد الالكتروني"
        placeholderTextColor={"grey"}
      ></TextInput>
      <TextInput
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
        textContentType="password"
        style={[styles.textInput, styles.boxShadow]}
        placeholder="كلمة السر"
        placeholderTextColor={"grey"}
      ></TextInput>
      <Text style={styles.errorText}>{error}</Text>

      <LinearGradient
        colors={["#2D7A93", "#1E596B", "#1C4D5C"]}
        style={[styles.button, styles.boxShadow]}
      >
        <Pressable onPress={handleLogin}>
          <Text style={styles.buttonText}>تسجيل الدخول</Text>
        </Pressable>
      </LinearGradient>
      <Pressable
        onPress={goToSignUp}
        children={({ pressed }) => (
          <Text style={[styles.LinkText, { opacity: pressed ? 0.5 : 1 }]}>
            مستخدم جديد ؟ سجل الآن
          </Text>
        )}
      />

      <Link href={"/"}></Link>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3789A3",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 200,
    width: 200,
    borderRadius: 999,
  },
  boxShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.5,
  },
  logoText: {
    color: "white",
    fontFamily: "CairoRegular",
    fontWeight: "600",
    fontSize: 30,
  },
  heading: {
    color: "white",
    fontFamily: "CairoRegular",
    fontWeight: "600",
    fontSize: 20,
    marginTop: 20,
  },
  textShadow: {
    textShadowColor: "black",
    textShadowOffset: { height: 3, width: 0 },
    textShadowRadius: 3,
  },
  textInput: {
    fontFamily: "CairoRegular",
    fontWeight: "600",
    backgroundColor: "white",
    height: 50,
    width: 300,
    marginTop: 20,
    textAlign: "center",
    borderWidth: 0,
    borderRadius: 25,
  },
  errorText: {
    marginTop: 20,
    fontFamily: "CairoRegular",
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1E596B",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 25,
    width: 200,
  },
  buttonText: {
    fontFamily: "CairoRegular",
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
  LinkText: {
    marginTop: 10,
    fontFamily: "CairoRegular",
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
});
