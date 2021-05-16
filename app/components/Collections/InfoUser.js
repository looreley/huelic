import React from 'react'
import {StyleSheet, View, Text } from 'react-native'
import {Avatar} from 'react-native-elements'
import firebase from 'firebase'
import * as permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import  CollectionOption from '../Collections/CollectionOption'

export default function Infouser(props) {
    const {userInfo: { uid, photoURL, displayName, email}, toastRef} = props

    const changeAvatar= async ()=>{
        const resultPermissions = await permissions.askAsync(permissions.CAMERA_ROLL)
        const resultPermissionsCamera = resultPermissions.permissions.mediaLibrary.status
        if(resultPermissionsCamera === 'denied'){
            toastRef.current.show({
                type: 'info',
                position: 'top',
                text1: 'Password',
                text2: 'Es necesario aceptar los permisos de galeria',
                visibilityTime: 3000,  
            });

        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                aspect:[4,3]
            })
            console.log(result)
            if (result.cancelled.show){
                toastRef.current.show({

                    type: 'info',
                    position: 'top',
                    text1: 'cancelled',
                    text2: 'No eligistes un avatar',
                    visibilityTime: 3000,  

                });
            } else{
                uploadImage(result.uri).then(()=>{
                    console.log('Imagen subida en firebase')
                    updatePhotoUrl()
                }).catch(()=>{
                    toastRef.current.show({

                        type: 'error',
                        position: 'top',
                        text1: 'Firebase error',
                        text2: 'error a actualizar el avatar',
                        visibilityTime: 3000,  
    
                    });
                })
                }
            }
        }

     const uploadImage = async (uri) => {
         console.log('*************** URI ****************')
         console.log(uri)
         const response = await fetch(uri) 
         console.log(JSON.stringify(response))
         const blob = await response.blob()
         console.log('*****************')
         console.log(JSON.stringify(blob))
         const ref = firebase.storage().ref().child(`avatar/${uid}`) 
         return ref.put(blob)   
     }
     const updatePhotoUrl = () =>{
        firebase
        .storage()
        .ref(`avatar/${uid}`)
        .getDownloadURL()
        .then(async(response)=>{
            console.log(response)
            const update = {
                photoURL: response
            }
            await firebase.auth().currentUser.updateProfile(update)
            console.log('Imagen actualizada')
        })
    }
    return(
           <View style={styles.viewUserInfo}>
                <Avatar
                 title='IGR'
                 rounded
                 size='large'
                 onPress={changeAvatar}
                 containerStyle={styles.userInfoAvatar}
                 source={
                      photoURL ? { uri:photoURL } : require('../../../assets/img/avatar.jpg')
                }
            />
            <View>
                 <Text style={styles.displayName}>
                      {displayName ? displayName : 'Invitado'}
                </Text>
                <Text> { email ? email : 'Entrada atravez po FB'}</Text>
            </View>
            <CollectionOption/>
        </View>

    )
  
}   
const styles = StyleSheet.create({
    ViewUserInfo:{
        alignItems:   'center',
        justifyContent:  'center',
        flexBasis: 'row',
        backgroundColor: '#F2F2F2',
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginTop: 20,
        backgroundColor: '#feebed',
    },
    displayName:{
        fontWeight: 'bold',
        paddingBottom: 30,
    }
})

    