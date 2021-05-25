import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { Input, Button, Avatar, Icon } from 'react-native-elements'
import Modal from '../../components/Modal'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import {map, size} from 'lodash'
import MapView from 'react-native-maps'


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

    const [imageSelected, setImageSelected] = useState([])
    const [locationComponent, setLocationComponent] = useState(null)

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
                
                <UploadImage
                    toastRef={toastRef}
                    imageSelected={imageSelected}
                    setImageSelected={setImageSelected}
                />

                <Button
                    title= 'Agregar Postree'
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={onSubmit}
                    
                />
                <Maps isVisibleMap={isVisibleMap} setisVisibleMap={setisVisibleMap} setLocationComponent={setLocationComponent}>
                </Maps>
            </View>
        </ScrollView>
    )
}

function Maps(props){
    const {isVisibleMap, setisVisibleMap, setLocationComponent} = props
    const [location, setLocation] = useState(null)

    useEffect(() => {
        (async()=>{
            const resultPermissions = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND)
            console.log(resultPermissions)
            const statusPermissions = resultPermissions.permissions.locationForeground.status
            if(statusPermissions==='granted'){
                const locate = await Location.getCurrentPositionAsync({})
                console.log(locate)
                setLocation({
                    latitude: locate.coords.latitude,
                    longitude: locate.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                })
            }
        })()
    }, [])

        const confirmLocation=()=>{
            setLocation(location)
            setisVisibleMap(false) 
            console.log('Ubicacion guardada con exito')
            console.log(location)
            
        }

    return(
        <Modal isVisible={isVisibleMap} setIsVisible={setisVisibleMap}>
            <View>
                {location&&
                    <MapView
                    style={styles.mapStyle}
                    initialRegion={location}
                    showsUserLocation={true}
                    onRegionChange={(region)=>setLocation(region)}
                    >
                    <MapView.Marker
                        coordinate={{
                            latitude:location.latitude,
                            longitude:location.longitude
                        }}
                        draggable
                    />
                    </MapView>}
                    <View style={styles.viewBtn}>
                        <Button
                            title='Guardar Ubicación'
                            containerStyle={styles.viewMapBtnContainerSave}
                            buttonStyle={styles.viewMapBtnSave}
                            onPress={confirmLocation}
                        />
                        <Button
                            title='Cancelar la Ubicación'
                            containerStyle={styles.viewMapBtnContainerCancel}
                            buttonStyle={styles.viewMapBtnCancel}
                            onPress={()=>setisVisibleMap(false)}
                        />
                    </View>
            </View>
        </Modal>
    )
}

function UploadImage({toastRef, imageSelected, setImageSelected}){
    
    const changeAvatar= async()=>{
    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    const resultPermissionsCamera = resultPermissions.permissions.mediaLibrary.status

    if(resultPermissionsCamera === 'denied'){
        toastRef.current.show({
            type: 'info',
            position: 'top',
            text1: 'Permissions',
            text2: 'Es necesario aceptar los permisos de la galeria',
            visibilityTime: 3000
        })
    }else{
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing:true,
            aspect:[4,3]
        })
        console.log(result)
        if (result.cancelled){
            toastRef.current.show({
                type: 'info',
                position: 'top',
                text1: 'Cancelled',
                text2: 'No elegiste una imagen',
                visibilityTime: 3000
            })
        } else{
            setImageSelected([...imageSelected, result.uri])
        }
    }
}

    return(
        <ScrollView
            horizontal
            style={styles.viewImage}
        >
           {
               size(imageSelected) < 4 &&(
                <Icon
                        type="material-community"
                        name="camera"
                        color="#00a680" //poner azul
                        size={50}
                        iconStyle={styles.iconS}
                        containerStyle={styles.containerIcon}
                        onPress={ changeAvatar }

                    />
                    )
               }
               {
                    map(imageSelected,(imageComponent, index)=>(
                        <Avatar
                            key={index}
                            style={styles.miniatureStyle}
                            source={{uri:imageComponent}}
                            />
                    ))
               }
        </ScrollView>
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
    viewImage:{
        flexDirection: 'row',
        marginHorizontal:20,
        marginTop: 30,
    },
    containerIcon:{
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:10,
        height: 70,
        width:70,
        backgroundColor: '#00a680'
    },
    miniatureStyle:{
        width: 70,
        height: 70,
        marginRight: 20
    },
    mapStyle:{
        width: '100%',
        height: 550
    },
    viewBtn:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    viewMapBtnContainerSave:{
        paddingRight: 5
    },
    viewMapBtnSave:{
        backgroundColor:'#00a680'
    },
    viewMapBtnContainerCancel:{
        paddingRight: 5
    },
    viewMapBtnCancel:{
        backgroundColor:'#a60d06'
    }
})  