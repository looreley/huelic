import React from  'react'
import {createStackNavigator} from '@react-navigation/stack'
import Collections from '../screens/Collections/Collections'
import Login from '../screens/Collections/Login'
import Register from '../screens/Collections/Register'

const Stack = createStackNavigator()

 export default function CollectionsStack(){
     return(
         <Stack.Navigator>
            <Stack.Screen
                 name='Collections'
                 component={Collections}
                 options={{ title:'Colecciones'}}
            />
            <Stack.Screen
                 name='login'
                 component={Login}
                 options={{ title:'iniciar sesión'}}
            />
            <Stack.Screen
                 name='register'
                 component={Register}
                 options={{title:'registro'}}
            />
        </Stack.Navigator>
    )
      
}