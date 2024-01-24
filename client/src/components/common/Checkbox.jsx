import React from "react";

const Checkbox = ({ labelText }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={labelText}
        name={labelText}
        className="custom-checkbox"
      />
      <label htmlFor={labelText} className="cursor-pointer">
        {labelText}
      </label>
    </div>
  );
};

export default Checkbox;
