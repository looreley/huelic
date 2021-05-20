import React from  'react'
import {createStackNavigator} from '@react-navigation/stack'
import Favorites from '../screens/Favorites/Favorites'
import AddFavorites from '../components/Favorites/AddFavorites'

const Stack = createStackNavigator()

 export default function FavoritesStack(){
     return(
         <Stack.Navigator>
             <Stack.Screen
                 name=' Favorites'
                 component={Favorites}
                 options={{title:'Favoritos'}}
             />
             <Stack.Screen
                 name='addFavorites'
                 component={AddFavorites}
                 options={{title:'Add Favoritos'}}
             />
         </Stack.Navigator>
     )

}