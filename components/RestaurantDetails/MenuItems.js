import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Divider } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },
});

export default function MenuItems({
  restaurantName,
  foods,
  hideCheckbox,
  marginLeft,
  hideQuantity,
}) {
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue, quantity) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
        quantity: quantity,
      },
    });

  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );

  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.title === food.title));

  const { items } = useSelector((state) => state.cartReducer.selectedItems);

  const add = (item, checkboxValue) => {
    /*  setQuantity(quantity + 1); */
    dispatch({
      type: "ADD_QUANTITY",
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });
  };

  const sub = (item, checkboxValue) => {
    /*   setQuantity(quantity !== 1 ? quantity - 1 : 1); */
    dispatch({
      type: "SUB_QUANTITY",
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });
  };
  const FoodQuantity = ({ checkboxValue, ...props }) => (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            margin: 20,
          }}
        >
          Quantity
        </Text>

        <View style={{ alignSelf: "center", marginTop: 15 }}>
          <TouchableOpacity
            onPress={(checkboxValue) => sub(props.food, checkboxValue)}
            style={{
              borderWidth: 1,
              borderColor: "#cccccc",
            }}
          >
            <MaterialIcons name="remove" size={22} color="#cccccc" />
          </TouchableOpacity>
          <Text
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#cccccc",
              paddingHorizontal: 7,
              paddingTop: 3,
              color: "black",
              fontSize: 20,
            }}
          >
            {items.map((item) =>
              item.title === props.food.title ? parseInt(item.qty) : ""
            )}
          </Text>
          <TouchableOpacity
            onPress={(checkboxValue) => add(props.food, checkboxValue)}
            style={{
              borderWidth: 1,
              borderColor: "#cccccc",
            }}
          >
            <MaterialIcons name="add" size={22} color="#cccccc" />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          $
          {items.map((item) =>
            item.title === props.food.title
              ? Math.round(
                  Number(item.price.replace("$", "")) * item.qty * 100
                ) / 100
              : ""
          )}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {foods.map((food, index) => (
          <View key={index} style={{ marginBottom: 55 }}>
            <View style={styles.menuItemStyle}>
              {hideCheckbox ? (
                <></>
              ) : (
                <BouncyCheckbox
                  iconStyle={{ borderColor: "lightgray", borderRadius: 0 }}
                  fillColor="green"
                  onPress={(checkboxValue) =>
                    selectItem(food, checkboxValue, 1)
                  }
                  isChecked={isFoodInCart(food, cartItems)}
                />
              )}
              <FoodInfo food={food} />
              <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
            </View>
            {hideQuantity ? <></> : <FoodQuantity food={food} checkboxValue />}

            <Divider
              width={0.5}
              orientation="vertical"
              style={{ marginHorizontal: 20 }}
            />
          </View>
        ))}
      </ScrollView>
    </>
  );
}
const FoodInfo = (props) => (
  <View style={{ width: 240, justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}>{props.food.title}</Text>
    <Text>{props.food.description}</Text>
    <Text>{props.food.price}</Text>
  </View>
);

const FoodImage = ({ marginLeft, ...props }) => (
  <View>
    <Image
      source={{ uri: props.food.image }}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
        marginLeft: marginLeft,
      }}
    />
  </View>
);
