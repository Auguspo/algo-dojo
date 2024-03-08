import React from "react";

const Input = ({ label, value, onChange }) => {
  return (
    <div>
      <label for={label}>{label}</label>
      <input id={label} type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
