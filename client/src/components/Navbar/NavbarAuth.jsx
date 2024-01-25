import React from "react";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const links = [
  { text: "Home", uri: "/authorized" },
  { text: "Portfolio", uri: "/authorized" },
  { text: "About", uri: "/authorized" },
  { text: "Contact", uri: "/authorized" },
];

const NavbarAuth = () => {
  const navigate = useNavigate();
  const buttons = [
    { text: "Logout", handler: () => navigate("/") },
    {
      text: "Profile",
      handler: () => {
        alert("profile page not ready yet");
      },
    },
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
      {/* Links */}
      <div className="flex gap-2">
        {links.map((link) => {
          return (
            <a
              key={link.id}
              href={link.uri}
              className={
                "text-md text-gray-200 font-[500] pointer my-auto mx-6 hover:text-teal-100 active:text-teal-400"
              }
            >
              {link.text}
            </a>
          );
        })}
      </div>
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

export default NavbarAuth;
