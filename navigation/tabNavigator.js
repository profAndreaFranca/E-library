import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import Transaction from "../screens/transaction";
import Search from "../screens/search";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class TabNavigator extends React.Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            var iconName;
            if (route.name == "Transaction") {
              iconName = focused
              ? 'book'
              : 'book-outline';
            } else if (route.name == "Search") {
              iconName = focused
              ? 'search'
              : 'search-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor:  "#000",
          tabBarStyle:{
            height: 80,
            backgroundColor: "#fff",
            marginTop: 2,
            marginLeft: 2,
            marginRight: 2,
            borderRadius: 20,
            borderWidth: 2,
            alignItems: "center",
            justifyContent: "center",
          },
          tabBarLabelStyle:{
            fontSize: 30,
          },
          tabBarLabelPosition:"beside-icon",
          headerShown:false,
          tabBarItemStyle:{
            borderRadius: 20,
            borderWidth: 2,
            backgroundColor: "#5653d4",
          }
        })}
      >
        <Tab.Screen name={"Transaction"} component={Transaction} />
        <Tab.Screen name={"Search"} component={Search} />
      </Tab.Navigator>
    );
  }
}
