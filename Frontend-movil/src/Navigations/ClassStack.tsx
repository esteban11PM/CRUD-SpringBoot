// src/navigation/ClassStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ClassStackParamList } from './types';

// (Crea estos archivos en src/screens si no existen aún)
import ClassListScreen from '../screens/class/ClassListScreen';
import ClassDetailScreen from '../screens/class/ClassDetailScreen';
import ClassFormScreen from '../screens/class/ClassFormScreen';

const Stack = createNativeStackNavigator<ClassStackParamList>();

export default function ClassStack() {
    return (
        <Stack.Navigator initialRouteName="ClassList">
            <Stack.Screen name="ClassList" component={ClassListScreen} options={{ title: "Clases" }} />
            <Stack.Screen name="ClassForm" component={ClassFormScreen} options={{ title: "Clase" }} />
            <Stack.Screen name="ClassDetail" component={ClassDetailScreen} options={{ title: "Detalle Clase" }} />
        </Stack.Navigator>
    );
}
