// src/navigation/MainNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import ClientStack from './ClientStack';
import ClassStack from './ClassStack';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function MainNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Clientes"
            screenOptions={{
                tabBarActiveTintColor: 'purple',
                headerShown: false, // los headers los manejan los stacks internos
            }}>
            <Tab.Screen
                name="Clientes"
                component={ClientStack}
                options={{
                    tabBarLabel: 'Cleintes',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="team" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Clases"
                component={ClassStack}
                options={{
                    tabBarLabel: 'Clases',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="calendar" size={size} color={color} />
                    ),
                }}
            />
            {/*
        Agrega más módulos aquí:
        <Tab.Screen name="Instructores" component={InstructorStack} ... />
        <Tab.Screen name="Pagos" component={PaymentStack} ... />
      */}
        </Tab.Navigator>
    );
}
