import React, {useState, useRef} from 'react'
import {View, Text} from 'react-native'
import Loading from '../Loading'
import Toast from 'react-native-toast-message'
import AddFavoritesForm from './AddFavoritesForm'
import {useNavigation} from '@react-navigation/native'


export default function AddFavorites(){
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()
    const toastRef = useRef()
    return(
        <View>
            <Text>AddComponents</Text>
            <AddFavoritesForm toastRef={toastRef} setIsLoading={setIsLoading} navigation={navigation}/>
            <Loading isVisible={isLoading} text={'Cargando...'}/>
            <Toast ref={toastRef}/>
        </View>
    )
}