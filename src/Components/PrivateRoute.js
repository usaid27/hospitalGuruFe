// src/Components/PrivateRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
import Cookies from "js-cookie";
import { baseUrl } from "../Constants";
import axios from "axios";
import Loading from "../Pages/Loading";

const PrivateRoute = ({ children }) => {
  let token = Cookies.get("authToken");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getvalidtoken = async () => {
      if (token) {
        try {
          const response = await axios.get(`${baseUrl}/api/Account/MyInfo`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);

          const email = response?.data?.email;

          if (email) {
            setIsAuthenticated(true);
            // console.log("Token is valid:", token);
          } else {
            console.log("Invalid token");
            Cookies.remove("authToken");
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          Cookies.remove("authToken");
        }
      } else {
        console.log("Token not found");
      }
      setLoading(false);
    };

    getvalidtoken();
  }, [token]);
  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
  //   const { isAuthenticated } = useAuth();

  //   return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
