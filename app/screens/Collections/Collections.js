import React, { useState,useEffect } from 'react'
import { View, Text } from 'react-native'
import firebase from 'firebase'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import Loading from '../../components/Loading'

export default function Collections(){
    const [login, setLogin] = useState(null)

    useEffect(() =>{
        firebase.auth().onAuthStateChanged((User) =>{
            ! User ? setLogin(false) : setLogin(true)
        })
    }, [])

    if (login===null) return <Loading isVisible = {true} text='cargando...'/>

   return login ? <UserLogged/> : <UserGuest/>
          
     
 }