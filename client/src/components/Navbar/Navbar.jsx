import React from "react";
import logo from "../../assets/logo.png";
import "./Navbar.css";

const loginHandler = () => {
  alert("Login button clicked");
};
const registerHandler = () => {
  alert("Register button clicked");
};

const links = [
  { text: "Home", uri: "/" },
  { text: "Portfolio", uri: "/" },
  { text: "About", uri: "/" },
  { text: "Contact", uri: "/" },
];

const buttons = [
  { text: "Login", handler: loginHandler },
  { text: "Register", handler: registerHandler },
];

const Navbar = () => {
  return (
    <div className="navbar-container m-4 flex justify-between">
      {/* Logo */}
      <div className="logo-container flex gap-2">
        <img className="logo-img" src={logo} width={64} height={64}></img>
        <a
          href="/"
          className="logo-text text-[white] text-[20px] my-auto font-[montserrat] font-semibold"
        >
          Compilecraft
        </a>
      </div>
      {/* Links */}
      <ul className="flex gap-2">
        {links.map((link) => {
          return (
            <a
              key={link.id}
              href={link.uri}
              className="text-md text-gray-300 font-[500] pointer my-auto mx-6 hover:text-gray-100 active:text-gray-500"
            >
              {link.text}
            </a>
          );
        })}
      </ul>
      {/* Authentication */}
      <div className="flex gap-6 my-auto">
        {/* Login & Register*/}
        {buttons.map((item) => (
          <button
            key={item.id}
            onClick={item.handler}
            className="btn text-white font-medium rounded-full border-[1px] border-pink-400 px-6 py-2
            hover:border-pink-500 active:border-pink-900 hover:translate-y-1 hover:transition-all hover:ease-in"
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
