import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./navigation/tabNavigator"
import Login from './screens/loginScreen';
// import {createSwitchNavigator, createAppContainer} from "react-navigation"
import { createStackNavigator } from '@react-navigation/stack';




export default function App() {
  
  return (
   <NavigationContainer>
    <MyStack />
   </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BottomTab" component={TabNavigator} />
    </Stack.Navigator>
  );
}
// const AppSwitchNavigator = createSwitchNavigator({
//   Login: { screen: Login},
//   BottomTab: { screen: TabNavigator}
// },{
//   initialRouteName: "Login"
// })

// const AppContainer = createAppContainer(AppSwitchNavigator)