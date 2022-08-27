import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
    background-color: #63C2D1;
    flex: 1;
`;

export const Title = styled.Text`
    color: #FFFFFF;
    font-size: 18px;
    margin: 10px;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;

export const AppointmentItem = styled.View`
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 15px;
    margin: 20px;
`;
export const AppointmentBarber = styled.View`
    flex-direction: row;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
`;
export const BarberAvatar = styled.Image`
    width: 64px;
    height: 64px;
    border-radius: 15px;
`;
export const BarberName = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-left: 20px;
    color: #000000;
`;
export const AppointmentService = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
export const ServiceName = styled.Text`
    color: #000000;
    font-size: 16px;
`;
export const ServicePrice = styled.Text`
    color: #000000;
    font-size: 16px;
`;
export const AppointmentInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
`;
export const AppointmentDate = styled.Text`
    color: #FFFFFF;
    font-size: 16px;
    font-weight: bold;
    background-color: #4EADBE;
    padding: 10px;
    border-radius: 13px;
`;
export const AppointmentTime = styled.Text`
    color: #FFFFFF;
    font-size: 16px;
    font-weight: bold;
    background-color: #4EADBE;
    padding: 10px;
    border-radius: 13px;
`;
