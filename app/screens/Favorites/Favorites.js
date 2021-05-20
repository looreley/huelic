import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Icon} from 'react-native-elements'
import {firebaseApp} from '../../utils/firebase'
import firebase from 'firebase/app'
import {useNavigation} from '@react-navigation/native'

export default function Components(){
    const [user, setUser] = useState(null)
    const navigation = useNavigation()

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo)=>{
            setUser(userInfo)
    })}, [])

    return(
        <View style={styles.viewBody}>
            {user &&
            <Icon
            reverse
                type= 'material-community'
                name='plus'
                color='#FF0080'
                containerStyle={styles.btnContainer}
                onPress={()=>navigation.navigate('addFavorites')}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor: '#fff'
    },
    btnContainer:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        shadowColor: 'black',
        shadowOffset:{width: 2, height: 2},
        shadowOpacity: 0.5
    }
})