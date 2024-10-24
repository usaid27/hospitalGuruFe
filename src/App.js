import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from "./Pages/User/Home";
import Legal from "./Pages/User/Legal";
import About from "./Pages/User/About";
import Doctors from "./Pages/User/Doctors";
import Hospitals from "./Pages/User/Hospitals";
import Reviews from "./Pages/User/Reviews";
import NotFound from "./Pages/NotFound";
import Appointment from "./Pages/Appointment";
import LoginPage from "./Pages/Auth/LoginPage";
import AdminLayout from "./Pages/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import MedicalProcedure from "./Pages/User/MedicalProcedure";
import DoctorsConfig from "./Pages/Admin/Doctor/Doctors";
import HospitalsConfig from "./Pages/Admin/Hospital/Hospitals";
// import ProceduresConfig from './Pages/Admin/Procedure/ProceduresConfig';
import Procedures from "./Pages/Admin/Procedure/Procedures";
import AddDoctor from "./Pages/Admin/Doctor/AddDoctor";
import AddHospitals from "./Pages/Admin/Hospital/AddHospitals";
import AddProcedure from "./Pages/Admin/Procedure/AddProcedure";
import EditDoctorPage from "./Pages/Admin/Doctor/EditDoctorPage";
import EditHospitalPage from "./Pages/Admin/Hospital/EditHospitalPage";
import EditProcedurePage from "./Pages/Admin/Procedure/EditProcedurePage";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./Components/PrivateRoute";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import Users from "./Pages/Admin/Users";
import Registration from "./Pages/Auth/Registration";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";

const App = () => {
  // return (
  // HospitalGuru
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <Registration />,
    },
    {
      path: "/ForgetPassword",
      element: <ForgetPassword />,
    },
    {
      path: "/resetPassword",
      element: <ResetPassword />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/doctors",
      element: <Doctors />,
    },
    {
      path: "/hospitals",
      element: <Hospitals />,
    },
    {
      path: "/MedicalProcedure",
      element: <MedicalProcedure />,
    },
    {
      path: "/reviews",
      element: <Reviews />,
    },
    {
      path: "/legal",
      element: <Legal />,
    },
    {
      path: "/appointment",
      element: <Appointment />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/admin",
      element: (
        <PrivateRoute>
          <AdminLayout />
        </PrivateRoute>
      ),
      children: [
        {
          path: "/admin",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: "doctors",
          element: (
            <PrivateRoute>
              <DoctorsConfig />
            </PrivateRoute>
          ),
        },
        {
          path: "doctors/add-doctor",
          element: (
            <PrivateRoute>
              <AddDoctor />
            </PrivateRoute>
          ),
        },
        {
          path: "doctors/edit-doctor/:id",
          element: (
            <PrivateRoute>
              <EditDoctorPage />
            </PrivateRoute>
          ),
        },
        {
          path: "hospitals",
          element: (
            <PrivateRoute>
              <HospitalsConfig />
            </PrivateRoute>
          ),
        },
        {
          path: "hospitals/add-hospital",
          element: (
            <PrivateRoute>
              <AddHospitals />
            </PrivateRoute>
          ),
        },
        {
          path: "hospitals/edit-hospital/:id",
          element: (
            <PrivateRoute>
              <EditHospitalPage />
            </PrivateRoute>
          ),
        },
        {
          path: "procedures",
          element: (
            <PrivateRoute>
              <Procedures />
            </PrivateRoute>
          ),
        },
        {
          path: "procedures/add-procedure",
          element: (
            <PrivateRoute>
              <AddProcedure />
            </PrivateRoute>
          ),
        },
        {
          path: "procedures/edit-procedure/:id",
          element: (
            <PrivateRoute>
              <EditProcedurePage />
            </PrivateRoute>
          ),
        },
        {
          path: "Profile",
          element: (
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  // <Router basename="/HospitalGuru">
  //   <div className="App">
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/about" element={<About />} />
  //       <Route path="/doctors" element={<Doctors />} />
  //       <Route path="/hospitals" element={<Hospitals />} />
  //       <Route path="/MedicalProcedure" element={<MedicalProcedure />} />
  //       <Route path="/reviews" element={<Reviews />} />
  //       <Route path="/legal" element={<Legal />} />
  //       <Route path="/appointment" element={<Appointment />} />
  //       <Route path="/login" element={<LoginPage />} />
  //       <Route path="/register" element={<Registration />} />
  //       <Route path="/admin" element={<PrivateRoute element={AdminLayout} />}>
  //         <Route path="dashboard" element={<PrivateRoute element={Dashboard} />} />
  //         <Route path="doctors" element={<PrivateRoute element={DoctorsConfig} />} />
  //         <Route path="doctors/add-doctor" element={<PrivateRoute element={AddDoctor} />} />
  //         <Route path="hospitals/add-hospital" element={<PrivateRoute element={AddHospitals} />} />
  //         <Route path="procedures/add-procedure" element={<PrivateRoute element={AddProcedure} />} />
  //         <Route path="doctors/edit-doctor/:id" element={<EditDoctorPage />} />
  //         <Route path="hospitals/edit-hospital/:id" element={<EditHospitalPage />} />
  //         <Route path="procedures/edit-procedure/:id" element={<EditProcedurePage />} />
  //         <Route path="hospitals" element={<PrivateRoute element={HospitalsConfig} />} />
  //         <Route path="procedures" element={<PrivateRoute element={Procedures} />} />
  //         <Route path="Profile" element={<PrivateRoute element={Users} />} />
  //       </Route>
  //       <Route path="*" element={<NotFound />} />
  //     </Routes>
  //     <ToastContainer /> {/* Add ToastContainer here */}
  //   </div>
  // </Router>
  // );
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
