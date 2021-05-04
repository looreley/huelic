import React from  'react'
import {createStackNavigator} from '@react-navigation/stack'
import Collections from '../screens/Collections'

const Stack = createStackNavigator()

 export default function CollectionsStack(){
     return(
         <Stack.Navigator>
             <Stack.Screen
                 name=' collections'
                 component={Collections}
                 options={{title:'Colecciones'}}
             />
         </Stack.Navigator>
     )

}