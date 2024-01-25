import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { motion } from "framer-motion";

const Navbar = ({ onLoginClick, onRegisterClick, showMessage }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const loginHandler = () => {
    setShowLoginForm(!showLoginForm);
    onLoginClick();
  };

  const registerHandler = () => {
    setShowRegisterForm(!showRegisterForm);
    onRegisterClick();
  };

  const buttons = [
    { text: "Login", handler: loginHandler },
    { text: "Register", handler: registerHandler },
  ];

  useEffect(() => {
    // Show the message every time showMessage becomes true
    setIsMessageVisible(showMessage);

    // If showMessage is true, set a timeout to hide the message after 5 seconds
    if (showMessage) {
      const timeoutId = setTimeout(() => {
        setIsMessageVisible(false);
      }, 5000);

      // Clean up the timeout when the component unmounts or when showMessage changes
      return () => clearTimeout(timeoutId);
    }
  }, [showMessage]);

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
      {isMessageVisible && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
          className="w-auto my-auto bg-slate-300 px-3 py-1 rounded-md"
        >
          <p className="text-green-700 font-medium text-[13px] text-center">
            You need to login/register, to get access!
          </p>
        </motion.div>
      )}
      {/* Authentication */}
      <div className="flex gap-4 my-auto">
        {/* Login & Register*/}
        {buttons.map((item) => (
          <button
            key={item.id}
            onClick={item.handler}
            className="btn text-white font-medium rounded-full border-[1px] border-teal-300 px-6 py-2
            hover:bg-teal-200  hover:border-slate-500 active:border-slate-900 active:bg-teal-500
             hover:text-[#0b0019] hover:-translate-y-1 hover:transition-all hover:ease-in-out"
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
