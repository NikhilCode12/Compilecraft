import React, { useState } from "react";
import loginimage from "../../assets/logoimge.jpg";
import googlelogo from "../../assets/google.png";
import Input from "../../components/common/Input";
import Checkbox from "../../components/common/Checkbox";
import StyledButton from "../../components/common/StyledButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = ({ onLoginClicked }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const handleLoginButtonClicked = () => {
    setShowLoginForm(true);
    onLoginClicked();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        email,
        password,
      });

      if (response.status === 201) {
        alert("User created successfully successfully!");
        navigate("/authorized");
      }
    } catch (error) {
      console.error("Error during Register:", error);
    }
  };

  return (
    <>
      <img
        src={loginimage}
        alt="cppcraftregister"
        className="rounded-3xl w-[55%] h-[68%] -mr-4 object-cover "
      />
      <div className="flex flex-col w-[45%]">
        <div className="text-center my-8">
          <h1 className="text-3xl font-bold mb-1">Onboarding, Nice!</h1>
          <p className="text-[13px] font-medium text-gray-700">
            Enter your email and password to create an account
          </p>
        </div>
        <form
          className="flex flex-col items-center mx-auto"
          onSubmit={handleSubmit}
        >
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
            <Checkbox labelText={"Remember me"} />
          </div>
          <StyledButton
            buttonText={"Register with Email"}
            buttonType={"submit"}
            className={
              "bg-black text-white mt-8 hover:bg-gray-900 active:bg-black transition-all duration-300 ease-in-out transform"
            }
          />
          <StyledButton
            buttonText={"Sign Up with Google"}
            uri={googlelogo}
            className={
              "border border-gray-400 bg-[whitesmoke] mt-3 hover:bg-gray-300 active:bg-[whitesmoke] transition-all duration-300 ease-in-out"
            }
          />
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
