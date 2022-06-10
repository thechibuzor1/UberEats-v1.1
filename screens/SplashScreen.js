import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";


export default function SplashScreen({ navigation }) {
  const dispatch = useDispatch();
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);

      AsyncStorage.getItem("user").then((user) => {
        if (user) {
          const userData = JSON.parse(user);
          console.log(userData);
          dispatch({
            type: "LOG_IN",
            payload: {
              userId: userData.id,
              name: userData.fullName,
              email: userData.email,
            },
          });
          navigation.navigate("Home", { user });
        } else {
          navigation.navigate("Login");
        }
      });
    }, 5000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assests/icons/uber.png")}
        style={{ width: "90%", resizeMode: "contain", margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color="#ffffff"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
