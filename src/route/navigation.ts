import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./rootParams";


export function navigationAll() {
    const navigation = useNavigation<
        NativeStackNavigationProp<
             RootStackParamList
                // & RoutesDrawerParamsList
        >>();

    return navigation;
}