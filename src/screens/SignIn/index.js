/** useContext: retornar e aplicar dados do usuário em todo o ciclo da aplicação */
import React, { useState, useContext } from "react"
import { Alert } from "react-native"
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

/**
 * LOGIN COM JWT
 * 
 * Para realizar o login, estamos consumindo uma API já pronta que utiliza as
 * tecnologias LARAVEL e PHP. Estamos tratando também com tokens
 */

export default () => {
    /** 
     * Renomeando dispatch para userDispatch
     * O dispatch serve para setar alguma coisa. Talvez as informações
     * globais do usuário. Vai chamar as ações que criamos para trocar
     * os dados do usuário
     */
    const { dispatch: userDispatch } = useContext(UserContext)
    const navigation = useNavigation(); 

    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')

    /** Realizar login */
    const handleSignClick = async () => {
        if (emailField != "" && passwordField != ""){
            /** Chamada da requisição */
            let json = await Api.signIn(emailField, passwordField)

            if(json.token){
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
                Alert.alert("Login", "E-mail e/ou senha incorretos")
            }
        } else {
            Alert.alert("Login", "Preencha todos os campos")
        }
    }

    const handleMesssageButtonClick = () => {
        /** 
         * Reset significa que eu vou viajar para outra tela mas não
         * terei possibilidade de voltar
         */
        navigation.reset({
            routes: [{name: 'SignUp'}]
        });
    }
    
    return (
        <Container>
            <BarberLogo width="100%" height="160" />

            <InputArea>
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
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMesssageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    )
}