import { Link, router } from "expo-router";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseAuth";

export default function Login() {
  const [userLogged, setUserLogged] = useState(false);
  const { loggedin, changeLogin } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleTyping = (input: string) => {
    if (input != "") {
      setUserLogged(true);
    }
  };
  const handleSignUp = () => {
    setError("");
    if (confirmPassword !== password) {
      setError("كلمة المرور غير متطابقة");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        Alert.alert("تنبيه", "تم التسجيل بنجاح، برجاء تسجيل الدخول");
        router.push("/Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/invalid-email") {
          setError("الرجاء كتابة بريد الكتروني صحيح");
        } else if (errorCode == "auth/missing-password") {
          setError("الرجاء كتابة كلمة المرور");
        } else if (errorCode == "auth/weak-password") {
          setError("الرجاء كتابة كلمة سر اقوى، على الأقل 6 احرف");
        } else if (errorCode == "auth/email-already-in-use") {
          setError("هذا البريد الالكتروني مستخدم بالفعل، جرب تسجيل الدخول");
        }
      });
  };

  function goToSignin(): void {
    router.push("/Login");
  }

  return (
    <LinearGradient colors={["#3EC0E9", "#347589"]} style={styles.container}>
      <View style={[styles.logoContainer, styles.boxShadow]}>
        <Image height={100} width={100} source={Logo}></Image>
      </View>
      <Text style={[styles.logoText, styles.textShadow]}>
        صلواتي | Salawaty
      </Text>
      <Text style={[styles.heading, styles.textShadow]}>
        قم بتسجيل حساب جديد
      </Text>
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
      <TextInput
        value={confirmPassword}
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
        textContentType="password"
        style={[styles.textInput, styles.boxShadow]}
        placeholder="تأكيد كلمة السر"
        placeholderTextColor={"grey"}
      ></TextInput>
      <Text style={styles.errorText}>{error}</Text>
      <LinearGradient
        colors={["#2D7A93", "#1E596B", "#1C4D5C"]}
        style={[styles.button, styles.boxShadow]}
      >
        <Pressable onPress={handleSignUp}>
          <Text style={styles.buttonText}>تسجيل حساب جديد</Text>
        </Pressable>
      </LinearGradient>

      <Pressable
        onPress={goToSignin}
        children={({ pressed }) => (
          <Text style={[styles.LinkText, { opacity: pressed ? 0.5 : 1 }]}>
            مستخدم بالفعل ؟ سجل الدخول الآن
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
