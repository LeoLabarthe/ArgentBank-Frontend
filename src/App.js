import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/actions/auth.actions";  // Import de l'action loginSuccess
import SignIn from "./Sign-in";
import User from "./User"; 
import Home from "./Home";

const App = () => {
  const dispatch = useDispatch();

  // Vérification du localStorage au démarrage de l'application
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch(loginSuccess(token));  // Restaure l'état de connexion si le token est présent
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Page d'accueil */}
        <Route path="/sign-in" element={<SignIn />} />  {/* Page de connexion */}
        <Route path="/user" element={<User />} />  {/* Page utilisateur après connexion */}
      </Routes>
    </Router>
  );
};

export default App;
