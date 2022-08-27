import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #4EADBE;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    z-index: 9;
    top: 10px;
    left: 10px;
`;

export const Logout = styled.TouchableOpacity`
    position: absolute;
    z-index: 9;
    top: 10px;
    right: 10px;
    background-color: #FFFFFF;
    width: 44px;
    height: 44px;
    border-radius: 22px;
`;

export const LogoutText = styled.Text`
    flex: 1;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: #000000;
    font-size: 18px;
    margin-top: 8px;
`;

export const Title = styled.Text`
    width: 100%;
    padding-top: 21px;
    padding-left: 60px;
    color: #FFFFFF;
    font-size: 18px;
    font-weight: bold;
`;

export const ProfilePic = styled.Image`
    width: 300px;
    height: 300px;
    border-radius: 50px;
`;

export const ContainerPic = styled.View`
    width: 100%;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
`;

export const UserInfo = styled.View`
    background-color: #FFFFFF;
    border-radius: 20px;
    margin: 20px;
    padding: 20px;

`;
export const UserName = styled.View`
    flex-direction: row;
    margin-top: 10px;
`;
export const Name = styled.Text`
    color: #000000;
    font-size: 18px;
    margin-left: 10px;
`;
export const UserPhone = styled.View`
    flex-direction: row;
    margin-top: 10px;
`;
export const Phone = styled.Text`
    color: #000000;
    font-size: 18px;
    margin-left: 10px;
`;
export const UserEmail = styled.View`
    flex-direction: row;
    margin-top: 10px;
`;
export const Email = styled.Text`
    color: #000000;
    font-size: 18px;
    margin-left: 10px;
`;

export const Button = styled.TouchableOpacity`
    height: 45px;
    background-color: #FFFFFF;
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 20px;
`;

export const Text = styled.Text`
    color: #000000;
    font-size: 18px;
    text-align: center;
    justify-content: center;
    vertical-align: center;
    padding-top: 10px;
`;