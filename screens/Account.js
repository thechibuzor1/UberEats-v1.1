import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/Home/BottomTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Account({ navigation }) {
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity>
          <View
            style={{
              margin: 15,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Manage Cards
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              margin: 15,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Settings
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              margin: 15,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Edit Accout Info
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()}>
          <View
            style={{
              margin: 15,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <Divider width={1} />
      <View>
        <BottomTabs navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#eee",
  },
});
