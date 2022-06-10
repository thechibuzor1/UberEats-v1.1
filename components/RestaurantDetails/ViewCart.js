import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import firebase from "../../Firebase";
import LottieView from "lottie-react-native";
import { Paystack } from "react-native-paystack-webview";
import { Divider } from "react-native-elements";
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function ViewCart({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [paystackModal, setPaystackModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Fullname, setFullame] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const total = items
    .map((item) => Number(item.price.replace("$", "")) * item.qty)
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const addOrderToFireBase = () => {
    setLoading(true);
    const db = firebase.firestore();
    db.collection("userData").add({
      Name: Fullname,
      Address: address,
      Phone: phone,
      Email: email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    db.collection("orders")
      .add({
        items: items,
        restaurantName: restaurantName,
        Name: Fullname,
        Address: address,
        Phone: phone,
        Email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);

          navigation.navigate("OrderCompleted");
        }, 2500);
      });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#2c3e50",
    },
    loginContainer: {
      alignItems: "center",
      flexGrow: 1,
      justifyContent: "center",
    },
    logo: {
      position: "absolute",
      width: 300,
      height: 100,
    },
    input: {
      alignSelf: "center",
      height: 40,
      backgroundColor: "rgba(225,225,225,0.2)",
      marginBottom: 10,
      padding: 10,
      color: "#fff",
      borderRadius: 30,
      width: "90%",
    },
    buttonContainer: {
      backgroundColor: "green",
      paddingVertical: 15,
      borderRadius: 30,
      alignSelf: "center",
      width: "50%",
    },
    buttonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "700",
    },
    inputForm: {
      width: "90%",
      height: 100,
      backgroundColor: "rgba(225,225,225,0.2)",
      marginBottom: 10,
      padding: 10,
      color: "#fff",
      borderRadius: 30,
      alignSelf: "center",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    modalCheckoutContainer: {
      borderRadius: 30,
      backgroundColor: "white",
      padding: 16,
      height: 500,
      borderWidth: 1,
      justifyContent: "center",
    },
    paystackModalContainer: {
      borderRadius: 30,
      backgroundColor: "white",
      padding: 16,
      height: 600,
      borderWidth: 1,
      justifyContent: "center",
    },
    paymentModalContainer: {
      borderRadius: 30,
      backgroundColor: "white",
      padding: 16,
      height: 300,
      borderWidth: 1,
      justifyContent: "center",
    },
    restaurantName: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      marginBottom: 10,
    },
    paymentText: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      marginBottom: 20,
    },
    subtotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },
    subtotalText: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: 15,
      marginBottom: 10,
    },
    formContainer: {
      alignContent: "center",
    },
  });

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text> ${Math.round(totalUSD * 100) / 100}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "black",
                  alignItems: "center",
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: "relative",
                }}
                onPress={() => {
                  setModalVisible(false);
                  setPaymentModal(true);
                  /* addOrderToFireBase(); */
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Checkout</Text>
                <Text
                  style={{
                    position: "absolute",
                    right: 20,
                    color: "white",
                    fontSize: 15,
                    top: 17,
                  }}
                >
                  {total ? "$" + Math.round(totalUSD * 100) / 100 : ""}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  const paymentModalContent = () => {
    const { valid, values } = useSelector((state) => state.cardReducer.val);
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.paymentModalContainer}>
            <Text style={styles.paymentText}>Payment</Text>
            <View style={{ alignContent: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  setPaymentModal(false);
                  navigation.navigate("Card");
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  {valid ? (
                    <Text style={{ fontSize: 17, fontWeight: "500" }}>
                      {values.number}
                    </Text>
                  ) : (
                    <>
                      <AntDesign name="plus" size={22} color="black" />
                      <Text style={{ fontSize: 17, fontWeight: "500" }}>
                        Add creditCard
                      </Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
              <Divider width={1.8} style={{ marginVertical: 20 }} />
              <TouchableOpacity
                onPress={() => {
                  setPaymentModal(false);
                  setPaystackModal(true);
                }}
              >
                <Text style={{ fontSize: 17, fontWeight: "500" }}>
                  Pay with paystack
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  const paystackModalContent = () => {
    const { name, email } = useSelector((state) => state.userReducer.userInfo);
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.paystackModalContainer}>
            <Paystack
              paystackKey="pk_test_740a0621cdf363dc47b90ef9c703db6138d02f83"
              amount={totalUSD}
              billingEmail={email}
              activityIndicatorColor="green"
              metadataDevice={"mobile"}
              metadataAction={"ticket_purchase"} //Other action is gift_voucher_purchase
              metadataEventPrice={"event-price-id"} // required If action is ticket_purchase
              metadataTicketQuantity={"5"} // required If action is ticket_purchase
              metadataReceiverEmail={email} // required If action is gift_voucher_purchase
              onCancel={(e) => {
                // handle response here
                navigation.navigate("Home");
              }}
              onSuccess={(res) => {
                // handle response here
                setPaystackModal(false);
                addOrderToFireBase();
              }}
              autoStart={true}
            />
          </View>
        </View>
      </>
    );
  };

  const siginModalContent = () => {
    const db_email = email;
    const db_password = password;
    const submitInfo = () => {
      if (password !== confirmPassword) {
        alert("Passwords don't match.");
        return;
      }

      setSigninModal(false);
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(db_email, db_password)
        .then((response) => {
          const uid = response.user.uid;
          const data = {
            id: uid,
            email,
            Fullname,
          };
          const usersRef = firebase.firestore().collection("users");
          usersRef
            .doc(uid)
            .set(data)
            .then(() => {
              setLoading(false);
              navigation.navigate("Home", { user: data });
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    };
    return (
      <ScrollView>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}></View>
          <View
            style={{
              backgroundColor: "black",
              height: "100%",
            }}
          >
            <View
              style={{
                alignSelf: "center",
                marginBottom: 30,
                marginTop: 200,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 100,
                  fontWeight: "bold",
                }}
              >
                Uber
              </Text>
              <Text
                style={{
                  color: "green",
                  fontSize: 100,
                  fontWeight: "bold",
                }}
              >
                Eats
              </Text>
            </View>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                returnKeyType="next"
                placeholder="Your Name"
                placeholderTextColor="rgba(225,225,225,0.7)"
                blurOnSubmit={true}
                onChangeText={(text) => setFullame(text)}
                value={Fullname}
              />
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                keyboardType="email-address"
                placeholder="Email Address"
                placeholderTextColor="rgba(225,225,225,0.7)"
                blurOnSubmit={true}
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                returnKeyType="next"
                keyboardType="phone-pad"
                placeholder="Phone"
                placeholderTextColor="rgba(225,225,225,0.7)"
                blurOnSubmit={true}
                onChangeText={(text) => setPhone(text)}
                value={phone}
              />

              <TextInput
                multiline
                numberOfLines={3}
                style={styles.inputForm}
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                returnKeyType="next"
                keyboardType="default"
                placeholder="Address"
                placeholderTextColor="rgba(225,225,225,0.7)"
                blurOnSubmit={true}
                onChangeText={(text) => setAddress(text)}
                value={address}
              />

              <TextInput
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                returnKeyType="next"
                placeholder="Password"
                placeholderTextColor="rgba(225,225,225,0.7)"
                blurOnSubmit={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
              <TextInput
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                placeholder="Confirm Password"
                placeholderTextColor="rgba(225,225,225,0.7)"
                blurOnSubmit={true}
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
              />

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  submitInfo();
                  /* setSigninModal(false); */
                  /*                   setPaystack(true); */
                }}
              >
                <Text style={styles.buttonText}>LET'S GO!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      <Modal
        animationType="slide"
        visible={paystackModal}
        transparent={true}
        onRequestClose={() => setPaystackModal(false)}
      >
        {paystackModalContent()}
      </Modal>

      <Modal
        animationType="slide"
        visible={paymentModal}
        transparent={true}
        onRequestClose={() => setPaymentModal(false)}
      >
        {paymentModalContent()}
      </Modal>

      {total ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 10,
            zIndex: 999,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: 15,
                borderRadius: 30,
                width: 300,
                position: "relative",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ color: "white", fontSize: 20, marginRight: 50 }}>
                View Cart
              </Text>
              <Text style={{ color: "white", fontSize: 20 }}>
                ${Math.round(totalUSD * 100) / 100}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
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
            source={require("../../assests/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
