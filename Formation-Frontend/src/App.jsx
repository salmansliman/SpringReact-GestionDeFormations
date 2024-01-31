import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import { AuthProvider } from "./Components/Login/context/AuthProvider";
import Landing from "./Components/Landing/Landing";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEntreprise from "./Components/AddEntreprise/AddEntreprise";
import DashboardHome from "./Components/Dashboard/DashboardHome";
import AddFormation from "./Components/AddFormation/AddFormation";
import Register from "./Components/Register/Register";
import { CoursesProvider } from "./context/courses_context";
import { SidebarProvider } from "./context/sidebar_context";
import Planification from "./Components/PlanifierFormation/Planification";
import SingleCourse from "./Components/Landing/SingleCoursePage";
import Students from "./Components/Students/Students";
import Accepted from "./Components/Students/Accepted";
import Feedback from "./Components/Feedback/Feedback";

function App() {
  return (
    <>
          <ToastContainer />
    <AuthProvider>
      <SidebarProvider>
        <CoursesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path = "courses/:idFormation" element = {<SingleCourse />} />
              <Route path="dashboard" element={<Dashboard />}>
                <Route path="" element={<DashboardHome />} />
                <Route path="entreprise" element={<AddEntreprise />} />
                <Route path="formations" element={<AddFormation />} />
                <Route path="Planification" element={<Planification/> } />
                <Route path="Students" element={<Students/> } />
                <Route path="Accepted" element={<Accepted/> } />
              </Route>
            </Routes>
          </BrowserRouter>
        </CoursesProvider>
      </SidebarProvider>
    </AuthProvider>
    </>
  );
}

export default App;
