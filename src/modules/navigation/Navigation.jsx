import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthStack from './stack/AuthStack';
import FavoritesStack from './stack/FavoritesStack';
import HomeStack from './stack/HomeStack';
import {Icon} from '@rneui/base'

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        const { iconName, iconType } = getIconName(route.name, focused);
                        // Retornar un Icon de React Native Elements
                        return <Icon name={iconName} type={iconType} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                })}
            >
                <Tab.Screen
                    name="HomeStack"
                    component={HomeStack}
                    options={{ title: 'Inicio' }}
                />

                <Tab.Screen
                    name='FavoritesStack'
                    component={FavoritesStack}
                    options={{ title: 'favorites' }}
                />
                <Tab.Screen
                    name='AuthStack'
                    component={AuthStack}
                    options={{ title: 'Perfil' }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const getIconName = (routeName, focused) => {
    let iconName = '';
    let iconType = 'material-community';

    switch (routeName) {
        case 'HomeStack':
            iconName = focused ? 'home' : 'home-outline';
            break;
        case 'FavoritesStack':
            iconName = focused ? 'heart' : 'heart-outline';
            break;
        case 'AuthStack':
            iconName = focused ? 'account' : 'account-outline';
            break;
    }

    return { iconName, iconType };
};