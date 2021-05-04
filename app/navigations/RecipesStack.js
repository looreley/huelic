import React from  'react'
import {createStackNavigator} from '@react-navigation/stack'
import Recipes from '../screens/Recipes'

const Stack = createStackNavigator()

 export default function RecipesStack(){
     return(
         <Stack.Navigator>
             <Stack.Screen
                 name=' Recipes'
                 component={Recipes}
                 options={{title:'Recetas'}}
             />
         </Stack.Navigator>
     )

}