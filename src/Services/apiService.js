import axios from "axios";
import { baseUrl } from "../Constants";

// const API_BASE_URL = "https://localhost:7231/api/";

// Authentication endpoints (AccountController)
const AUTH_API_URL = `${baseUrl}/api/account/`;

export const register = async (
  userName,
  email,
  password,
  MobileNumber,
  confirmpassword,
  rememberMe = true
) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}register`, {
      userName,
      email,
      password,
      MobileNumber,
      confirmpassword,
      rememberMe,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error", error);
    throw error;
  }
};

export const login = async (userEmail, password, rememberMe = true) => {
  try {
    // console.log(userEmail)
    // console.log(password)
    // console.log(rememberMe)
    const response = await axios.post(`${AUTH_API_URL}login`, {
      userEmail,
      password,
      rememberMe,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await axios.post(
      `${AUTH_API_URL}logout`,
      {},
      { headers: getAuthHeaders() }
    );
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout error", error);
    throw error;
  }
};

// Application Data endpoints (AppController)
const APP_API_URL = `${baseUrl}/api/app/`;

// Utility function to get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getDoctorById = async (id) => {
  try {
    const response = await axios.get(`${APP_API_URL}doctor/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor", error);
    throw error;
  }
};

export const getAllDoctors = async () => {
  try {
    const response = await axios.get(`${APP_API_URL}all-doctors`, {
      headers: getAuthHeaders(),
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching all doctors", error);
    throw error;
  }
};

export const upsertDoctor = async (doctorData) => {
  try {
    // Log FormData entries
    for (let [key, value] of doctorData.entries()) {
      console.log(key, value);
    }

    const response = await axios.post(
      `${APP_API_URL}UpsertDoctorsDetails`,
      doctorData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...getAuthHeaders(), // Include the token in the headers
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error upserting doctor", error);
    throw error;
  }
};

export const deleteDoctor = async (id) => {
  try {
    const response = await axios.post(
      `${APP_API_URL}DeleteDoctor/${id}`,
      null,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting doctor", error);
    throw error;
  }
};

//Hospital

export const getHospitalById = async (id) => {
  try {
    const response = await axios.get(`${APP_API_URL}hospital/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching hospital", error);
    throw error;
  }
};

export const getAllHospitals = async () => {
  try {
    const response = await axios.get(`${APP_API_URL}all-hospitals`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all hospitals", error);
    throw error;
  }
};

export const upserthospital = async (hospitalData) => {
  try {
    // Log FormData entries for debugging
    for (let [key, value] of hospitalData.entries()) {
      console.log(key, value);
    }

    const response = await axios.post(
      `${APP_API_URL}UpsertHospitalDetails`,
      hospitalData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...getAuthHeaders(), // Include the token in the headers if needed
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error upserting hospital", error);
    throw error;
  }
};

export const deleteHospital = async (id) => {
  try {
    const response = await axios.post(
      `${APP_API_URL}DeleteHospital/${id}`,
      null,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting doctor", error);
    throw error;
  }
};

//Procedure

export const getProcedureById = async (id) => {
  try {
    const response = await axios.get(`${APP_API_URL}procedure/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching procedure", error);
    throw error;
  }
};

export const getAllProcedures = async () => {
  try {
    const response = await axios.get(`${APP_API_URL}all-procedures`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all procedures", error);
    throw error;
  }
};

export const upsertProcedure = async (procedureData) => {
  try {
    // Log FormData entries for debugging
    for (let [key, value] of procedureData.entries()) {
      console.log(key, value);
    }

    const response = await axios.post(
      `${APP_API_URL}UpsertProceduresDetails`,
      procedureData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...getAuthHeaders(), // Include the token in the headers if needed
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error upserting procedure", error);
    throw error;
  }
};

export const deleteProcedure = async (id) => {
  try {
    const response = await axios.post(
      `${APP_API_URL}DeleteProcedure/${id}`,
      null,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting Procedure", error);
    throw error;
  }
};
