// src/BusinessLogin.js
import React, { useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";

const BusinessLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [businessNameError, setBusinessNameError] = useState("");
  const navigate = useNavigate();
  // Regular expression for email format validation

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    if(token != null){
      navigate("/");
    }

  }, [])
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Regular expression for password validation (at least 8 characters, at least one special character)
  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const validateForm = () => {
    let isValid = true;

    // Email validation
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long and include a special character.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Business name validation
    if (businessName.trim() === "") {
      setBusinessNameError("Business name is required.");
      isValid = false;
    } else {
      setBusinessNameError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await fetch("https://nviri-assignment-3.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bussinessName: businessName,
          email,
          password, 
        }),
      });
  
      const data = await response.json();
      if(data.message === 'User login successfully!'){
        localStorage.setItem("token", data.token);
        navigate('/');
      }
    }
  };

  return (
    <div className="login-cont">
      <form onSubmit={handleSubmit} className="login-form">
      <h2>Business Login (Technician Login)</h2>
        <div>
          <label>Business Name:</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
          {businessNameError && <span className="error">{businessNameError}</span>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <span className="error">{emailError}</span>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <span className="error">{passwordError}</span>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default BusinessLogin;
