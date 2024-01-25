import React from "react";

const Checkbox = ({ labelText, checked, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={labelText}
        name={labelText}
        className="custom-checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={labelText} className="cursor-pointer">
        {labelText}
      </label>
    </div>
  );
};

export default Checkbox;
