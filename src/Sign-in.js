import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailed } from "./redux/actions/auth.actions";
import { Link } from "react-router-dom";
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
  const { error } = useSelector((state) => state.auth);  // Récupère les erreurs d'auth

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(loginSuccess(data.body.token));  // Dispatch l'action de succès avec le token
      } else {
        dispatch(loginFailed(data.message));  // Dispatch l'action d'échec avec le message d'erreur
      }
    } catch (error) {
      dispatch(loginFailed("Network error"));  // En cas d'erreur réseau
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

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">Copyright 2020 Argent Bank</p>
    </footer>
  );
};

const SignIn = () => {
  return (
    <>
      <Nav />
      <SignInForm />
      <Footer />
    </>
  );
};

export default SignIn;
