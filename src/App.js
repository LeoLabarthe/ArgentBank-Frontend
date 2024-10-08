import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Sign-in";
import User from "./User"; 
import Home from "./Home";
import './css/main.css'; 


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {}
        <Route path="/sign-in" element={<SignIn />} /> {}
        <Route path="/user" element={<User />} /> {}
      </Routes>
    </Router>
  );
};

export default App;
