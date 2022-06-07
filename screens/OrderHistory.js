import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { orderHistory } from "../components/RestaurantDetails/ViewCart";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/Home/BottomTabs";
import firebase from "../Firebase";
import MenuItems from "../components/RestaurantDetails/MenuItems";

export default function OrderHistory({ navigation }) {
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
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("orders")
      .where("Name", "==", "")
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
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
          }}
        >
          Last Orders
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MenuItems
          foods={lastOrder.items}
          hideCheckbox={true}
          hideQuantity={true}
          marginLeft={10}
        />
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
