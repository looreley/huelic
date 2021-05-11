import React,{useRef} from 'react'
import {StyleSheet,View,Text,scrollView,Image} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RegisterForm from '../../components/Collections/RegisterForm'
import Toast from 'react-native-toast-message'

export default function Register(){
    const toastRef = useRef()

    return(
        <KeyboardAwareScrollView>

            <Image
                source={require('../../../assets/img/ice-cream.jpg')}
                resizeMode='contain'
                style={styles.logo}
           />
           <View style = {styles.viewForm}>
              <RegisterForm toastRef={toastRef}/>
           </View>
           <Toast ref={toastRef}/>
           
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