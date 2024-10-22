import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginSuccess, logout } from "./redux/actions/auth.actions";
import logo from "./img/argentBankLogo.png";
import chatIcon from "./img/icon-chat.png";
import moneyIcon from "./img/icon-money.png";
import securityIcon from "./img/icon-security.png";

const Nav = () => {
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.auth.isConnected);  // Vérifie l'état de connexion
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');  // Supprime le token du localStorage
    dispatch(logout());  // Réinitialise l'état de connexion dans Redux
    navigate('/sign-in');
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isConnected ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i> Tony
            </Link>
            <button onClick={handleLogout} className="main-nav-item">
              <i className="fa fa-sign-out"></i> Sign Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="hero">
      <section className="hero-content">
        <h2 className="sr-only">Promoted Content</h2>
        <p className="subtitle">No fees.</p>
        <p className="subtitle">No minimum deposit.</p>
        <p className="subtitle">High interest rates.</p>
        <p className="text">Open a savings account with Argent Bank today!</p>
      </section>
    </div>
  );
};

const Features = () => {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      <div className="feature-item">
        <img src={chatIcon} alt="Chat Icon" className="feature-icon" />
        <h3 className="feature-item-title">You are our #1 priority</h3>
        <p>
          Need to talk to a representative? You can get in touch through our
          24/7 chat or through a phone call in less than 5 minutes.
        </p>
      </div>
      <div className="feature-item">
        <img src={moneyIcon} alt="Money Icon" className="feature-icon" />
        <h3 className="feature-item-title">More savings means higher rates</h3>
        <p>
          The more you save with us, the higher your interest rate will be!
        </p>
      </div>
      <div className="feature-item">
        <img src={securityIcon} alt="Security Icon" className="feature-icon" />
        <h3 className="feature-item-title">Security you can trust</h3>
        <p>
          We use top of the line encryption to make sure your data and money
          is always safe.
        </p>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">Copyright 2020 Argent Bank</p>
    </footer>
  );
};

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch(loginSuccess(token));  // Restaure l'état de connexion à partir du localStorage
    }
  }, [dispatch]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </>
  );
};

export default Home;
