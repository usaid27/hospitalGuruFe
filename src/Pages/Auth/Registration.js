import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../Services/apiService";
import { useAuth } from "../../contexts/AuthContext";

const Registration = () => {
  const [userName, setuseName] = useState("");
  const [email, setEmail] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login: setLoginStatus } = useAuth(); // Import the login function
  const navigate = useNavigate();
  
  

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await register(
        userName,
        email,
        password,
        MobileNumber,
        confirmpassword
      );
      console.log("Logged in:", data);
      setLoginStatus(); // Set authentication status
      navigate("/admin/dashboard"); // Redirect to admin after successful login
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage(
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handelLogin = () =>{
    navigate("/login")
  }
  return (
    <div
      className="Container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={require("../../Assets/pxfuel.jpg")}
        style={{ width: "100vw", height: "100vh" }}
      />
      <div
        className="card p-4"
        style={{
          width: "35%",
          //   height: "50%",
          position: "absolute",
          backgroundColor: "#0B4F70",
          color: "#eef1f6",
          opacity: "0.8",
        }}
      >
        <img
          src={require("../../Assets/Hospital Guru Logo.png")}
          alt="logo"
          style={{ width: "15%", alignSelf: "center" }}
        />
        <p style={{ alignSelf: "center", color: "white", fontWeight: "bold" }}>
          Hospital Guru
        </p>
        <h5 className="text-center mb-4">Sign up</h5>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="form-label"
              style={{ width: "100%", color: "white", marginLeft: "2%" }}
            >
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter user Name"
              value={userName}
              onChange={(e) => setuseName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label"
              style={{ width: "100%", color: "white", marginLeft: "2%" }}
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="Mobileno"
              className="form-label"
              style={{ width: "100%", color: "white", marginLeft: "2%" }}
            >
              Mobile Number
            </label>
            <input
              type="number"
              className="form-control"
              id="Mobileno"
              placeholder="Enter Mobile Number"
              value={MobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
              style={{ width: "100%", color: "white", marginLeft: "2%" }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="confirmpassword"
              className="form-label"
              style={{ width: "100%", color: "white", marginLeft: "2%" }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmpassword"
              placeholder="Confirm password"
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "white", cursor: "pointer" }}onClick={handelLogin}>
                Sign In?
              </p>
            </div>
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
