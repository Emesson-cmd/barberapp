import React, { useState, useContext } from "react"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-community/async-storage"

import { UserContext } from '../../contexts/UserContext'

import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles'

import Api from '../../Api'

import SignInput from '../../components/SignInput'

import BarberLogo from '../../assets/barber.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'
import PersonIcon from '../../assets/person.svg'
import { Alert } from "react-native"

export default () => {
    /** 
     * Renomeando dispatch para userDispatch
     * O dispatch serve para setar alguma coisa. Talvez as informações
     * globais do usuário. Vai chamar as ações que criamos para trocar
     * os dados do usuário
     */
    const { dispatch: userDispatch } = useContext(UserContext)

    const navigation = useNavigation(); 

    const [nameField, setNameField] = useState('')
    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')

    const handleSignClick = async () => {
        if(nameField != "" && emailField != "" && passwordField != "") {
            let json = await Api.signUp(nameField, emailField, passwordField);

            if (json.token) {
                /** Salva o token no AsyncStorage */
                await AsyncStorage.setItem("token", json.token);

                /** Seta o avatar do usuário no context (global) */
                userDispatch({
                    type: "setAvatar", 
                    payload: {
                        avatar: json.data.avatar
                    }
                })

                /** Manda o usuário pra MainTab */
                navigation.reset({
                    routes: [{name: 'MainTab'}]
                })
            } else {
                Alert.alert("Cadastro", "Erro: " + json.error)
            }
        } else {
            Alert.alert("Cadastro", "Preencha todos os campos")
        }
    }

    const handleMesssageButtonClick = () => {
        /** 
         * Reset significa que eu vou viajar par outra tela mas não
         * terei possibilidade de voltar
         */
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }
    
    return (
        <Container>
            <BarberLogo width="100%" height="160" />

            <InputArea>
                <SignInput 
                    IconSvg={PersonIcon} 
                    placeholder="Digite seu nome" 
                    value={nameField}
                    onChangeText={setNameField}
                />

                <SignInput 
                    IconSvg={EmailIcon} 
                    placeholder="Digite seu e-mail" 
                    value={emailField}
                    onChangeText={setEmailField}
                />

                <SignInput 
                    IconSvg={LockIcon} 
                    placeholder="Digite sua senha" 
                    value={passwordField}
                    onChangeText={setPasswordField}
                    password={true}
                />
                
                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMesssageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça login</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    )
}