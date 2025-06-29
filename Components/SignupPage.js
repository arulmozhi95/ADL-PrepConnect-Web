import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!/^[a-zA-Z0-9]+@psgtech\.ac\.in$/.test(email)) {
      setError("Invalid email domain");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
        email,
        password,
      });

      if (response.status === 201) {
        alert("Signup successful");
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <>
      <style>
        {`
          .signup-container {
            width: 100%;
            max-width: 400px;
            margin: auto;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
            font-family: Arial, sans-serif;
          }

          .signup-header {
            text-align: center;
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: 600;
            color: #333;
          }

          .error-message {
            color: red;
            text-align: center;
            font-size: 14px;
            margin-bottom: 15px;
          }

          .input-container {
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 10px;
            background-color: #f9f9f9;
          }

          .input-container input {
            flex: 1;
            border: none;
            outline: none;
            padding: 8px;
            font-size: 14px;
            background-color: transparent;
          }

          .input-container i {
            margin-right: 10px;
            color: #506275;
          }

          .signup-button {
            width: 100%;
            padding: 12px;
            background-color: #4caf50;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: background-color 0.3s ease;
          }

          .signup-button:hover {
            background-color: #45a049;
          }
        `}
      </style>

      <div className="signup-container">
        <h2 className="signup-header">Sign Up</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="input-container">
          <FaEnvelope />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-container">
          <FaLock />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-container">
          <FaLock />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="signup-button" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </>
  );
}

export default SignupPage;
