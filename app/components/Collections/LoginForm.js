import React, { useState } from  'react'
import { StyleSheet, View, Text } from 'react-native'
import {Input, Icon, Button} from 'react-native-elements'
import {valideteEmail} from '../../utils/Validation'
import firebase from 'firebase'
import {useNavigation} from '@react-navigation/native'
 
export default function RegisterForm(props){
    const {toastRef} = props
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormatValues())
    const navigation = useNavigation()

    const onSumit = () =>{
        if(formData.email.length===0 || formData.password.length===0){
            console.log('El email no es correcto')
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'Todos los campos son requieridos',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
                onShow: () => {},
                onHide: () => {},
                onPress: () => {}
              });
        } else if (!valideteEmail(formData.email)){
            console.log('El email no es correcto')
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Ya quieres Hackear esta cuenta',
                text2: 'El email no es correcto',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
                onShow: () => {},
                onHide: () => {},
                onPress: () => {}
              });
        } else if (formData.password.length < 6){
            console.log('El password debe tener mímo 6 caracteres')
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Ojo, muhcho cuidado',
                text2: 'Recuerda que password debe tener mímo 6 caracteres',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
                onShow: () => {},
                onHide: () => {},
                onPress: () => {}
              });
        } else {
            console.log('Todo OK')
            firebase
            .auth()
            .signInWithEmailAndPassword(formData.email, formData.password)
            .then((response)=>{
                //console.log(response)
                navigation.navigate('Collections')
            })
            .catch((err)=>{
                //console.log(err)
                toastRef.current.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Error',
                    text2: 'Correo o contraseña invalido',
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                    onShow: () => {},
                    onHide: () => {},
                    onPress: () => {}
                  });
            })
        }
    }

    const onChange = (e, type) => {
        //console.log(type)
        //console.log(e.nativeEvent.text)
        //setFormData({[type]: e.nativeEvent.text})
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    return(
        
        <View style={styles.formContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>Formulario de registro</Text>
            </View>
            <Input
                placeholder='Correo electronico'
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, 'email')}
                rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon}/>}
            />
            <Input
                placeholder='Contraseña'
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, 'password')}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title='Login'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnRegister}
                onPress={onSumit}
            />
            
        </View>
        
    )
}

function defaultFormatValues(){
    return{
        email: '',
        password: '',
        repeatPassword: ''
    }
}

const styles = StyleSheet.create({
    formContainer:{
        marginTop: 30
    },
    inputForm:{
        width:'100%',
        marginTop: 20
    },
    icon:{
        color:"#fff"
    },
    btnContainer:{
        marginTop: 20,
        width: '95%'
        
    },
    btnRegister:{
        backgroundColor: '#00a680'
    },
    textContainer:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    }
    ,
    textStyle:{
        fontWeight: "bold",
        fontSize: 20,
        color: '#00a680'
    }
})