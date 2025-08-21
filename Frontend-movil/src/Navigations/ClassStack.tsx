// src/navigation/ClassStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ClassStackParamList } from './types';

// (Crea estos archivos en src/screens si no existen aún)
import ClassListScreen from '../screens/class/ClassListScreen';
import ClassDetailScreen from '../screens/class/ClassDetailScreen';
import ClassRegisterScreen from '../screens/class/ClassRegisterScreen';

const Stack = createNativeStackNavigator<ClassStackParamList>();

export default function ClassStack() {
    return (
        <Stack.Navigator initialRouteName="ClassList">
            <Stack.Screen
                name="ClassList"
                component={ClassListScreen}
                options={{ title: 'Clases' }}
            />
            <Stack.Screen
                name="ClassDetail"
                component={ClassDetailScreen}
                options={{ title: 'Detalle de clase' }}
            />
            <Stack.Screen
                name="ClassRegister"
                component={ClassRegisterScreen}
                options={{ title: 'Registrar clase' }}
            />
        </Stack.Navigator>
    );
}
