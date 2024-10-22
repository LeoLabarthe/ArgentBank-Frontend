import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailed } from "./redux/actions/auth.actions";
import { Link, useNavigate } from "react-router-dom";
import logo from "./img/argentBankLogo.png";

const Nav = () => {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link className="main-nav-item" to="/sign-in">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
    </nav>
  );
};

const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
  
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });
  
      const data = await response.json();
      console.log('API response:', data);
  
      if (response.ok) {
        const token = data.body.token;
        dispatch(loginSuccess(token));  // Dispatch du succès avec le token
  
        // Sauvegarde du token dans localStorage pour la persistance
        localStorage.setItem('authToken', token);
  
        // Redirection vers la page utilisateur après connexion réussie
        navigate('/user');
      } else {
        dispatch(loginFailed(data.message));  // Dispatch en cas d'échec
      }
    } catch (error) {
      dispatch(loginFailed("Network error"));
    }
  };
  

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
          {error && <p className="error">{error}</p>}  {}
        </form>
      </section>
    </main>
  );
};

const SignIn = () => {
  return (
    <>
      <Nav />  {}
      <SignInForm />  {}
    </>
  );
};

export default SignIn;
