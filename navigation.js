import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import OrderCompleted from "./screens/OrderCompleted";
import LoginScreen from "./screens/Login";
import RegistrationScreen from "./screens/Registration";
import OrderHistory from "./screens/OrderHistory";
import CreditCard from "./screens/CreditCard";
import SplashScreen from "./screens/SplashScreen";
import Account from "./screens/Account";
import EditAccount from "./screens/EditAccount";

const store = configureStore();

export default function RootNavigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={screenOptions}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Orders" component={OrderHistory} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
          <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
          <Stack.Screen name="Card" component={CreditCard} />
          <Stack.Screen name="account" component={Account} />
          <Stack.Screen name="edit" component={EditAccount} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
