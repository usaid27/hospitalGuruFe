// src/Pages/Admin/Users.js
import React, { useState } from "react";
import "../../Styles/Profile.css";
import { baseUrl } from "../../Constants";
import axios from "axios";
import toast from "react-hot-toast"; // Use toast notifications

function Users() {
  const [activeTab, setActiveTab] = useState("general");
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userName, setuserName] = useState("");
  const [Email, setEmail] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [Rpassword, setRPassword] = useState("");
  const [NewConfirmPassword, setNewConfirmPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");

  const handleTabChange = (tab) => setActiveTab(tab);

  const handlechangeSubmit = async (e) => {
    e.preventDefault();

    // Password Validation: Ensure newPassword and confirmPassword match
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    const submitData = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/api/Account/ChangePassword`,
        submitData
      );
      console.log(response);
      if (response.status == 200) {
        toast.success("Password changed successfully!");
      }

      // Clear form after successful submission
      setcurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
      console.error(error);
    }
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    // Password Validation: Ensure newPassword and confirmPassword match
    if (
      !userName ||
      !Email ||
      !MobileNumber ||
      !Rpassword ||
      !NewConfirmPassword
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (Rpassword !== NewConfirmPassword) {
      toast.error("password and confirm password do not match.");
      return;
    }

    const submitData = {
      userName: userName,
      email: Email,
      mobileNo: MobileNumber,
      password: Rpassword,
      passwordConfirm: NewConfirmPassword,
      isActive: true,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/api/Account/register`,
        submitData
      );
      console.log(response);
      if (response.status == 200) {
        toast.success("User Register successfully!");
      }

      // Clear form after successful submission
      setcurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="sidebar bg-light">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "general" ? "active" : ""}`}
              href="#"
              onClick={() => handleTabChange("general")}
            >
              General
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "password" ? "active" : ""}`}
              href="#"
              onClick={() => handleTabChange("password")}
            >
              Change Password
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "AddUser" ? "active" : ""}`}
              href="#"
              onClick={() => handleTabChange("AddUser")}
            >
              Add User
            </a>
          </li>
        </ul>
      </div>

      {/* Content Section */}
      <div className="content-container">
        {/* Cover Image */}
        <div className="cover-image-container">
          <img
            src={require("../../Assets/Hospital.jpg")}
            alt="Cover"
            className="cover-image"
          />
          <div className="profile-picture">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="img-fluid"
            />
          </div>
        </div>

        {/* Render based on activeTab */}
        {activeTab === "general" ? (
          <div className="user-info bg-white p-4 shadow-sm">
            <h5>Name: John Doe</h5>
            <p>Email: John.Doe@credentialinfotech.com</p>
            <p>Hospital: Hospital Guru</p>
          </div>
        ) : activeTab === "password" ? (
          <div className="change-password bg-white p-4 shadow-sm">
            <h5 className="text-center mt-2">Change Password</h5>
            <form onSubmit={handlechangeSubmit}>
              <div className="mb-3">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setcurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">
                  Save Changes
                </button>
                <button
                  type="reset"
                  className="btn btn-secondary"
                  onClick={() => {
                    setcurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="change-password bg-white p-4 shadow-sm">
            <h5 className="text-center mt-2">Add User</h5>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-3">
                <label className="form-label">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your User Name"
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your Email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mobile No</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter your Mobile Number"
                  value={MobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={Rpassword}
                  onChange={(e) => setRPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="Password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={NewConfirmPassword}
                  onChange={(e) => setNewConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">
                  Register User
                </button>
                <button
                  type="reset"
                  className="btn btn-secondary"
                  onClick={() => {
                    setuserName("");
                    setEmail("");
                    setMobileNumber("");
                    setRPassword("");
                    setNewConfirmPassword("");
                  }}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
