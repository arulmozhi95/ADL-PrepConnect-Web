import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";

function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!/^[a-zA-Z0-9]+@psgtech\.ac\.in$/.test(email)) {
      setError("Invalid email domain");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });

      if (response.status === 200) {
        const user = { email }; // You can add more user data if available
        localStorage.setItem("user", JSON.stringify(user)); // Store user data in localStorage
        setUser(user); // Update the user state in App.js (for conditional rendering)
        alert("Login successful");
        navigate("/"); // Redirect to home after login
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      <style>
        {`
          .login-container {
            width: 100%;
            max-width: 400px;
            margin: auto;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            background-image: url('./image.jpg');  /* Add background image */
            
          }

          .login-header {
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
          body{}

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

          .login-button {
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

          .login-button:hover {
            background-color: #45a049;
          }

          .signup-link {
            text-align: center;
            margin-top: 20px;
          }

          .signup-link a {
            text-decoration: none;
            color: #007bff;
            font-weight: 600;
          }

          .signup-link a:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="login-container">
        <h2 className="login-header">Log In</h2>
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

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/signup">Create account</Link>
        </p>
      </div>
    </>
  );
}

export default LoginPage;
