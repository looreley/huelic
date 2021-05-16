import React, {useState,useRef,useEffect} from 'react'
import {View, Text, StyleSheet } from 'react-native'
import {Button} from 'react-native-elements'
import Toast from 'react-native-toast-message'
import firebase from 'firebase'
import InfoUser from'../../components/Collections/InfoUser'


export default function UserLoged(){
    const [userInfo, setUserInfo] = useState(null)
    const toastRef = useRef()
    useEffect(()=>{
        (async()=>{
            const user = await firebase.auth().currentUser
            setUserInfo(user)

        })()
    },[])    
    return(
        <View style={styles.viewUserInfo}>
            {userInfo&&<InfoUser userInfo={userInfo} toastRef={toastRef}/>}            
             <Text>collectionsOotions......</Text>
            <Button 
            title='Cerrar sesión'
            buttonStyle={styles.btnCloseSesion}
            titleStyle={styles.btnCloseSesionText}
            onPress={()=>firebase.auth().signOut()}
            />
            <Toast ref={toastRef}/>
        </View>
    )
}
    const styles = StyleSheet.create({
      viewUserInfo:{
        minHeight:'100%' ,
        backgroundColor:'#feebed'
    },
    btnCloseSesion:{
        marginTop: 10,
        borderRadius: 0,
        backgroundColor:'#fbd8dc',
        borderTopColor: 1, 
        borderStartColor:'#feebed',
        borderBottomWidth: 1,
        borderBottomColor:'#feebed',
        paddingTop: 10,
        paddingBottom: 10

    },
    btnCloseSesionText:{
        color: '#FF0080'
    }

})
