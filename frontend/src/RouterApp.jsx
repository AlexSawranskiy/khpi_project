import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Authentication/Authentication";
import Settings from "./pages/Settings/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import Languages from "./pages/Languages/Languages";
import Profile from "./pages/Profile/Profile";
import ForgetPassword from "./pages/Forget Password/ForgetPassword";
import ResetPasswordConfirm from "./pages/Forget Password/ResetPasswordConfirm";
import Lessons from './pages/Lessons/Lessons';
import Exercise from './pages/Exercise/Exercise';
import Achievements from './pages/Achievements/Achievements';
import Rating from './pages/Rating/Rating';

function RouterApp() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPasswordConfirm />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/settings" element={<Settings />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/lessons/:courseId" element={<Lessons />} />
        <Route path="/:lessonId/exercises" element={<Exercise />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/rating" element={<Rating />} />
      </Route>
    </Routes>
  );
}

export default RouterApp;
