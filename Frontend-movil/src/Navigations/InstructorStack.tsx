import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientStackParamList, InstructorStackParamList } from "./types";
import InstructorListScreen from "../screens/instructor/InstructorListScreen";
import InstructorRegisterScreen from "../screens/instructor/InstructorRegisterScreen";
import InstructorUpdateScreen from "../screens/instructor/InstructorUpdateScreen";

const Stack = createNativeStackNavigator<InstructorStackParamList>();

export default function InstructorStack() {
    return (
        <Stack.Navigator initialRouteName="InstructorList">
            <Stack.Screen
                name="InstructorList"
                component={InstructorListScreen}
                options={{ title: 'Instructores' }}
            />
            <Stack.Screen
                name="InstructorRegister"
                component={InstructorRegisterScreen}
                options={{ title: 'Registrar instructor' }}
            />
            <Stack.Screen
                name="InstructorUpdate"
                component={InstructorUpdateScreen}
                options={{ title: 'Actualizar instructor' }}
            />
        </Stack.Navigator>
    );
}