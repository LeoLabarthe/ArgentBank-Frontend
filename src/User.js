import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUsername } from "./redux/actions/user.actions";
import logo from "./img/argentBankLogo.png";

const Nav = () => {
  const username = useSelector((state) => state.user.userData.username);  // Récupère le nom d'utilisateur depuis Redux

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        <a className="main-nav-item" href="/user">
          <i className="fa fa-user-circle"></i>
          {username ? username : "Tony"}
        </a>
        <a className="main-nav-item" href="/">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </a>
      </div>
    </nav>
  );
};

const UserAccount = ({ title, amount, description }) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
};

const UserProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);  // Récupère les informations utilisateur depuis Redux

  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(userData.username || "Tony");
  const [firstName, setFirstName] = useState(userData.firstName || "");
  const [lastName, setLastName] = useState(userData.lastName || "");

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateUsername({ username: newUsername, firstName, lastName }));
    setEditMode(false);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{userData.firstName} {userData.lastName}!</h1>
        {editMode ? (
          <form onSubmit={handleSave} className="edit-username-form">
            <div className="input-wrapper">
              <label htmlFor="username">User name:</label>
              <input 
                type="text" 
                id="username" 
                value={newUsername} 
                onChange={(e) => setNewUsername(e.target.value)} 
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="firstName">First name:</label>
              <input 
                type="text" 
                id="firstName" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last name:</label>
              <input 
                type="text" 
                id="lastName" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
              />
            </div>
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="cancel-button" onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        ) : (
          <button className="edit-button" onClick={() => setEditMode(true)}>Edit Name</button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <UserAccount
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <UserAccount
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <UserAccount
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
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

const User = () => {
  const navigate = useNavigate();
  const isConnected = useSelector((state) => state.auth.isConnected);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token || !isConnected) {
      navigate("/sign-in");
    }
  }, [isConnected, navigate]);

  return (
    <>
      <Nav />
      <UserProfile />
      <Footer />
    </>
  );
};

export default User;