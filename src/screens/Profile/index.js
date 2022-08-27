import React from 'react'
import { 
    Container,
    BackButton,
    Logout,
    LogoutText,
    Title,

    ProfilePic,
    ContainerPic,

    UserInfo,
    UserName,
    Name,
    UserPhone,
    Phone,
    UserEmail,
    Email,

    Button,
    Text
} from './styles'

import { useNavigation } from '@react-navigation/native'

import Api from '../../Api'

import BackIcon from "../../assets/back.svg"
import EmailIcon from "../../assets/email.svg"


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

    const handleBackButton = () => {
        navigation.goBack()
    }

    return (
        <Container>
            <Title>Meu Perfil</Title>

            <Logout  onPress={handleLogoutClick} ><LogoutText>Sair</LogoutText></Logout>

            <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF" />
            </BackButton>

            <ContainerPic>
                <ProfilePic source={{uri: "https://api.b7web.com.br/devbarber/media/avatars/3.png"}} />
            </ContainerPic>

            <UserInfo>
                <UserName>
                    <EmailIcon />
                    <Name>Emesson Cavalcante</Name>
                </UserName>

                <UserPhone>
                    <EmailIcon />
                    <Phone>(00) 00000-0000</Phone>
                </UserPhone>

                <UserEmail>
                    <EmailIcon />
                    <Email>emesson@email.com</Email>
                </UserEmail>
            </UserInfo>

            <Button>
                <Text>Alterar Dados</Text>
            </Button>

            <Button>
                <Text>Alterar senha</Text>
            </Button>
        </Container>
    )
}