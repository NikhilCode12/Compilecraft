import React, { useState } from "react";
import loginimage from "../../assets/logoimge.jpg";
import googlelogo from "../../assets/google.png";
import Input from "../../components/common/Input";
import Checkbox from "../../components/common/Checkbox";
import StyledButton from "../../components/common/StyledButton";

const handleSubmit = () => {
  alert("Form Submitted");
};

const LoginForm = ({ onRegisterClicked }) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleRegisterButtonClicked = () => {
    setShowRegisterForm(true);
    onRegisterClicked();
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mx-auto"
        >
          <Input labelText={"Email"} inputPlaceholder={"Enter your email"} />
          <Input
            labelText={"Password"}
            inputPlaceholder={"Enter your password"}
          />
          <div className="flex justify-between w-full text-[12px] font-medium text-gray-700 -mt-1">
            {/* Checkbox for remember me */}
            <Checkbox labelText={"Remember me"} />
            {/* Forgot Password */}
            <a className="cursor-pointer hover:text-gray-800 active:text-gray-600">
              Forgot Password
            </a>
          </div>
          <StyledButton
            buttonText={"Login with Email"}
            buttonType={"submit"}
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
        </form>
      </div>
    </>
  );
};

export default LoginForm;
