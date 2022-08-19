import { ActionSheetIOS } from "react-native";

/**
 * Informações do usuário. Ex.: Quando o usuário estiver logado na aplicação,
 * aparecerá uma foto dele como ícone 
 * - Avatar do usuário
 * - Favoritos do usuário
 * - Atendimentos do usuário
 */
export const initialState = {
    avatar: '',
    favorites: [],
    appointments: []
};

/**
 * Grade de ações que serão performadas com as informações do usuário
 * 
 * state -> se refere à todos os itens de initialState
 * action -> se refere ao que fazer com esses itens (trocar seus valores)
 */
export const UserReducer = (state, action) => {
    switch(action.type){
        case 'setAvatar':
            /** Troca o valor de avatar */
            return { ...state, avatar: action.payload.avatar };
            break;
        default:
            return state;
    }
}
