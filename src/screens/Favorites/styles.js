import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #63C2D1;
`;

export const FavoriteArea = styled.View`
    height: 40px;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    margin-top: 13px;
    margin-left: 50px;
    margin-right: 13px;
`;


export const BarbersList = styled.View`
    margin-top: 20px;
    padding: 20px;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 9;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;

export const FavoriteText = styled.Text`
    color: #FFFFFF;
    font-size: 18px;
    font-weight: bold;
`;