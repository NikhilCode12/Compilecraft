import React from "react";
import demologo from "../../assets/demologo.jpg";
import { motion } from "framer-motion";

const Footer = ({ height, showLoginForm, time, ymove }) => {
  return (
    <>
      {!showLoginForm ? (
        <div className="fixed -bottom-[300px] w-full">
          <motion.img
            src={demologo}
            alt="compilecraft-demo"
            className="rounded-lg mx-auto shadow-[0_0_20px_4px_rgba(93,66,121,0.7)]"
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
            transition={{ duration: time, ease: "easeInOut" }}
          />
        </div>
      ) : (
        <motion.div
          className="rounded-lg mx-auto shadow-[0_0_20px_4px_rgba(93,66,121,0.7)] bg-gray-200"
          style={{
            width: "80%",
            height: height,
          }}
          initial={{ opacity: 0, y: ymove }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: time, ease: "easeInOut" }}
        ></motion.div>
      )}
    </>
  );
};

export default Footer;
