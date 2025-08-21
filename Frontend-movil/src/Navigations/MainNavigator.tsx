// src/navigation/MainNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text } from 'react-native';
import ClientStack from './ClientStack';
import ClassStack from './ClassStack';
import type { RootTabParamList } from './types';
import InstructorStack from './InstructorStack';
import ButtonStack from './BottomStack';

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
            <Tab.Screen
                name="Instructores"
                component={InstructorStack}
                options={{
                    tabBarLabel: "Instructores",
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="RatingsTab"
                component={ButtonStack}
                options={{ title: "Reseñas", tabBarIcon: () => <Text>⭐</Text> }}
            />
        </Tab.Navigator>
    );
}
