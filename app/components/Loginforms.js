import React, {useState} from 'react'
import { StyleSheet, View,Text } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'
import { valideteEmail } from '../../utils/Validation'
import firebase from 'firebase'


export default function RegisterForma(props){
    const {toastRef} = props
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues()) 
    const navigation = useNavigation()

    const onSubmit = () =>{
        if (formData.email.length===0||formData.password.length===0||formData.reapeatPassword.length===0){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'Todos los campos son requeridos',
                visibilityTime: 3000,

            });
        } else if (!valideteEmail(formData.email)){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'correo',
                text2: 'El correo es  incorrecto',
                visibilityTime: 3000,
            });
        } else{
            firebase
            .auth()
            .singWithEmailAndPassword(formData.email, formData.password)
            .then(()=>{
                navigation.navigate('Collections')  
            })
            .catch(()=>{
                toastRef.current.show({
                    type: 'error',
                    position: 'top',
                    text1: 'cuenta',
                    text1: 'las credenciales no son correctas',
                    visibilityTime: 3000,  
                });
            })
        }
    }

    const onChange =(e,type) =>{
        setFormData({ ...formData, [type]: e.nativeEvent.text})
    }
    


    return(
        <View style={styles.formContainer}>
        <Input
            placeholder='CORREO ELECTRONICO'
            containerStyle={styles.inputForm}
            onChange={(e)=>onChange(e, 'email')}
            rightIcon={<Icon type='material-community' name='at' iconStyle={styles.iconRight}/>}
        />

        <Input
        placeholder='Contraseña'
        containerStyle={styles.inputForm}
        onChange={(e)=>onChange(e, 'password')}
        secureTextEntry={showPassword ? false : true}
        rightIcon={<Icon 
            type='material-community'
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.iconRight}  
            onPress={()=> setShowPassword(!showPassword)}  
            />}    
        />

        <Input
        placeholder='Repetir contraseña'
        containerStyle={styles.inputForm}
        onChange={(e)=>onChange(e, 'reapeatPassword')}
        rightIcon={<Icon 
            type='material-community'
            name={showRepeatPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.iconRight}
            onPress={()=> setShowRepeatPassword(!showRepeatPassword)}
            />}
        />

        <Button
        title='únete'
        containerStyle={styles.bntContyainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
        />





        </View>
    )
}
function defaultFormValues(){
    return{
        email: '',
        password: '',
        reapeatPassword: '',
    }
}

const styles = StyleSheet.create({
    formContainer:{
        marginTop:30
    },

    inputForm:{
        width: '100%',
        marginTop: 20
    },

    bntContyainerRegister:{
        marginTop: 20,
        width: '100%'
    }, 

    btnRegister:{
        backgroundColor:'#00a680'
    },

    iconRight:{
        color: '#c1c1c1'
    }
})
