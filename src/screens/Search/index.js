import React, { useState } from 'react'
import { Alert, RefreshControl } from 'react-native'
import { useNavigation  } from '@react-navigation/native'
import { 
    Container,
    LocationArea,
    LocationInput,
    BarbersList,
    BackButton,
    LoadingIcon,
    Scroller
} from './styles'

import BackIcon from '../../assets/back.svg'

import Api from "../../Api"

import BarberItem from '../../components/BarberItem'

export default () => {
    const [searchText, setSearchText] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const navigation = useNavigation();
    
    const handleBackButton = () => {
        navigation.goBack()
    }

    const handleBarberSearch = async () => {
        /** 
         * Deveria haver um API para que eu pudesse fazer a requisição
         * de um barbeiro pelo nome
         */
        const res = await Api.getBarbers(null, null, null)

        setLoading(true)

        if(res.error == ""){
            setList(res.data)
        } else {
            Alert.alert("Erro", "Houve um erro ao tentar buscar barbeiros: " + res.error)
        }

        setLoading(false)
    }

    const onRefresh = () => {
        setRefreshing(false)
        handleBarberSearch()
    }

    useState(()=>{
        handleBarberSearch()
    },[])
    
    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <LocationArea>
                    <LocationInput 
                        placeholder="Digite o nome do barbeiro"
                        placeholderTextColor="#FFFFFF"
                        value={searchText}
                        onChangeText={setSearchText}
                        onEndEditing={handleBarberSearch}
                    />
                </LocationArea>

                <BarbersList>
                    { 
                        list.map((item, key)=>{
                            return <BarberItem data={item} key={key} />
                        })
                    }
                </BarbersList>

                { loading && <LoadingIcon size="large" color="#FFFFFF" /> }

                <BackButton onPress={handleBackButton}>
                    <BackIcon width="44" height="44" fill="#FFFFFF" />
                </BackButton>
            </Scroller>
        </Container>
    )
}