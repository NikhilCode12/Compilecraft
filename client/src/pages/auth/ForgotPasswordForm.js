import React, { useState } from "react";
import Input from "../../components/common/Input";
import StyledButton from "../../components/common/StyledButton";
import axios from "axios";
import { motion } from "framer-motion";

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorAnimationKey, setErrorAnimationKey] = useState(0);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post("http://localhost:5000/auth/forgot-password", { email })
        .then((res) => {
          if (res.data.Status === "Success") {
            onBackToLogin();
          } else {
            alert("wrong otp");
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error during forgot password:", error);
    }
  };

  return (
    <div className="flex flex-col w-[45%]">
      <div className={`${showSuccess ? "mt-4 mb-1" : "my-6"} text-center`}>
        <h1 className="text-3xl font-bold mb-1">Forgot Password?</h1>
        <p className="text-[13px] font-medium text-gray-700">
          Enter your email to reset your password.
        </p>
      </div>
      <form
        className="flex flex-col items-center mx-auto"
        onSubmit={handleForgotPassword}
        autoComplete="off"
      >
        {showSuccess ? (
          <motion.div
            key={errorAnimationKey}
            initial={{ opacity: 0.5 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.5 },
            }}
            className="w-full my-3 bg-slate-300 px-3 py-1 rounded-md"
          >
            <p className="text-green-700 font-medium text-[13px] text-center">
              Check your email for password reset instructions.
            </p>
          </motion.div>
        ) : (
          <div>
            <Input
              labelText={"Email"}
              inputPlaceholder={"Enter your email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <StyledButton
              buttonText={"Reset Password"}
              buttonType={"submit"}
              className={
                "bg-black text-white mt-6 hover:bg-gray-900 active:bg-black transition-all duration-300 ease-in-out transform"
              }
            />
          </div>
        )}
        <StyledButton
          buttonText={"Back to Login"}
          onClick={onBackToLogin}
          className={
            "border border-slate-500 mt-2 hover:bg-gray-300 active:bg-[whitesmoke] transition-all duration-300 ease-in-out"
          }
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
