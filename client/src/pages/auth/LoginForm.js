import React, { useState } from "react";
import loginimage from "../../assets/logoimge.jpg";
import Login from "../../components/Auth/Login";
import ForgotPasswordForm from "../auth/ForgotPasswordForm";

const LoginForm = ({ onRegisterClicked, onForgotClicked }) => {
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  return (
    <>
      <img
        src={loginimage}
        alt="cppcraftlogin"
        className="rounded-3xl w-[55%] h-[68%] -mr-4 object-cover"
        loading="lazy"
      />
      {showForgotPasswordForm ? (
        <ForgotPasswordForm
          onBackToLogin={() => setShowForgotPasswordForm(false)}
        />
      ) : (
        <Login
          onRegisterClicked={onRegisterClicked}
          onForgotClicked={() => {
            setShowForgotPasswordForm(true);
          }}
        />
      )}
    </>
  );
};

export default LoginForm;
