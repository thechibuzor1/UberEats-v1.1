import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import firebase from "../Firebase";
import MenuItems from "../components/RestaurantDetails/MenuItems";

export default function OrderCompleted() {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: "Pan Roasted Portobello Steaks",
        description:
          "Pan Roasted Portobello Steaks with Lobster Mushrooms, Potato Puree, Blistered Haricots Verts, Charred Onion Petals and Chimichurri",
        price: "$24.99",
        image:
          "https://i0.wp.com/twohappyrabbits.com/wp/wp-content/uploads/2017/10/Day-23cC.jpg?resize=1024%2C680",
      },
    ],
  });
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

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setLastOrder(doc.data());
        });
      });
    return () => unsubscribe();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          margin: 15,
          alignItems: "center",
          height: "100%",
        }}
      >
        <LottieView
          style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
          source={require("../assests/animations/check-mark.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Your order at {restaurantName} has been placed for $
          {Math.round(totalUSD * 100) / 100}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MenuItems
            foods={lastOrder.items}
            hideCheckbox={true}
            hideQuantity={true}
            marginLeft={10}
          />
          <LottieView
            style={{ height: 200, bottom: 10, alignSelf: "center" }}
            source={require("../assests/animations/cooking.json")}
            autoPlay
            speed={0.5}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "white",
  },
});
