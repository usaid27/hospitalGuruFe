import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../Constants";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //   const [adminAccount, setadminAccount] = useState();

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const Details = {
        email: email,
        newpassword: newpassword,
        confirmpassword: confirmpassword,
      };
      const response = await axios.post(
        `${baseUrl}/api/Account/resetPassword`,
        Details
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  //   const handelRegistration = () => {
  //     navigate("/register");
  //   };
//   const handellogin = () => {
//     navigate("/login");
//   };

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
        <h5 className="text-center mb-4">Forget Password</h5>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <form onSubmit={handleResetPassword}>
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
              htmlFor="newpassword"
              className="form-label"
              style={{ width: "100%", color: "white", marginLeft: "2%" }}
            >
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="newpassword"
              placeholder="New Password"
              value={newpassword}
              onChange={(e) => setnewPassword(e.target.value)}
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
              placeholder="confirm Password"
              value={confirmpassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              required
            />
          </div>
          {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexCheckDefault"
                  style={{ width: "100%", color: "white", margin: "2%" }}
                >
                  Remember me
                </label>
              </div>
              <div>
                <p
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={handleForgetPassword}
                >
                  Forget Password?
                </p>
              </div>
            </div> */}
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
                "Change Password"
              )}
            </button>
          </div>
          {/* <div>
              <p
                style={{ color: "white", cursor: "pointer" }}
                onClick={handellogin}
              >
                Sign In?
              </p>
            </div> */}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
