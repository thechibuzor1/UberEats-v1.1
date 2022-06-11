import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { Divider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "../Firebase";
import BottomTabs from "../components/Home/BottomTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

export default function EditAccount({ navigation }) {
  const { name, email, userId } = useSelector(
    (state) => state.userReducer.userInfo
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editModal, setEditModal] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "black",
      justifyContent: "center",
    },
    title: {},
    logo: {
      flex: 1,
      height: 120,
      width: 90,
      alignSelf: "center",
      margin: 30,
    },
    input: {
      height: 48,
      borderRadius: 5,
      overflow: "hidden",
      backgroundColor: "white",
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 30,
      marginRight: 30,
      paddingLeft: 16,
    },
    button: {
      backgroundColor: "green",
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonTitle: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    footerView: {
      flex: 1,
      alignItems: "center",
      marginTop: 20,
    },
    footerText: {
      fontSize: 16,
      color: "#fff",
    },
    footerLink: {
      color: "green",
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  const editModalContent = () => {
    const save = () => {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, confirmPassword)
        .then(() => {
          const data = {
            id: userId,
            email: newEmail,
            name: newName,
          };
          firebase
            .firestore()

            .collection("users")
            .doc(userId)
            .update({
              id: userId,
              email: newEmail,
              fullName: newName,
            })
            .then(() => {
              dispatch({
                type: "EDIT_ACCOUNT",
                payload: {
                  userId: userId,
                  newName: newName,
                  newEmail: newEmail,
                },
              });
              AsyncStorage.setItem("user", JSON.stringify(data));
              setLoading(false);
              setEditModal(false);
            })
            .catch((error) => {
              setLoading(false);
              alert(error);
            });
        })
        .catch((error) => {
          setLoading(false);
          alert(error);
        });
    };

    return (
      <>
        {loading ? (
          <View
            style={{
              backgroundColor: "black",
              position: "absolute",
              opacity: 0.6,
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <LottieView
              style={{ height: 200 }}
              source={require("../assests/animations/scanner.json")}
              autoPlay
              speed={3}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <KeyboardAwareScrollView
              style={{ flex: 1, width: "100%" }}
              keyboardShouldPersistTaps="always"
            >
              <Image
                style={styles.logo}
                source={require("../assests/icons/uber.png")}
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setNewName(text)}
                value={newName}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setNewEmail(text)}
                value={newEmail}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder="Confirm Password"
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  save();
                }}
              >
                <Text style={styles.buttonTitle}>Save Changes</Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </View>
        )}
      </>
    );
  };
  return (
    <>
      <Modal
        animationType="slide"
        visible={editModal}
        transparent={true}
        onRequestClose={() => setEditModal(false)}
      >
        {editModalContent()}
      </Modal>
      <SafeAreaView style={Styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              margin: 15,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              Edit Account
            </Text>
          </View>
          <View
            style={{
              margin: 15,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Name:
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                alignSelf: "center",
                marginLeft: 10,
              }}
            >
              {name}
            </Text>
          </View>
          <View
            style={{
              margin: 15,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Email:
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                alignSelf: "center",
                marginLeft: 10,
              }}
            >
              {email}
            </Text>
          </View>
          <View
            style={{
              margin: 15,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              UserId:
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                alignSelf: "center",
                marginLeft: 10,
              }}
            >
              {userId}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setEditModal(true);
            }}
          >
            <View
              style={{
                backgroundColor: "green",
                marginLeft: 30,
                marginRight: 30,
                marginTop: 20,
                height: 48,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "600" }}>Edit</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <Divider width={1} />
        <View>
          <BottomTabs navigation={navigation} />
        </View>
      </SafeAreaView>
    </>
  );
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#eee",
  },
});
