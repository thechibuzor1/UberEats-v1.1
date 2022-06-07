import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import About from "../components/RestaurantDetails/About";
import MenuItems from "../components/RestaurantDetails/MenuItems";
import ViewCart from "../components/RestaurantDetails/ViewCart";

const foods = [
  {
    id: 1,
    title: "Pan Roasted Portobello Steaks",
    description:
      "Pan Roasted Portobello Steaks with Lobster Mushrooms, Potato Puree, Blistered Haricots Verts, Charred Onion Petals and Chimichurri",
    price: "$24.99",
    qty: 1,
    image:
      "https://i0.wp.com/twohappyrabbits.com/wp/wp-content/uploads/2017/10/Day-23cC.jpg?resize=1024%2C680",
  },
  {
    id: 2,
    title: "Lasagna",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    qty: 1,
    image:
      "https://veenaazmanov.com/wp-content/uploads/2021/08/Lasagna-with-Bechamel-Sauce24.jpg",
  },
  {
    id: 3,
    title: "Tandoori Chicken",
    description: "Amazing Indian dish with tenderloin chicken off the sizzle",
    price: "$19.20",
    qty: 1,
    image:
      "https://www.simplyrecipes.com/thmb/RApX19MbIABUG-fVjjPOVRZctBw=/1423x1067/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2010__06__tandoori-chicken-horiz-a-1600-a92053df1c764ee1beaa91ae6383dcfd.jpg",
  },
  {
    id: 4,
    title: "Chilaquiles",
    description: "Chilaquiles with cheese and sauce.",
    price: "$17.50",
    qty: 1,
    image:
      "https://www.thespruceeats.com/thmb/ooo4cAYV1TZ9T0fo1mzaCEA5-hU=/1500x844/smart/filters:no_upscale()/chilaquiles-recipe-5213268-hero-01-09015a76503e4f07820ad17811d88a6f.jpg",
  },
];

export default function RestaurantDetail({ route, navigation }) {
  return (
    <>
      <About route={route} />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <MenuItems restaurantName={route.params.name} foods={foods}/>
      </ScrollView>
      <ViewCart navigation={navigation} />
    </>
  );
}
