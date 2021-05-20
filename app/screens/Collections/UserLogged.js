import React,{useState, useRef, useEffect} from 'react'
import { Button } from 'react-native-elements'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import firebase from 'firebase'
import Infouser from '../../components/Collections/Infouser'
import Toast from 'react-native-toast-message';
//import Loading from '../../components/Loading'

export default function UserLogged(){
    const [userInfo, sethUserInfo] = useState(null)
    const [reloadUserInfo, setreLoadUserInfo] = useState(false)
    const toastRef = useRef()
    useEffect( ()=>{
        (async()=>{
            const user = await firebase.auth().currentUser
            sethUserInfo(user)
        })()
        setreLoadUserInfo(false)
    }, [reloadUserInfo])

    return(
        <ScrollView>
            <View>
                {userInfo && (<Infouser userInfo={userInfo} toastRef={toastRef} setreLoadUserInfo={setreLoadUserInfo}/>)}
                <Toast ref={toastRef}/>
            </View>
            <View style={styles.viewcontainer}>
                <Button
                    title='Cerrar sesión' 
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btnRegister}
                    onPress={()=>firebase.auth().signOut()}/>
            </View>
            <Toast ref={toastRef}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    btnContainer:{
        marginTop: 20,
        paddingTop:30,
        width: '95%'
        
    },
    btnRegister:{
        backgroundColor: '#FF0080'
    },
    viewcontainer:{
        alignItems: 'center',
        marginBottom: 20
    }
})