import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #63C2D1;
`;

export const LocationArea = styled.View`
    background-color: #4EADBE;
    height: 40px;
    border-radius: 30px;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 13px;
    margin-left: 50px;
    margin-right: 13px;
`;

export const LocationInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #FFFFFF;
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