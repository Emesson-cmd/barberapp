import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import CustomTabBar from '../components/CustomTabBar'

import Home from '../screens/Home'
import Search from '../screens/Search'
import Appointments from '../screens/Appointments'
import Favorites from '../screens/Favorites'
import Profile from '../screens/Profile'

const Tab = createBottomTabNavigator()

export default () => (
    /** tabBar={ props => <CustomTabBar {...props} />} ---> 
     *  estou utilizando minhas próprias customizações do tabBar
     * 
     * basicamente, as propriedades que têm em tabBar estão sendo passadas para
     * o CustomTabBar em formato de props. O props está encapsulando todas as 
     * propriendades, dentre elas 2:
     * - state: estado
     * - navigation: nevagação
     * 
     * Ou seja, quem usar as props do tabBar vai herdas esses dois params
     * */ 
    <Tab.Navigator
        tabBar={ props => <CustomTabBar {...props} />}
        screenOptions={{
            headerShown: false
        }}
    >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Appointments" component={Appointments} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
)