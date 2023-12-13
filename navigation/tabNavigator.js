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
        screenOptions={({ route }) => {
          tabBarIcon: ({ focused, color, size }) => {
            var iconName;
            if (route.name == "transaction") {
              iconName = "book";
            } else if (route.name == "search") {
              iconName = "search";
            }
            return(
                <Ionicons
                    name = {iconName}
                    size = {size}
                    color = {color}
                    
                />
            )
          };
        }}
        tabBarOptions = {{
            activeTintColor: '#fff',
            inactiveTintColor: '#000',
            style: {
                height: 130,
                borderTopWidth: 0,
                backgroundColor: '#5653d4'
            },
            labelStyle: {
            fontSize: 20
        },
        labelPosition:'beside-icon',
        tabStyle: {
            marginTop: 25,
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 30,
            borderWidth: 2,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#5653d4"
        }
        }}

      >
        <Tab.Screen name={"transaction"} component={Transaction} />
        <Tab.Screen name={"search"} component={Search} />
      </Tab.Navigator>
    );
  }
}
