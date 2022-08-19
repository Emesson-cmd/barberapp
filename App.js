import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import UserContextProvider from './src/contexts/UserContext'
import MainStack from './src/stacks/MainStack';

export default () => {
  return (
    /**
     * Estou englobando toda a aplicação dentro de UserContextProvider.
     * Isso significa que toda a aplicação vai ter as informações que eu 
     * definir dentro do "provedor de contexto". Todo o aplicativo vai ter
     * acesso à informações do usuário.
     * 
     * O NavigationContainer  é necessário pois ele vai gerenciar toda a navegação
     * das telas
     */
    <UserContextProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </UserContextProvider>
  );
}