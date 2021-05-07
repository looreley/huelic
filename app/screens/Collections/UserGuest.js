import  React from 'react'
import { StyleSheet,View,Text,ScrollView,Image } from 'react-native'
import { Button } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'

export default function UserGuest(){
      const navigation = useNavigation()
    return(
        <ScrollView style={styles.container}>
            <Image
                style={styles.stretch}
                source={require('../../../assets/img/user-guest.jpg')}
            />
            <Text style={styles.title}>Ingresa tu perfil</Text>
            <Text style={styles.description}>
                busca y prepara las recetas más prácticas
            </Text>
            <View style={styles.viewBtn}>
                <Button
                    title='ver tu perfil'
                    buttonstyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    onPress={()=>navigation.navigate('login')}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop:10
    },
    stretch:{
        width:'100%',
        height:180,
        resizeMode: 'contain',
        marginBottom:40
    },
    title:{
        fontWeigth:'bold',
        fontSize:15,
        marginBottom:10,
        textAling:'center'
    },
    description:{
        marginBottom:20,
        textAlign:'center'
    },
    ViewBtn:{
        flex:1,
        alignItems: 'center'
    },
    btnstyle:{
        backgroundColor:'#ff0080'
    },
    btncontainer:{
        marginTop:20,
        width:'95%'
    }

})