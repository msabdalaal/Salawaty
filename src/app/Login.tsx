import { Link } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import Logo from "@assets/images/Group.png";
import {LinearGradient} from 'expo-linear-gradient';
import { useState } from "react";
import { useLogin } from "./providers/LoginProvider";


export default function Login() {

  const [userLogged, setUserLogged]= useState(false);
  const { loggedin , changeLogin } = useLogin()

  const handleTyping = (input: string) =>{
    if(input != ''){
      setUserLogged(true)
    }
  }
  const handleLogin = ()=>{
    userLogged ? changeLogin(true) : alert("not logged in");
  }
  return (
    <LinearGradient colors={['#3EC0E9','#347589']} style={styles.container}>
      <View style={[styles.logoContainer, styles.boxShadow]}>
        <Image height={100} width={100} source={Logo}></Image>
      </View>
      <Text style={[styles.logoText, styles.textShadow]}>
        صلواتي | Salawaty
      </Text>
      <Text style={[styles.heading, styles.textShadow]}>قم بتسجيل الدخول</Text>
      <TextInput onChangeText={(e) => handleTyping(e)} style={[styles.textInput, styles.boxShadow]} placeholder="اسم المستخدم \ البريد الالكتروني" placeholderTextColor={'grey'}></TextInput>
      <TextInput style={[styles.textInput, styles.boxShadow]} placeholder="كلمة السر" placeholderTextColor={'grey'}></TextInput>
        
        <LinearGradient colors={['#2D7A93','#1E596B','#1C4D5C']} style={[styles.button,styles.boxShadow]}>
        <Link onPress={()=> handleLogin()} href={userLogged? "/(tabs)/": "/"} >

          <Text style={styles.buttonText}>تسجيل الدخول</Text>
          </Link>
        </LinearGradient>
        
        

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
  boxShadow:{
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
    fontSize:20,
    marginTop:20,
  },
  textShadow: {
    textShadowColor: "black",
    textShadowOffset: { height: 3, width: 0 },
    textShadowRadius: 3,
  },
  textInput:{
    fontFamily: "CairoRegular",
    fontWeight: "600",
    backgroundColor: 'white',
    height: 50,
    width:300,
    marginTop:20,
    textAlign:'center',
    borderWidth: 0,
    borderRadius: 25,
  },
  button:{
    marginTop:30,
    backgroundColor: '#1E596B',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    width:200,
  },
  buttonText:{
    fontFamily: "CairoRegular",
    fontWeight: "600",
    textAlign:'center',
    color:'white',
  },

});
