import React from 'react'
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'

export default function Login(){
   return(
     <ScrollView>
        <Image
            source={require('../../../assets/img/ice-cream.jpg')}
            resizeMode='contain'
            style={styles.logo}
        />
        <View style={styles.viewContainer}>
            <Text>Login Form</Text>
            <CreateCollections/> 
        </View>
        <Divider style = {styles.divider}/>
      </ScrollView>
   )
}

function CreateCollections(){
    const navigation = useNavigation()
    return(
        <Text style= {styles.textRegister}>
            ¿Aún no tienes cuenta? { '' }
            <Text
               style = {styles.linkRegister}
               onPress={()=>navigation.navigate('register')}
            >
               Registrate
            </Text>
        </Text>
    )
}
const styles = StyleSheet.create({
     logo:{
         width:'100%',
         height:180,
         marginTop:15
     },
     viewContainer:{
         marginRight:50,
         marginLeft:50
     },
     textRegister:{
        marginTop:15,
        marginLeft:20,
        marginRight:20
     },
     linkRegister:{
         color: '#ff0080',
         fontWeight:'bold'
        
     },
     divider:{
         backgroundColor:'#ff0080',
         margin:40
     }
})
