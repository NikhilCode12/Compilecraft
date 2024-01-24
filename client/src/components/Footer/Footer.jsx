import React, { useState } from "react";
import demologo from "../../assets/demologo.jpg";
import { motion } from "framer-motion";
import LoginForm from "../../pages/auth/LoginForm";
import RegisterForm from "../../pages/auth/RegisterForm";

const Footer = ({ height, showLoginForm, time, ymove }) => {
  const [showLoginFormInFooter, setShowLoginFormInFooter] =
    useState(showLoginForm);

  const handleToggleForm = () => {
    setShowLoginFormInFooter((prev) => !prev);
  };
  return (
    <>
      <div className="fixed -bottom-[300px] w-full">
        {showLoginForm ? (
          <motion.div
            className="rounded-3xl mx-auto shadow-[0_0_10px_2px_rgba(93,66,121,0.7)] bg-gray-400 flex gap-4 w-full p-1 h-screen"
            style={{
              width: "80%",
              height: `${height}`,
            }}
            initial={{ opacity: 0.5, y: "300px" }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{ y: `${ymove}` }}
            transition={{ duration: time, ease: "easeInOut" }}
          >
            {showLoginFormInFooter ? (
              <>
                <LoginForm />
                <div className="flex gap-1 fixed bottom-14 right-[20%] text-gray-700 text-[13px] font-medium ">
                  <p>Don't have an account?</p>
                  <a
                    className="font-bold hover:text-gray-800 active:text-gray-600 cursor-pointer"
                    onClick={handleToggleForm}
                  >
                    Register
                  </a>
                </div>
              </>
            ) : (
              <>
                <RegisterForm />
                <div className="flex gap-1 fixed bottom-14 right-[20%] text-gray-700 text-[13px] font-medium">
                  <p>Already have an account?</p>
                  <a
                    className="font-bold hover:text-gray-800 active:text-gray-600 cursor-pointer"
                    onClick={handleToggleForm}
                  >
                    Login
                  </a>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.img
            src={demologo}
            alt="compilecraft-demo"
            className="rounded-3xl mx-auto shadow-[0_0_20px_4px_rgba(93,66,121,0.7)]"
            style={{
              objectFit: "cover",
              width: "80%",
              height: height,
            }}
            initial={{ opacity: 0, y: ymove }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{ y: ymove }}
            transition={{ duration: time, ease: "easeInOut" }}
          />
        )}
      </div>
    </>
  );
};

export default Footer;
