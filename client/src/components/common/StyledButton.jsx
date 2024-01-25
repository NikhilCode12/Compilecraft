import React from "react";

const StyledButton = ({
  uri = "email",
  buttonText,
  buttonType,
  className,
  onClick,
}) => {
  return (
    <button
      type={buttonType}
      className={`flex gap-1 w-full p-2 rounded-lg justify-center text-[14px] ${className}`}
      onClick={onClick}
    >
      {uri !== "email" ? (
        <img
          src={uri}
          alt="btn_img"
          width={18}
          height={18}
          className="my-auto"
          loading="lazy"
        />
      ) : undefined}
      <p>{buttonText}</p>
    </button>
  );
};

export default StyledButton;
