import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./rootParams";
import Apresentation from "../screens/Apresentation";
import Home from "../screens/Home";

const Screen = createNativeStackNavigator<RootStackParamList>();

export default function ScreenRoutes() {
  return (
    <Screen.Navigator>
      <Screen.Screen name="Apresentation" component={Apresentation} options={{headerShown: false}} />
      <Screen.Screen name="Home" component={Home} options={{headerShown: false}} />
    </Screen.Navigator>
  );
}