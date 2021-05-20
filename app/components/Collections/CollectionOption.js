import React, {useState} from 'react'
import {StyleSheet, View, Text } from 'react-native'
import {ListItem} from 'react-native-elements'  
import { Icon } from 'react-native-elements/dist/icons/Icon'
import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import ChangeEmailForm from './ChangeEmailForm'
import ChangePasswordForm from './ChangPasswordForm'

export default function CollectionOption(props){
    const {userInfo, toastRef, setreLoadUserInfo} = props 
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)
    const selectedComponent = (key) =>{
        switch(key){
            case 'displayName':
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setreLoadUserInfo={setreLoadUserInfo}
                    />
                )
                setShowModal(true)
                break
            case 'displayEmail':
                setRenderComponent(
                    <ChangeEmailForm
                    email={userInfo.email}
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                    setreLoadUserInfo={setreLoadUserInfo}
                    />
                )
                setShowModal(true)
                break
            case 'displayPassword':
                setRenderComponent(
                    <ChangePasswordForm
                    email={userInfo.email}
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                    setreLoadUserInfo={setreLoadUserInfo}
                />
                )
                setShowModal(true)
                break
            default:
                setRenderComponent(null)
                setShowModal(false)
                break
        }
    }
    const menuOptions = generateOptions(selectedComponent)

    return(
        <View>
            {menuOptions.map((menu, index)=>(
                <ListItem key={index} bottomDivider onPress={menu.onPress}>
                    <Icon name = {menu.iconNameLeft}/>
                    <ListItem.Content>
                        <ListItem.Title>{menu.title}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
            ))}
            <Modal isVisible={showModal} setIsVisible={setShowModal}>
                {renderComponent}
            </Modal>
        </View>
    )
}

function generateOptions(selectedComponent){
    return[
        {
            title: 'Cambiar nombre y apellidos',
            iconNameLeft: "account-circle",
            onPress: () => selectedComponent('displayName')
        },
        {
            title: 'Cambiar email',
            iconNameLeft: "drafts",
            onPress: () => selectedComponent('displayEmail')
        },

        {
            title: 'Cambiar contraseña',
            iconNameLeft: "lock",
            onPress: () => selectedComponent('displayPassword')
        }
    ]
}

const styles = StyleSheet.create({

})