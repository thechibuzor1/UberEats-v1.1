import { View, Text, Image, ScrollView } from "react-native";
import React from "react";

const items = [
  {
    image: require("../../assests/images/shopping-bag.png"),
    text: "Pick-up",
  },
  {
    image: require("../../assests/images/soft-drink.png"),
    text: "Soft Drinks",
  },
  {
    image: require("../../assests/images/bread.png"),
    text: "Bakery Items",
  },
  {
    image: require("../../assests/images/fast-food.png"),
    text: "Fast Foods",
  },
  {
    image: require("../../assests/images/deals.png"),
    text: "Deals",
  },
  {
    image: require("../../assests/images/coffee.png"),
    text: "Coffee & Tea",
  },
  {
    image: require("../../assests/images/desserts.png"),
    text: "Desserts",
  },
];

export default function Categories() {
  return (
    <View style={{
      marginTop: 5,
      backgroundColor: "#fff",
      paddingVertical: 10,
      paddingLeft: 20,
    }}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
 
      {items.map((item, index) => (
        <View key={index} style={{ alignItems: "center", marginRight: 30 }}>
          <Image
            source={item.image}
            style={{
              width: 50,
              height: 40,
              resizeMode: "contain",
            }}
          />
          <Text style={{ fontSize: 13, fontWeight: "900" }}>
            {item.text}
          </Text>
        </View>
      ))}
   
    </ScrollView>
    </View>
  );
}
