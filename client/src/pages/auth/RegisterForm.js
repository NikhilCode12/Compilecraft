import React, { useState, useEffect } from "react";
import loginimage from "../../assets/logoimge.jpg";
import googlelogo from "../../assets/google.png";
import Input from "../../components/common/Input";
import Checkbox from "../../components/common/Checkbox";
import StyledButton from "../../components/common/StyledButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const RegisterForm = ({ onLoginClicked, onLoginFormShow }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberMe] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const rememberPreference = localStorage.getItem("rememberMe");
    if (rememberPreference) {
      setRememberMe(true);

      const storedEmail = localStorage.getItem("email");
      if (storedEmail) setEmail(storedEmail);
    }
  }, []);

  const handleRememberMe = () => {
    setRememberMe(!rememberme);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        email,
        password,
      });

      if (response.status === 201) {
        setShowSuccessMessage(true);

        // Store the "Remember Me" preference in localStorage
        if (rememberme) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("email", email);
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("email");
        }

        // Hide success message after 1 second
        setTimeout(() => {
          setShowSuccessMessage(false);
          onLoginFormShow(); // Go back to the login form
        }, 1000);
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error during Register:", error);
    }
  };

  useEffect(() => {
    // Cleanup the success message state when the component unmounts
    return () => {
      setShowSuccessMessage(false);
    };
  }, []);

  return (
    <>
      <img
        src={loginimage}
        alt="cppcraftregister"
        className="rounded-3xl w-[55%] h-[68%] -mr-4 object-cover "
      />
      <div className="flex flex-col w-[45%]">
        <div
          className={`${showSuccessMessage ? "mt-4 mb-1" : "my-6"} text-center`}
        >
          <h1 className="text-3xl font-bold mb-1">Onboarding, Nice!</h1>
          <p className="text-[13px] font-medium text-gray-700">
            Enter your email and password to create an account
          </p>
        </div>
        <form
          className="flex flex-col items-center mx-auto"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {showSuccessMessage && (
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.5 },
              }}
              className="w-full my-3 bg-slate-300 px-3 py-1 rounded-md"
            >
              <p className="text-green-700 font-medium text-[13px] text-center">
                Registered successfully, now just one step more!
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
            inputPlaceholder={"Create your password"}
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
          </div>
          <StyledButton
            buttonText={"Register with Email"}
            buttonType={"submit"}
            className={
              "bg-black text-white mt-6 hover:bg-gray-900 active:bg-black transition-all duration-300 ease-in-out transform"
            }
          />
          <StyledButton
            buttonText={"Sign Up with Google"}
            uri={googlelogo}
            className={
              "border border-gray-400 bg-[whitesmoke] mt-2 hover:bg-gray-300 active:bg-[whitesmoke] transition-all duration-300 ease-in-out"
            }
          />
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
