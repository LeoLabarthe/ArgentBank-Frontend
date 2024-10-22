import { GET_USERPROFILE, EDIT_USERNAME } from "./type.actions";

export const userProfile = (userData) => {
  return {
    type: GET_USERPROFILE,
    payload: userData,
  };
};

export const updateUsername = (userData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),  // Envoie les nouvelles informations
      });

      const data = await response.json();
      if (response.ok) {
        dispatch({
          type: EDIT_USERNAME,
          payload: userData,  // Met à jour les informations utilisateur dans le store Redux
        });
      } else {
        console.error('Failed to update user data:', data.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
};