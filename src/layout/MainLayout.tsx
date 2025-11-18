import NavLinkButton from "../components/NavLinkButton";
import logo from "../assets/layout/logo.png";
import statisticsIcon from "../assets/layout/statistics.svg";
import dashboardIcon from "../assets/layout/dashboard.svg";
import usersIcon from "../assets/layout/users.svg";
import rolesIcon from "../assets/layout/roles.svg";
import profileIcon from "../assets/layout/profile.svg";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex bg-[#f5f7fa] h-screen w-screen">
      <aside className="flex flex-col items-center w-[15vw] bg-white">
        <img className="w-[60%]" src={logo} alt="logo" />
        <nav>
          <ul className="flex flex-col gap-2 bg-white w-[15vw] px-4 pt-4">
            <li>
              <NavLinkButton src={statisticsIcon} to="statistics">
                Statistika
              </NavLinkButton>
            </li>
            <li>
              <NavLinkButton src={dashboardIcon} to="dashboard">
                Dashboard
              </NavLinkButton>
            </li>
            <li>
              <NavLinkButton src={usersIcon} to="users">
                İstifadəçilər
              </NavLinkButton>
            </li>
            <li>
              <NavLinkButton src={rolesIcon} to="roles">
                Rollar
              </NavLinkButton>
            </li>
            <li>
              <NavLinkButton src={profileIcon} to="profile">
                Profil
              </NavLinkButton>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="w-[85vw] p-8">
        <Outlet />
      </main>
    </div>
  );
}
