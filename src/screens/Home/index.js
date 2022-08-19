import React, { useState, useEffect } from 'react'
import { Alert, Platform, RefreshControl } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { request, PERMISSIONS } from "react-native-permissions"
import Geolocation from '@react-native-community/geolocation'

import Api from '../../Api'

import { 
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder,

    LoadingIcon,
    ListArea
} from './styles'

import BarberItem from "../../components/BarberItem"

import SearchIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'
import { forceTouchGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/ForceTouchGestureHandler'

/**
 * Refresh controll: puxa para baixo e atualiza conteúdo
 */
export default () => {
    const navigation = useNavigation()

    const [locationText, setLocationText] = useState("");
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const handleLocationFinder = async () => {
        setCoords(null);

        /**
         * O request serve para que seja pedido ao usuário para ele conceder
         * alguma permissão do sistema
         */
        let result = await request(
            Platform.OS === "ios" 
                ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        /** Se usuário deu permissão */
        if(result == "granted"){
            setLoading(true)
            setList([])

            /** 
             * Essa biblioteca pega a localização do usuário 
             * O parâmetro info contém muitas informações sobre a localização
             * do usuário. 
            */
            Geolocation.getCurrentPosition((info) => {
                setCoords(info.coords);
                getBarbers();
            });
        }

    }

    const getBarbers = async () => {
        setLoading(true)
        setList([])

        let lat = null;
        let lng = null;

        if(coords) {
            lat = coords.latitude
            lng = coords.longitude
        }
 
        /** Res vai conter todas as informações de barbeiro de uma cidade */
        let res = await Api.getBarbers(lat, lng, locationText);

        if(res.error == ""){
            if(res.loc){
                setLocationText(res.loc)
            }
            
            /** 
             * Esse data é um dado que vem na resposta da requisição 
             * data contem a lista de barbeiros
             * */
            setList(res.data)

        } else {
            Alert.alert("Erro", res.error)
        }

        setLoading(false)
    }

    const onRefresh = () => {
        setRefreshing(false)
        getBarbers();
    }

    const handleLocationSearch = () => {
        setCoords({})
        getBarbers();
    }
    
    useEffect(()=>{
        getBarbers();
    }, [])
    
    /**
     * refreshControll: prop que controle o refresh ao puxar a tela para baixo
     * RefreshControl: componente que representa o refresh
     * refreshing: se true, o refresh aparecerá
     * onRefresh: quando "soltado" executa uma ação
     */
    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={()=>navigation.navigate("Search")}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF" />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput 
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={setLocationText}
                        onEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
                    </LocationFinder>
                </LocationArea>

                { loading && <LoadingIcon size="large" color="#FFFFFF" /> }

                <ListArea>
                    {
                        list.map((item, key)=>{
                            return <BarberItem key={key} data={item} />
                        })
                    }
                </ListArea>
            </Scroller>
        </Container>
    )
}