import React from 'react'
import {StyleSheet,View,Text,Image} from 'react-native'
import RegisterForm from '../../components/Collections/RegisterForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Register(){
    return(
        <KeyboardAwareScrollView>
               <Image
            source={require('../../../assets/img/ice-cream.jpg')}
            resizeMode='contain'
            style={styles.logo}
        />
        <View style = {styles.viewForms}>
            <RegisterForm/>
            </View>
       </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    logo:{
        width:'100%',
        height:180,
        marginTop:15
    },
    viewForms:{
        marginRight:40,
        marginLeft:40

    
    },
})  