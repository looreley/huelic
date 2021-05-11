import React, {useState} from 'react'
import { StyleSheet, View,Text } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { valideteEmail } from '../../utils/Validation'
import firebase from 'firebase'
import {useNavigation} from '@react-navigation/native'
import Registrer from '../../components/Collections/RegisterForm'


export default function RegisterForma(props){
    const {toastRef} = props
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)
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
        } else if (formData.password !== formData.reapeatPassword){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Password',
                text2: 'La contraseña deben ser indenticas',
                visibilityTime: 3000,
    
            });
        } else if (formData.password.length < 6){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Password',
                text2: 'La contraseña debe de tener como minimo 6 caracteres',
                visibilityTime: 3000,

            });
        } else{
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Password',
                text2: 'Exelente esta cuenta fue guardado exitosamente',
                visibilityTime: 3000,  
            });
            
            firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then((response)=>{
                navigation.navigate('Collections')  
            })
            .catch(()=>{
                toastRef.current.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Password',
                    text2: 'Este correo ya fue utilidado',
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