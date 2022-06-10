import React, { useState } from "react";
import { StyleSheet, View, Switch, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-input-credit-card";
import { useDispatch } from "react-redux";

const s = StyleSheet.create({
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#F5F5F5",
    marginTop: 60,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});

export default function CreditCard({ navigation }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const onFocus = (field) => console.log("focusing", field);
  const onChange = (formData) => {
    formData.valid ? setForm(formData) : setForm({});

    /* setForm(JSON.stringify(formData, null, " "));
    console.log(JSON.stringify(formData, null, " "));
    console.log("blahbshb");*/
    console.log(form);
  };
  const submitCard = () => {
    dispatch({
      type: "ADD_CREDITCARD",
      payload: {
        form: form,
      },
    });
    navigation.navigate("Home");
  };

  return (
    <View style={s.container}>
      <LiteCreditCardInput
        autoFocus
        inputStyle={s.input}
        validColor={"black"}
        invalidColor={"red"}
        placeholderColor={"darkgray"}
        onFocus={onFocus}
        onChange={onChange}
      />
      <TouchableOpacity
        onPress={() => {
          submitCard();
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
          <Text style={{ fontSize: 16 }}>Submit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
