import React from "react";

export default function CurrencyDropdown({ label, value, setValue, currencies }) {
  return (
    <div className="dropdown">
      <label>{label}</label>
      <select value={value} onChange={(e) => setValue(e.target.value)}>
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
    </div>
  );
}
