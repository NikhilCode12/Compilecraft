import React, { useState } from "react";
import loginimage from "../../assets/logoimge.jpg";
import googlelogo from "../../assets/google.png";
import Input from "../../components/common/Input";
import Checkbox from "../../components/common/Checkbox";
import StyledButton from "../../components/common/StyledButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onRegisterClicked }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleRegisterButtonClicked = () => {
    setShowRegisterForm(true);
    onRegisterClicked();
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        email,
        password,
      });

      if (response.status === 201) {
        alert("User logged in successfully!");
        navigate("/authorized");
      } else {
        alert("Login Failed, check your credentials!");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <img
        src={loginimage}
        alt="cppcraftlogin"
        className="rounded-3xl w-[55%] h-[68%] -mr-4 object-cover "
      />
      <div className="flex flex-col w-[45%]">
        <div className="text-center my-8">
          <h1 className="text-3xl font-bold mb-1">Welcome back!</h1>
          <p className="text-[13px] font-medium text-gray-700">
            Enter your email and password to access your account
          </p>
        </div>
        <div className="flex flex-col items-center mx-auto">
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
            <Checkbox labelText={"Remember me"} />
            {/* Forgot Password */}
            <a
              className="cursor-pointer hover:text-gray-800 active:text-gray-600"
              href="/"
            >
              Forgot Password
            </a>
          </div>
          <StyledButton
            buttonText={"Login with Email"}
            onClick={handleSubmit}
            className={
              "bg-black text-white mt-8 hover:bg-gray-900 active:bg-black transition-all duration-300 ease-in-out transform"
            }
          />
          <StyledButton
            buttonText={"Sign In with Google"}
            uri={googlelogo}
            buttonType={"submit"}
            className={
              "border border-gray-400 bg-[whitesmoke] mt-3 hover:bg-gray-300 active:bg-[whitesmoke] transition-all duration-300 ease-in-out"
            }
          />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
