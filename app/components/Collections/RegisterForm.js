import React, {useState} from 'react'
import {StyleSheet, View,Text} from 'react-native'
import {Input, Icon, Button} from 'react-native-elements'

export default function RegisterForm(){
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)
    const [formData,setFormData] =useState(defaultFormValues())

    const onSubmit = () => {
        console.log(formData)
    }
 
    const onChage = (e, type) => {
        // console.log(type)
        // console.log(e.nativeEvent.text)
        // setFormData({[type]: e.nativeEvent.text})
        setFormData({ ...formData, [type]: e.nativeEvent.text})
    }

    return(
        <View style={styles.formContainer}>
            <Input
                 placeholder='Correo electrónico'
                 containerStyle={styles.inputForm}
                 onChange={(e)=>onChage(e, 'password')}
                 rightIcon={<Icon type='material-community'name='at'iconStyle={styles.iconRight}/>}
            />
            <Input
                 placeholder='Contraseña'
                 containerStyle={styles.inputForm}
                 password={true}
                 secureTextEntry={showPassword ? false : true}
                 onChange={(e)=>onChage(e, 'password')}
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
                 password={true}
                 secureTextEntry={showRepeatPassword ? false : true}
                  onChange={(e)=>onChage(e, 'password')}
                 rightIcon={<Icon 
                    type='material-community'
                    name={showRepeatPassword ? 'eye-off-outline' :'eye-outline' }
                    iconStyle={styles.iconRight}
                    onPress={()=> setShowRepeatPassword(!showRepeatPassword)}
                />}
            />
            <Button
                title='únete'
                containerStyle={styles.btnContainerRegister}
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
        repeatPassword: '',
    }
}

const styles = StyleSheet.create({

    formContainer:{
        marginTop:30
    },
    inputForm:{
        width:'100%',
        marginTop:20
    
    },
    btnContainerRegister:{
        marginTop:20,
        width:'95%' 
    },
    btnRegister:{
        backgroundColor:'#ff0080'
    },       
    iconRight:{
        color:'#c1c1c1'
    }
  
}) 
