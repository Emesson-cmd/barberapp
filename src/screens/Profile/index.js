import React from 'react'
import { Button, Text } from 'react-native'
import { Container } from './styles'

import { useNavigation } from '@react-navigation/native'

import Api from '../../Api'

export default () => {

    const navigation = useNavigation()

    const handleLogoutClick = async () => {
        await Api.logout();
        navigation.reset(
            {
                routes: [{name: "SignIn"}]
            }
        )
    }

    return (
        <Container>
            <Text>Profile</Text>
            <Button title="Sair" onPress={handleLogoutClick}></Button>
        </Container>
    )
}