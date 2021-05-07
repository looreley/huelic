import React from 'react'
import {NavigationContainer}  from '@react-navigation/native'
import {createBottomTabNavigator}from '@react-navigation/bottom-tabs'
import {Icon} from 'react-native-elements'

import RecipesStack from './RecipesStack'
import FavoritesStack from './FavoritesStack '
import TipsStack from './TipsStack'
import SearchStack from './SearchStack '
import CollectionsStack from './CollectionsStack '

const Tab = createBottomTabNavigator()

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                 initialRouteName='Recipes'
                 tabBarOptions={{
                    inactiveTintColor: '#646464',
                    activeTintColor:'#E11584'
                }}
                screenOptions={({route})  => ({
                    tabBarIcon:({ color }) => screenOptions(route,color)
                })}
            >
                <Tab.Screen 
                name='Recipes'
                component={RecipesStack}
                options={{title:'Recetas'}}
                />
                <Tab.Screen 
                name='Favorites'
                component={FavoritesStack}
                options={{title:'Favoritos'}}
                />
                <Tab.Screen 
                name='Tips'
                component={TipsStack}
                options={{title:'Consejos'}}
                />
                <Tab.Screen 
                name='Search'
                component={SearchStack}
                options={{title:'Buscar'}}
                />
                <Tab.Screen 
                name='Collections'
                component={CollectionsStack}
                options={{title:'Colecciones'}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )

}

 function screenOptions(route,color){
    let iconName
     
    switch(route.name){
        case 'Recipes':
           iconName='book'
            break
        case 'Favorites':
            iconName= 'favorite'
            break
        case 'Tips':
            iconName='icecream'
            break
        case 'Search':
            iconName='settings'
            break
        case 'Collections':
            iconName='apps'
            break
    }
    return(
       
        <Icon type='material-comunity' name={iconName} size={22} color={color}/>
    )
}


