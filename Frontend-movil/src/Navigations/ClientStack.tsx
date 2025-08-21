// src/navigation/ClientStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ClientStackParamList } from './types';

// Screens existentes
import ClientListScreen from '../screens/ClientListScreen';
import ClientRegisterScreen from '../screens/ClientRegisterScreen';
import ClientUpdateScreen from '../screens/ClientUpdateScreen';

const Stack = createNativeStackNavigator<ClientStackParamList>();

export default function ClientStack() {
    return (
        <Stack.Navigator initialRouteName="ClientList">
            <Stack.Screen
                name="ClientList"
                component={ClientListScreen}
                options={{ title: 'Clientes' }}
            />
            <Stack.Screen
                name="ClientRegister"
                component={ClientRegisterScreen}
                options={{ title: 'Registrar cliente' }}
            />
            <Stack.Screen
                name="ClientUpdate"
                component={ClientUpdateScreen}
                options={{ title: 'Editar cliente' }}
            />
        </Stack.Navigator>
    );
}
