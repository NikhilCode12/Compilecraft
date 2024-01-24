import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import LoginForm from "../../pages/auth/LoginForm";

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const loginHandler = () => {
    // alert("Login button clicked");
    setShowLoginForm(!showLoginForm);
    onLoginClick();
  };

  const registerHandler = () => {
    // alert("Register button clicked");
    setShowRegisterForm(!showRegisterForm);
    onRegisterClick();
  };

  const buttons = [
    { text: "Login", handler: loginHandler },
    { text: "Register", handler: registerHandler },
  ];

  return (
    <div className="navbar-container py-4 px-6 flex justify-between">
      {/* Logo */}
      <div className="logo-container flex gap-2">
        <img
          className="logo-img"
          src={logo}
          width={48}
          height={48}
          alt="logo"
        />
        <a
          href="/"
          className="logo-text text-[white] text-[20px] my-auto font-[montserrat] font-semibold"
        >
          Compilecraft
        </a>
      </div>
      {/* Authentication */}
      <div className="flex gap-4 my-auto">
        {/* Login & Register*/}
        {buttons.map((item) => (
          <button
            key={item.id}
            onClick={item.handler}
            className="btn text-white font-medium rounded-full border-[1px] border-teal-400 px-6 py-2
            hover:border-teal-500 active:border-teal-900 hover:translate-y-1 hover:transition-all hover:ease-in"
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
