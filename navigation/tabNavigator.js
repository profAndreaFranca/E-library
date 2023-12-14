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
            if (route.name == "transaction") {
              iconName = focused
              ? 'book'
              : 'book-outline';
            } else if (route.name == "search") {
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
            // borderTopWidth: 2,
            backgroundColor: "#5653d4",
            marginTop: 2,
            marginLeft: 2,
            marginRight: 2,
            borderRadius: 20,
            borderWidth: 2,
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "#5653d4",
          },
          tabBarLabelStyle:{
            fontSize: 20,
          },
          tabBarLabelPosition:"beside-icon",
          headerShown:false
        })}
      >
        <Tab.Screen name={"transaction"} component={Transaction} />
        <Tab.Screen name={"search"} component={Search} />
      </Tab.Navigator>
    );
  }
}
