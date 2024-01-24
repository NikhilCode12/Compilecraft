import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const Input = ({ labelText, value, onChange, inputPlaceholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex flex-col mb-4">
      {" "}
      <div className="mb-2 flex gap-1">
        <FontAwesomeIcon
          icon={labelText === "Password" ? faLock : faEnvelope}
          size="xs"
          color="rgba(93,66,121,1)"
          className="my-auto"
        />
        <label htmlFor={labelText} className="text-[14px] font-semibold ">
          {labelText}
        </label>
      </div>
      <div className="relative">
        <input
          id={labelText}
          type={
            labelText === "Password"
              ? !showPassword
                ? "password"
                : "text"
              : "email"
          }
          name={labelText}
          placeholder={inputPlaceholder}
          onChange={onChange}
          value={value}
          maxLength={labelText === "Password" && "32"}
          required
          className="w-80 p-2 rounded-md text-[14px] bg-slate-300 focus:outline-none focus:ring ring-indigo-500 font-semibold placeholder:font-normal"
        />
        {labelText === "Password" ? (
          <button
            onClick={handleTogglePassword}
            type="button"
            className="absolute right-2 bottom-0 top-0"
          >
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              size="sm"
              color="slategray"
            />
          </button>
        ) : undefined}
      </div>
    </div>
  );
};

export default Input;
