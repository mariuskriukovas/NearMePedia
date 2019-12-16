import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import {createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import ScreenA from "./ScreenA";
import ScreenB from "./ScreenB";
import ScreenC from "./ScreenC";
import AddressInput from "./AddressInput";

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = Ionicons;
    let iconName;
    switch (routeName) {
        case 'ScreenA':
            iconName = `md-map`;
            break
        case 'ScreenB':
            iconName = `md-locate`;
            break
        case 'ScreenC':
            iconName = `md-star`;
            break
        default:
            break
    }

    return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const ScreenBNavigation = createSwitchNavigator({
    AllAddress: {
        screen: ScreenB,
    },
    Input: {
        screen: AddressInput,
    },
});

const Navigation = createAppContainer(
    createBottomTabNavigator(
        {
            ScreenA: { screen: ScreenA },
            ScreenB: { screen: ScreenBNavigation },
            ScreenC: { screen: ScreenC },
        },
        {
            defaultNavigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused, tintColor }) =>
                    getTabBarIcon(navigation, focused, tintColor),
            }),
            tabBarOptions: {
                activeTintColor: 'royalblue',
                inactiveTintColor: 'gray',
            },

        },
    )
);
export default Navigation
