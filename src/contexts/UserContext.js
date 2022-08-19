/**
 * Com o Context API eu consigo saber se o usuário está logado
 * em qualquer parte da minha aplicação, em qualquer tela, por exemplo
 * 
 * Duas opções sobre isso:
 * 1 - Context API do próprio React
 * 2 - Reducer
 */

/**
 * useReducer -> é similar ao useState, mas ao invés de mudar o estado de uma variável,
 * ele muda o estado das informações do usuário
 */
import React, { createContext, useReducer } from 'react';

/**
 * initialState -> Dados iniciais do usuário
 * UserReducer -> Nós iremos criar
 */
import { initialState, UserReducer } from "../reduces/UserReducer"

/**
 * Função para criar contexto de informações do usuário
 */
export const UserContext = createContext();

/**
 * Provider -> Proverá (gerenciará) as informações
 * Children -> São as telas que estarão dentro (englobadas) desse contexto
 */
export default ({ children }) => {
    /**
     * o useReducer necessia de 2 parâmetros:
     * 1 - UserReducer: muda o estado das informações do usuário
     * 2 - initialState: informa quais são as informações iniciais do usuário
     */
    const [state, dispatch] = useReducer(UserReducer, initialState);
    
    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}