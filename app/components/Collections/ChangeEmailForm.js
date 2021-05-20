import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import firebase from 'firebase'
import {valideteEmail} from '../../utils/Validation'

export default function ChangeEmailForm(props){
    const {email, setShowModal, toastRef, setreLoadUserInfo} = props
    const [newemail, setNewemail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)
    const [errorPass, setErrorPass] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    
    

    const onSubmit = ()=>{
        setError(null)
        if(!newemail){
            setError('El email no puede ser vacio')
            
        } else if(email === newemail){
            setError('El email no puede ser igual')
        }else if(!valideteEmail(newemail)){
            setError('Email no valido')
        }else if(!password){
            setErrorPass('Ingrese el password')
        } else{
            setIsLoading(true)
            
            var user = firebase.auth().currentUser;
            const credential = firebase.auth.EmailAuthProvider.credential(
                email,
                password
            )
                    
                    
            user.reauthenticateWithCredential(credential).then(function() {
                firebase   
                .auth()
                .currentUser.updateEmail(newemail)
                .then(()=>{
                    console.log('Ta bien desde firebase')
                    setIsLoading(false)
                    setreLoadUserInfo(true)
                    setShowModal(false)
                })   
                .catch((error)=>{
                    console.log(error)

                    setIsLoading(false)
                })    
            }).catch(function(error) {
                setIsLoading(false)
                setErrorPass('El password no es correcto')

            });
            
        }
    }

    return(
        <View style={styles.view}>
            <Input
                placeholder='Correo Nuevo'
                containerStyle={styles.input}
                rightIcon={{
                    type:'material-community',
                    name:'at',
                    color:'#FF0080'
                }}
                defaultValue={email || ''}
                onChange={(e)=>setNewemail(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Input
                placeholder='Contraseña'
                containerStyle={styles.input}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                    
                }
                //defaultValue={email || ''}
                onChange={(e)=>setPassword(e.nativeEvent.text)}
                errorMessage={errorPass}
            />

            <Button
                title= 'Cambiar Email'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        marginBottom:10
    },
    view:{
        alignItems:'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnContainer:{
        marginTop:20,
        width:'95%'
    },
    btn:{
        backgroundColor: '#FF0080'
    },
    icon:{
        color:'#FF0080'
    }
})