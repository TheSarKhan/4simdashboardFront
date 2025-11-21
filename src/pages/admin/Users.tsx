import plusIcon from "../../assets/icons/plus.svg";
import eyeIcon from "../../assets/icons/dashboardEye.svg";
import penIcon from "../../assets/icons/pen.svg";
import binIcon from "../../assets/icons/bin.svg";
import downloadIcon from "../../assets/icons/download.svg";
import { useEffect, useState } from "react";
import CreateUserForm from "../../components/forms/CreateUserForm";

interface User {
  id: number;
  fullname: string;
  email: string;
  phoneNumber: string;
  roles: string[];
  active: boolean;
}

export default function Users() {
  const [isUserCreationModalOpen, setIsUserCreationModalOpen] = useState(false);
  const [isActivasionModalOpen, setIsActivasionModalOpen] = useState(false);

  const [activasionData, setActivasionData] = useState({
    id: 0,
    fullname: "",
    active: true,
  });
  const [users, setUsers] = useState<User[]>([]);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setIsUserCreationModalOpen(false);
      setIsActivasionModalOpen(false);
    }
  }

  function handleActivasion() {
    const updatedUsers = users.map((user) => {
      if (user.id === activasionData.id) {
        return { ...user, active: !user.active };
      }
      return user;
    });
    setUsers(updatedUsers);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    setUsers([
      {
        id: 1,
        fullname: "Əli Məmmədov",
        email: "ali.memmedov@4sim.az",
        phoneNumber: "+994123456789",
        roles: [],
        active: true,
      },
      {
        id: 2,
        fullname: "Əli Məmmədov",
        email: "ali.memmedov@4sim.az",
        phoneNumber: "+994123456789",
        roles: [],
        active: true,
      },
      {
        id: 3,
        fullname: "Əli Məmmədov",
        email: "ali.memmedov@4sim.az",
        phoneNumber: "+994123456789",
        roles: [],
        active: true,
      },
    ]);
  }, []);

  return (
    <>
      {isUserCreationModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          onClick={() => setIsUserCreationModalOpen(false)}
        >
          <div
            style={{ boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.25)" }}
            className="bg-white rounded-lg flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-[#eee] border-b">
              <h2 className="text-xl font-bold p-6">Yeni istifadəçi</h2>
            </div>
            <CreateUserForm setIsOpen={setIsUserCreationModalOpen} />
          </div>
        </div>
      )}

      {isActivasionModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          onClick={() => setIsActivasionModalOpen(false)}
        >
          <div
            style={{ boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.25)" }}
            className="bg-white rounded-lg flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col justify-center items-center text-center font-medium py-6 px-10 max-w-100">
              <p>
                {activasionData.fullname} adlı istifadəçinin profilini{" "}
                <b>{activasionData.active ? "deaktiv" : "aktiv"}</b> etmək
                istədiyinizə əminsiniz?
              </p>
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  className="px-10 py-3 rounded-lg font-semibold text-[#2421D4] hover:cursor-pointer hover:bg-[#eee]"
                  onClick={() => setIsActivasionModalOpen(false)}
                >
                  Ləğv et
                </button>
                <button
                  className="px-10 py-3 rounded-lg font-semibold bg-linear-to-br from-[#2421D6] to-[#221FC9] text-white hover:cursor-pointer hover:brightness-90"
                  onClick={() => {
                    handleActivasion();
                    setIsActivasionModalOpen(false);
                  }}
                >
                  Təsdiqlə
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`relative flex flex-col w-full gap-16 transition-all ${
          isUserCreationModalOpen || isActivasionModalOpen ? "blur-sm" : ""
        }`}
      >
        <div className="w-full flex flex-col justify-center shadowed-box">
          <h1 className="font-bold text-3xl">İstifadəçilər</h1>
          <span className="text-lg mt-2">
            Admin hər bir istifadəçi üçün giriş icazələrini, rolları və aktivlik
            tarixçəsini operativ şəkildə yeniləyə bilir.
          </span>
        </div>

        <div className="shadowed-box">
          <div className="flex justify-between items-center gap-4">
            <h1 className="font-bold text-3xl w-[85%]">İstifadəçi İdarəetməsi</h1>

            <button
              onClick={() => setIsUserCreationModalOpen(true)}
              className="w-[15%] text-[#1E40AF] flex justify-center gap-2 h-14 rounded-xl items-center bg-[#DBEAFE] hover:cursor-pointer"
            >
              <img src={downloadIcon} alt="download" />
              Məlumatları ixrac et
            </button>
          </div>

          <div className="flex mt-8 gap-4">
            <input
              type="text"
              placeholder="İstifadəçini axtar..."
              className="w-[85%] border border-[#E5E5E5] rounded-xl px-2 outline-0"
            />
            <button
              onClick={() => setIsUserCreationModalOpen(true)}
              className="w-[15%] text-white flex justify-center h-14 rounded-xl items-center bg-linear-to-br from-[#2421DB] to-[#211EC5] hover:cursor-pointer"
            >
              <img src={plusIcon} alt="plus" className="pr-8" />
              Yeni istifadəçi
            </button>
          </div>

          <div className="mt-12">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#ddd] text-[#666]">
                  <th className="pl-8 px-4 py-2 text-start">Ad Soyad</th>
                  <th className="pl-8 px-4 py-2 text-start">Email</th>
                  <th className="pl-8 px-4 py-2 text-start">Telefon</th>
                  <th className="px-4 py-2">Rol</th>
                  <th className="pl-4 py-2">Status</th>
                  <th className="pl-4 py-2 text-end">Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody>
                {users?.length === 0 ? (
                  <tr></tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={index} className="h-20">
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center rounded-full aspect-square bg-[#221FCA] h-10">
                            <span className="text-white font-semibold">
                              {user.fullname
                                .split(" ")
                                .map((word) => word[0])
                                .join("")}
                            </span>
                          </div>
                          <span>{user.fullname}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-[#666]">{user.email}</td>
                      <td className="px-4 py-2 text-[#666]">
                        {user.phoneNumber}
                      </td>
                      <td className="px-4 py-2 text-center text-[#666]">
                        <button className="bg-linear-to-br from-[#2421DC] to-[#201EC1] text-white px-5 py-3 font-bold rounded-lg hover:cursor-pointer">
                          Rollara bax
                        </button>
                      </td>
                      <td>
                        <div
                          className="w-full flex justify-around items-center"
                          onClick={() => {
                            setActivasionData({
                              id: user.id,
                              fullname: user.fullname,
                              active: user.active,
                            });
                            setIsActivasionModalOpen(true);
                          }}
                        >
                          <div
                            className={`w-10 h-6 p-1 rounded-full flex items-center ${
                              user.active
                                ? "bg-[#2563EB] justify-start"
                                : "bg-[#D2D5DA] justify-end"
                            }`}
                          >
                            <div className="bg-white aspect-square w-4 rounded-full"></div>
                          </div>
                          <span className="text-center w-14">
                            {user.active ? "Aktiv" : "Deaktiv"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-end">
                        <div className="flex justify-end items-center gap-6">
                          <button className="hover:cursor-pointer">
                            <img src={eyeIcon} alt="eye" />
                          </button>
                          <button className="hover:cursor-pointer">
                            <img src={penIcon} alt="pen" />
                          </button>
                          <button className="hover:cursor-pointer">
                            <img src={binIcon} alt="bin" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
