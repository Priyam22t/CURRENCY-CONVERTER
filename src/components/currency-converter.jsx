import React, { useEffect, useState } from "react";
import CurrencyDropdown from "./dropdown.jsx";
import "./converter.css";

export default function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://api.frankfurter.app/currencies")
      .then(res => res.json())
      .then(data => setCurrencies(Object.keys(data)));
  }, []);

  const convert = async () => {
    if (!amount) return;
    setLoading(true);

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    );
    const data = await res.json();
    setResult(`${amount} ${from} = ${data.rates[to]} ${to}`);
    setLoading(false);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="card">
      <div className="header">
        <h1>💱 Currency Converter</h1>
        <button className="swap-btn" onClick={swap}>🔄</button>
      </div>

      <div className="row">
        <CurrencyDropdown label="From" value={from} setValue={setFrom} currencies={currencies} />
        <CurrencyDropdown label="To" value={to} setValue={setTo} currencies={currencies} />
      </div>

      <input
        className="amount"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <button className="convert-btn" onClick={convert}>
        {loading ? "Converting..." : "Convert"}
      </button>

      {result && <p className="result">{result}</p>}
    </div>
  );
}
