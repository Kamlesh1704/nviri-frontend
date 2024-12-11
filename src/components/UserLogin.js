// src/UserLogin.js
import React, { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import '../css/Login.css'

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    if(token != null){
      navigate("/");
    }

  }, [])

  const validateForm = () => {
    let isValid = true;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long and include a special character.");
      isValid = false;
    } else {
      setPasswordError("");
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
          bussinessName: null,
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
      <h2>User Login</h2>
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

export default UserLogin;
