import React from 'react'
import {StyleSheet, View,Text,ActivityIndicator} from 'react-native'
import { Overlay } from 'react-native-elements/dist/overlay/Overlay'

export default function Loading(props){
    const {isVisible,text} = props
    return(
        <Overlay
            isVisible ={isVisible}
            windowBackgroundColor = 'rgba(0, 0, 0.5)'
            OverlayBackgroundColor = ' transparent'
            overlayStyle = {styles.Overlay}
         >
            <View>
                <ActivityIndicator size='large' color= '#FF1694'/>
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    Overlay:{
        height:100,
        width:200,
        backgroundColor: '#fff',
        borderColor: '#FF1694',
        borderwidth:2,
        borderRadius:2
    },
    text:{
        color:'#FF1694',
        textTransform:'uppercase',
        marginTop:10

    }
})  