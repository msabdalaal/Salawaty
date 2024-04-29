import { useLogin } from "@/app/providers/LoginProvider";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Pressable, View, Image, Text } from "react-native";

export default function () {
  const { displayName, profilePic } = useLogin();

  return (
    <View style={styles.header}>
      <Link href={"/Account"} asChild>
        {profilePic ? (
          <Pressable>
            <Image
              source={{ uri: `${profilePic}` }}
              style={styles.profilePic}
            />
          </Pressable>
        ) : (
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="user-circle"
                size={30}
                style={{
                  marginRight: 15,
                  opacity: pressed ? 0.5 : 1,
                  color: "white",
                }}
              />
            )}
          </Pressable>
        )}
      </Link>
      <Text style={styles.welcome}>اهلا بك، {displayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    marginTop: 35,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  welcome: {
    fontSize: 20,
    alignSelf: "flex-end",
    fontFamily: "CairoRegular",
    fontWeight: "600",
    color: "white",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 99,
  },
});
