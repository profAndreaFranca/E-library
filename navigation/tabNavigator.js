import React from "react";
import createBottomTabNavigator from "@react-navigation/bottom-tabs"
const Tab = createBottomTabNavigator()

export default class TabNavigator extends React.Component{
    render(){
        return(
            <Tab.Navigator>
                <Tab.Screen name={'transaction'}/>
                <Tab.Screen name={'search'}/>
            </Tab.Navigator>
            
        )
    }
}