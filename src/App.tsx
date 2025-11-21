import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import SetNewPassword from "./pages/auth/SetNewPassword";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Roles from "./pages/admin/Roles";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/update-password" element={<SetNewPassword />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="statistics" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="roles" element={<Roles />} />
        <Route path="profile" element={<Dashboard />} />
      </Route>

      <Route path="/user">
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
