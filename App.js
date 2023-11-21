import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./navigation/tabNavigator"


export default function App() {
  return (
   <NavigationContainer>
    <TabNavigator />
   </NavigationContainer>
  );
}
