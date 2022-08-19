import React, { useEffect, useContext } from "react"
import { Container, LoadingIcon } from './styles'
import AsyncStorage from "@react-native-community/async-storage"
import { useNavigation } from "@react-navigation/native"

import { UserContext } from '../../contexts/UserContext'

import Api from '../../Api'

import BarberLogo from '../../assets/barber.svg'

export default () => {
    /** 
     * Renomeando dispatch para userDispatch
     * O dispatch serve para setar alguma coisa. Talvez as informações
     * globais do usuário. Vai chamar as ações que criamos para trocar
     * os dados do usuário
     */
    const { dispatch: userDispatch } = useContext(UserContext)
    const navigation = useNavigation();
    
    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem("token");
            if(token){
                // Validar o tokan

                /**
                 * Com o Context API eu consigo saber se o usuário está logado
                 * em qualquer parte da minha aplicação, em qualquer tela, por exemplo
                 * 
                 * Duas opções sobre isso:
                 * 1 - Context API do próprio React
                 * 2 - Reducer
                 */

                let json = await Api.checkToken(token);
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
                    navigation.navigate("SignIn");
                }
            } else {
                // Vai pro login se não tiver um token
                navigation.navigate("SignIn");

            }
        }
        checkToken()
    }, [])

    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>
    )
}
