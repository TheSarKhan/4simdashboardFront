import plusIcon from "../../assets/icons/plus.svg";
import { useEffect, useState } from "react";
import RoleCard from "../../components/RoleCard";
import { Cross, X } from "lucide-react";

export default function Roles() {
  const [isRoleManagementModalOpen, setIsRoleManagementModalOpen] =
    useState(false);
  const [isUserRoleRemovalModalOpen, setIsUserRoleRemovalModalOpen] =
    useState(false);

  const [userRoleRemovalData, setUserRoleRemovalData] = useState<{
    id: number;
    fullname: string;
    role: string;
  }>();
  const [roleManagementData, setRoleManagementData] = useState<{
    id: number;
    title: string;
    users: { id: number; fullname: string; email: string }[];
  }>();

  const [roles, setRoles] = useState<
    {
      id: number;
      title: string;
      usersCount: number;
      permissions: string[];
    }[]
  >([]);

  function openRoleManagementModal(roleId: number) {
    const roleData = roles.find((role) => role.id === roleId);
    if (!roleData) return;

    const users = [
      { id: 1, fullname: "Rasim Mammadov", email: "mammadov@gmail.com" },
      { id: 2, fullname: "Aysel Huseynova", email: "huseynova@gmail.com" },
      { id: 3, fullname: "Elvin Aliyev", email: "aliyev@gmail.com" },
    ];

    setRoleManagementData({ ...roleData, users: users });
    setIsRoleManagementModalOpen(true);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setIsRoleManagementModalOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    setRoles([
      {
        id: 1,
        title: "Finance",
        usersCount: 5,
        permissions: ["Read", "Write", "Execute"],
      },
      {
        id: 2,
        title: "Admin",
        usersCount: 10,
        permissions: ["Read", "Write"],
      },
      {
        id: 3,
        title: "Industry 4.0",
        usersCount: 10,
        permissions: ["Read", "Write"],
      },
    ]);
  }, []);

  return (
    <>
      {isUserRoleRemovalModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          onClick={() => setIsUserRoleRemovalModalOpen(false)}
        >
          <div
            style={{ boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.25)" }}
            className="bg-white rounded-lg flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-[#eee] border-b max-w-120 p-4">
              <h2 className="text-center font-medium text-lg p-6">
                {userRoleRemovalData?.fullname} adlı istifadəçinin rolunu "
                {userRoleRemovalData?.role}" kateqoriyasından çıxarmaq
                istədiyinizə əminsiniz?
              </h2>
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  className="px-10 py-3 rounded-lg font-semibold text-[#2421D4] hover:cursor-pointer hover:bg-[#eee]"
                  onClick={() => setIsUserRoleRemovalModalOpen(false)}
                >
                  Ləğv et
                </button>
                <button
                  className="px-10 py-3 rounded-lg font-semibold bg-linear-to-br from-[#2421D6] to-[#221FC9] text-white hover:cursor-pointer hover:brightness-90"
                  onClick={() => {
                    setIsUserRoleRemovalModalOpen(false);
                  }}
                >
                  Təsdiqlə
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isRoleManagementModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          onClick={() => setIsRoleManagementModalOpen(false)}
        >
          <div
            style={{ boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.25)" }}
            className="bg-white rounded-lg flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-150">
              <div className="p-4 border-b border-[#E5E7EB]">
                <span>{roleManagementData?.title} - İstifadəçilər</span>
              </div>
              <div className="flex justify-center items-center py-4">
                <input
                  type="text"
                  placeholder="İstifadəçi axtar..."
                  className="w-[90%] border border-[#E5E5E5] rounded-lg p-2 outline-0"
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-6 py-6">
                {roleManagementData?.users.map((user) => {
                  return (
                    <div className="flex justify-between items-center w-full px-8 gap-4">
                      <div className="flex gap-2">
                        <div className="flex items-center justify-center rounded-full aspect-square bg-[#221FCA] h-10">
                          <span className="text-white font-semibold">
                            {user.fullname
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <span className="block">{user.fullname}</span>
                          <span className="block text-[#757575] text-sm">
                            {user.email}
                          </span>
                        </div>
                      </div>

                      <div
                        onClick={() => {
                          setUserRoleRemovalData({
                            id: user.id,
                            fullname: user.fullname,
                            role: roleManagementData.title,
                          });
                          setIsRoleManagementModalOpen(false);
                          setIsUserRoleRemovalModalOpen(true);
                        }}
                        className="border border-[#E64646] bg-[#FEE2E2] text-center rounded-lg aspect-square w-8 flex justify-center items-center hover:cursor-pointer"
                      >
                        <X className="text-[#DC2727] w-[50%]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`relative flex flex-col w-full gap-16 transition-all ${
          isRoleManagementModalOpen || isUserRoleRemovalModalOpen
            ? "blur-sm"
            : ""
        }`}
      >
        <div className="w-full flex flex-col justify-center shadowed-box">
          <h1 className="font-bold text-3xl">Rollar</h1>
          <span className="text-lg mt-2">
            Rol idarəetməsi funksional rollara uyğun səlahiyyətləri dəqiq
            şəkildə təyin etməyə imkan verir.
          </span>
        </div>

        <div className="shadowed-box">
          <div className="flex justify-between items-center gap-4">
            <h1 className="font-bold text-3xl w-[85%]">Rollar </h1>
          </div>

          <div className="flex mt-8 gap-4">
            <input
              type="text"
              placeholder="Rol axtar..."
              className="w-[85%] border border-[#E5E5E5] rounded-xl px-2 outline-0"
            />
            <button
              //   onClick={() => setIsRoleManagementModalOpen(true)}
              className="w-[15%] text-white flex justify-center h-14 rounded-xl items-center bg-linear-to-br from-[#2421DB] to-[#211EC5] hover:cursor-pointer"
            >
              <img src={plusIcon} alt="plus" className="pr-8" />
              Yeni rol əlavə et
            </button>
          </div>

          <div className="mt-12 flex gap-6 flex-wrap">
            {roles.map((role) => {
              return (
                <RoleCard
                  key={role.id}
                  id={role.id}
                  title={role.title}
                  usersCount={role.usersCount}
                  permissions={role.permissions}
                  openModal={() => {
                    openRoleManagementModal(role.id);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
