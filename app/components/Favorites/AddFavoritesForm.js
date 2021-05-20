import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { Input, Button, Avatar } from 'react-native-elements'
import Modal from '../../components/Modal'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'


export default function AddFavoritesForm(props){
    const {toastRef, setIsLoading, navigation} = props
    const [namePostre, setNamePostre] = useState(null)
    const [Ingredientes, setIngredientes] = useState(null) 
    const [locacion, setlocacion] = useState(null)
    const [Procedimiento, setProcedimiento] = useState(null)
    const [errorPostre, setErrorPostre] = useState(null) 
    const [errorIngredientes, setErrorIngredientes] = useState(null) 
    const [errorDescripcion, setErrorDescripcion] = useState(null)
    const [isVisibleMap, setisVisibleMap] = useState(null)

    const onSubmit = ()=>{
        
        if(!namePostre && !Ingredientes && !Procedimiento){
            setErrorPostre('Nombre del postre es requerido')
            setErrorIngredientes('Nombre de los Ingredientes es requerido')
            setErrorDescripcion('Descripcion es requerido del postre')
        }else if(!Ingredientes && !Procedimiento){
            setErrorPostre(null)
            setErrorIngredientes('Nombre de los Ingredientes es requerido')
            setErrorDescripcion('Descripcion es requerido del postre')
        }else if(!namePostre && !Procedimiento){
            setErrorPostre('Nombre del postre es requerido')
            setErrorIngredientes(null)
            setErrorDescripcion('escriDpcion es requerido')
        }else if(!Ingredientes && !namePostre){
            setErrorPostre('Nombre del postre es requerido')
            setErrorIngredientes('Nombre de los Ingredientes es requerido')
            setErrorDescripcion(null)
        }else if(!namePostre){
            setErrorPostre('Nombre del postre es requerido')
            setErrorIngredientes(null)
            setErrorDescripcion(null)
        }else if(!Ingredientes){
            setErrorPostre(null)
            setErrorIngredientes('Nombre de los Ingredientes es requerido')
            setErrorDescripcion(null)
        }else if(!Procedimiento){
            setErrorPostre(null)
            setErrorIngredientes(null)
            setErrorDescripcion('Descripcion es requerido del postre')
        }else{
            setErrorPostre(null)
            setErrorIngredientes(null)
            setErrorDescripcion(null)
            console.log('Nombre del Postree:', namePostre)
            console.log('Nombre de la Ingredientes:', Ingredientes)
            console.log('Nombre de la Ingredientes:', locacion)
            console.log('Descripción del producto:', Procedimiento)
        }
    }
    return(
        <ScrollView >
            <View style={styles.view}>
                <Input
                    placeholder='Nombre del Postree'
                    containerStyle={styles.input}
                    rightIcon={{
                        type:'material-community',
                        name:'candycane',
                        color:'#FF0080'
                    }}
                    onChange={(e)=>setNamePostre(e.nativeEvent.text)}
                    errorMessage={errorPostre}
                />
                <Input
                    placeholder='Ingredientes'
                    containerStyle={styles.input}
                    rightIcon={{
                        type:'material-community',
                        name:'shaker',
                        color:'#FF0080'
                    }}
                    onChange={(e)=>setIngredientes(e.nativeEvent.text)}
                    errorMessage={errorIngredientes}
                />
                    <Input
                    placeholder='Locacion(Opcional)'
                    containerStyle={styles.input}
                    rightIcon={{
                        type:'material-community',
                        name:'google-maps',
                        color:'#FF0080',
                        onPress:()=> setisVisibleMap(true)
                    }}
                    onChange={(e)=>setlocacion(e.nativeEvent.text)}

                />
                <Input
                    placeholder='Descripicon'
                    multiline={true}
                    containerStyle={styles.input}
                    rightIcon={{
                        type:'material-community',
                        name:'clipboard-list-outline',
                        color:'#FF0080'
                    }}
                    onChange={(e)=>setProcedimiento(e.nativeEvent.text)}
                    errorMessage={errorDescripcion}
                />
                <Button
                    title= 'Agregar Postree'
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={onSubmit}
                    //loading={isLoading}
                />
                <Maps isVisibleMap={isVisibleMap} setisVisibleMap={setisVisibleMap}>
                    <Text>Cha</Text>
                </Maps>
            </View>
        </ScrollView>
    )
}

function Maps(props){
    const {isVisibleMap, setisVisibleMap} = props
    const [location, setLocation] = useState(null)

    useEffect(() => {
        (async()=>{
            const resultPermissions = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND)
            console.log(resultPermissions)
            const statusPermissions = resultPermissions.permissions.locationForeground.status
            if(statusPermissions==='granted'){//poner toast aqui plis
                const locacion = await Location.getCurrentPositionAsync({})
                console.log(locacion)
                setLocation({
                    latitude: locacion.coords.latitude,
                    longitude: locacion.coords.longitude
                })
            }
        })()
    }, [])

    return(
        <Modal isVisible={isVisibleMap} setIsVisible={setisVisibleMap}>
            <Text>Postre</Text>
        </Modal>
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
    }
})