// src/navigation/Navigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';

export default function Navigation() {
    return (
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    );
}
