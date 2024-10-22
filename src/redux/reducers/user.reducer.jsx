import { GET_USERPROFILE, EDIT_USERNAME, LOGOUT } from "../actions/type.actions";

const initialState = {
  status: 'VOID',
  userData: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERPROFILE:
      return {
        ...state,
        status: 'SUCCEEDED',
        userData: action.payload,  // Charge le profil utilisateur dans le store
      };
    case EDIT_USERNAME:
      return {
        ...state,
        status: "MODIFIED",
        userData: {
          ...state.userData,
          ...action.payload,
        },
      };
    case LOGOUT:
      return initialState;  // Réinitialise l'état lors de la déconnexion
    default:
      return state;
  }
};