import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RatingListScreen from "../screens/ratings/RatingListScreen";
import { ButtonStackParamList } from "./types";
import RatingFormScreen from "../screens/ratings/RatingFormScreen";

const Stack = createNativeStackNavigator<ButtonStackParamList>();

export default function ButtonStack() {
    return (
        <Stack.Navigator initialRouteName="RatingList">
            <Stack.Screen
                name="RatingList"
                component={RatingListScreen}
                options={{ title: 'Reseñas' }}
            />
            <Stack.Screen
                name="RatingForm"
                component={RatingFormScreen}
                options={{ title: 'Formulario de Reseña' }}
            />
        </Stack.Navigator>
    );
}