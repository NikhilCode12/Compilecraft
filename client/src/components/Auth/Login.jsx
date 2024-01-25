import React, { useEffect, useState } from "react";
import googlelogo from "../../assets/google.png";
import Input from "../../components/common/Input";
import Checkbox from "../../components/common/Checkbox";
import StyledButton from "../../components/common/StyledButton";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = ({ onRegisterClicked, onForgotClicked }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberMe] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [errorAnimationKey, setErrorAnimationKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const rememberPreference = localStorage.getItem("rememberMe");
    if (rememberPreference) {
      setRememberMe(true);

      const storedEmail = localStorage.getItem("email");
      if (storedEmail) setEmail(storedEmail);
    }
  }, []);

  const handleForgotPassword = () => {
    setShowForgotPasswordForm(true);
    onForgotClicked();
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberme);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      if (response.data.msg === "Invalid login credentials!") {
        // console.log(response.data);
        setShowError(true);
        setErrorMessage("Invalid login credentials, try again!");
        setErrorAnimationKey((prevKey) => prevKey + 1);
      } else if (response.data.msg === "User does not exist") {
        setShowError(true);
        setErrorMessage("Account not found. Please Register!");
        setErrorAnimationKey((prevKey) => prevKey + 1);
      } else if (response.status === 200) {
        // Store the token in localStorage
        localStorage.setItem("token", response.data.token);

        // Store the "Remember Me" preference in localStorage
        if (rememberme) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("email", email);
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("email");
        }

        // Redirect to the authorized route after showing Message
        navigate("/authorized");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="flex flex-col w-[45%]">
      <div className={`${showError ? "mt-4 mb-1" : "my-6"} text-center`}>
        <h1 className="text-3xl font-bold mb-1">Welcome back!</h1>
        <p className="text-[13px] font-medium text-gray-700">
          Enter your email and password to access your account
        </p>
      </div>
      <form
        className="flex flex-col items-center mx-auto"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {showError && (
          <motion.div
            key={errorAnimationKey}
            initial={{ opacity: 0.5, x: 0 }}
            animate={{
              opacity: 1,
              x: [0, -10, 10, -10, 10, 0],
              transition: { duration: 0.5 },
            }}
            transition={{ duration: 0.5 }}
            className="w-full my-3 bg-slate-300 px-3 py-1 rounded-md"
          >
            <p className="text-red-700 font-medium text-[13px] text-center">
              {showError ? errorMessage : undefined}
            </p>
          </motion.div>
        )}
        <Input
          labelText={"Email"}
          inputPlaceholder={"Enter your email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          labelText={"Password"}
          inputPlaceholder={"Enter your password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between w-full text-[12px] font-medium text-gray-700 -mt-1">
          {/* Checkbox for remember me */}
          <Checkbox
            labelText={"Remember me"}
            checked={rememberme}
            onChange={handleRememberMe}
          />
          {/* Forgot Password */}
          <a
            className="cursor-pointer hover:text-gray-800 active:text-gray-600"
            onClick={handleForgotPassword}
          >
            Forgot Password
          </a>
        </div>
        <StyledButton
          buttonText={"Login with Email"}
          buttonType={"submit"}
          className={
            "bg-black text-white mt-6 hover:bg-gray-900 active:bg-black transition-all duration-300 ease-in-out transform"
          }
        />
        <StyledButton
          buttonText={"Sign In with Google"}
          uri={googlelogo}
          className={
            "border border-gray-400 bg-[whitesmoke] mt-2 hover:bg-gray-300 active:bg-[whitesmoke] transition-all duration-300 ease-in-out"
          }
        />
      </form>
    </div>
  );
};

export default Login;
