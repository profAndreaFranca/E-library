import React from "react";
import createBottomTabNavigator from "@react-navigation/bottom-tabs"
const Tab = createBottomTabNavigator()
import Transaction from "../screens/transaction"
import Search from "../screens/search"

export default class TabNavigator extends React.Component{
    render(){
        return(
            <Tab.Navigator>
                <Tab.Screen name={'transaction'} component={Transaction}/>
                <Tab.Screen name={'search'} component={Transaction}/>
            </Tab.Navigator>
            
        )
    }
}