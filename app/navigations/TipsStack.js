import React from  'react'
import {createStackNavigator} from '@react-navigation/stack'
import Tips from '../screens/Tips'

const Stack = createStackNavigator()

 export default function TipsStack(){
     return(
         <Stack.Navigator>
             <Stack.Screen
                 name=' Tips'
                 component={Tips}
                 options={{title:'Consejos'}}
             />
         </Stack.Navigator>
     )

}