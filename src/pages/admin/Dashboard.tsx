import plusIcon from "../../assets/icons/plus.svg";
import eyeIcon from "../../assets/icons/dashboardEye.svg";
import penIcon from "../../assets/icons/pen.svg";
import binIcon from "../../assets/icons/bin.svg";
import downloadIcon from "../../assets/icons/download.svg";
import notebook from "../../assets/notebook.png";
import { useEffect, useState } from "react";
import AddDashboardForm from "../../components/forms/AddDashboardForm";

interface Dashboard {
  name: string;
  embedLink: string;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    setDashboards([
      {
        name: "Satış Analitikası",
        embedLink: "#",
        createdAt: "2024-11-10",
        updatedAt: "2024-11-12",
      },
      {
        name: "Müştəri Statistikası",
        embedLink: "#",
        createdAt: "2024-10-01",
        updatedAt: "2024-11-01",
      },
      {
        name: "Satış Göstəriciləri",
        embedLink: "#",
        createdAt: "2024-09-15",
        updatedAt: "2024-10-20",
      },
    ]);
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{ boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.25)" }}
            className="bg-white rounded-lg flex flex-col gap-4 w-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-[#eee] border-b">
              <h2 className="text-xl font-bold p-6">Yeni dashboard</h2>
            </div>
            <AddDashboardForm setIsOpen={setIsOpen} />
          </div>
        </div>
      )}
      <div
        className={`relative flex flex-col w-full gap-16 transition-all duration-300 ${
          isOpen ? "blur-sm" : ""
        }`}
      >
        <div className="w-full flex flex-col justify-center shadowed-box">
          <h1 className="font-bold text-3xl">Dashboard İdarəetməsi</h1>
          <span className="text-lg mt-2">
            Statistik bölmədə bütün əsas göstəricilər cədvəllər, qrafiklər və
            filtrasiya alətləri ilə vizuallaşdırılır.
          </span>
        </div>

        <div className="shadowed-box">
          <div className="flex justify-between items-center gap-4">
            <h1 className="font-bold text-3xl w-[85%]">
              Dashboard İdarəetməsi
            </h1>

            <button className="w-[15%] text-[#1E40AF] flex justify-center gap-2 h-14 rounded-xl items-center bg-[#DBEAFE] hover:cursor-pointer">
              <img src={downloadIcon} alt="download" />
              Məlumatları ixrac et
            </button>
          </div>

          <div className="flex mt-8 gap-4">
            <input
              type="text"
              placeholder="Dashboard axtar..."
              className="w-[85%] border border-[#E5E5E5] rounded-xl px-2 outline-0"
            />
            <button
              onClick={() => setIsOpen(true)}
              className="w-[15%] text-white flex justify-center h-14 rounded-xl items-center bg-linear-to-br from-[#2421DB] to-[#211EC5] hover:cursor-pointer"
            >
              <img src={plusIcon} alt="plus" className="pr-8" /> Yeni Dashboard
            </button>
          </div>

          <div className="mt-12">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#ddd] text-[#666]">
                  <th className="pr-4 py-2 text-left">DASHBOARD ADI</th>
                  <th className="px-4 py-2 text-left">EMBED LINK</th>
                  <th className="px-4 py-2 text-end">YARADILMA TARIXI</th>
                  <th className="px-4 py-2 text-end">SON YENILƏMƏ</th>
                  <th className="pl-4 py-2 text-end">ƏMƏLIYYATLAR</th>
                </tr>
              </thead>
              <tbody>
                {dashboards?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="h-20 text-center w-full">
                      <div className="flex flex-col justify-center items-center mt-6 py-12">
                        <img
                          src={notebook}
                          alt="notebook"
                          className="w-15 object-contain"
                        />
                        <span className="text-[#999] mt-4">
                          Heç bir dashboard əlavə edilməyib
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  dashboards.map((dashboard, index) => (
                    <tr key={index} className="h-20">
                      <td className="px-4 py-2">{dashboard.name}</td>
                      <td className="px-4 py-2">
                        <button className="bg-linear-to-br from-[#2421DC] to-[#201EC1] text-white px-5 py-3 font-bold rounded-lg hover:cursor-pointer">
                          Koda bax
                        </button>
                      </td>
                      <td className="px-4 py-2 text-end text-[#666]">
                        {dashboard.createdAt}
                      </td>
                      <td className="px-4 py-2 text-end text-[#666]">
                        {dashboard.updatedAt}
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
