import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import SetNewPassword from "./pages/auth/SetNewPassword";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/update-password" element={<SetNewPassword />} />
      <Route element={<MainLayout />}>
        <Route path="/statistics" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Dashboard />} />
        <Route path="/roles" element={<Dashboard />} />
        <Route path="/profile" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
