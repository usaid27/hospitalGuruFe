import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/User/Home';
import Legal from './Pages/User/Legal';
import About from './Pages/User/About';
import Doctors from './Pages/User/Doctors';
import Hospitals from './Pages/User/Hospitals';
import Reviews from './Pages/User/Reviews';
import NotFound from './Pages/NotFound';
import Appointment from './Pages/Appointment';
import LoginPage from './Pages/Auth/LoginPage';
import AdminLayout from './Pages/AdminLayout';
import Dashboard from './Pages/Admin/Dashboard';
import MedicalProcedure from './Pages/User/MedicalProcedure';
import DoctorsConfig from './Pages/Admin/Doctor/Doctors';
import HospitalsConfig from './Pages/Admin/Hospital/Hospitals';
import ProceduresConfig from './Pages/Admin/Procedure/ProceduresConfig';
import AddDoctor from './Pages/Admin/Doctor/AddDoctor';
import EditDoctorPage from './Pages/Admin/Doctor/EditDoctorPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './Components/PrivateRoute';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer

function App() {
  return (
    <Router basename="/HospitalGuru">
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/MedicalProcedure" element={<MedicalProcedure />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<PrivateRoute element={AdminLayout} />}>
            <Route path="dashboard" element={<PrivateRoute element={Dashboard} />} />
            <Route path="doctors" element={<PrivateRoute element={DoctorsConfig} />} />
            <Route path="doctors/add-doctor" element={<PrivateRoute element={AddDoctor} />} />
            <Route path="doctors/edit-doctor/:id" element={<EditDoctorPage />} />
            <Route path="hospitals" element={<PrivateRoute element={HospitalsConfig} />} />
            <Route path="procedures" element={<PrivateRoute element={ProceduresConfig} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer /> {/* Add ToastContainer here */}
      </div>
    </Router>
  );
}

export default App;
