import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

interface Role {
  id: string;
  name: string;
}

export default function CreateUserForm({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [roles, setRoles] = useState<Role[]>([]);

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleToggle = (role: Role) => {
    setSelectedRoles((prev) => {
      const isSelected = prev.some((r) => r.id === role.id);
      if (isSelected) {
        return prev.filter((r) => r.id !== role.id);
      } else {
        return [...prev, role];
      }
    });
  };

  const removeRole = (roleId: string) => {
    setSelectedRoles((prev) => prev.filter((r) => r.id !== roleId));
  };

  const handleSubmit = () => {
    console.log({
      fullname,
      email,
      phoneNumber,
      roles: selectedRoles,
    });

    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setRoles([
      { id: "1", name: "Administrator" },
      { id: "2", name: "Manager" },
      { id: "3", name: "Analyst" },
      { id: "4", name: "Developer" },
      { id: "5", name: "Designer" },
      { id: "6", name: "Viewer" },
      { id: "7", name: "Editor" },
      { id: "8", name: "Contributor" },
    ]);
  });

  return (
    <div className="flex flex-col p-6 gap-4 w-120 mx-auto">
      <div className="flex flex-col gap-2">
        <label htmlFor="fullname" className="text-sm font-medium text-gray-700">
          Ad və soyad
        </label>
        <input
          id="fullname"
          className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="phoneNumber"
          className="text-sm font-medium text-gray-700"
        >
          Telefon
        </label>
        <input
          id="phoneNumber"
          className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Rol</label>

        <div ref={dropdownRef} className="relative">
          <div
            className="min-h-12 border border-gray-200 rounded-lg p-2 cursor-pointer hover:border-gray-300 transition-all bg-white"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex flex-wrap gap-2">
              {selectedRoles.map((role) => (
                <span
                  key={role.id}
                  className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium"
                >
                  {role.name}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRole(role.id);
                    }}
                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <ChevronDown
              className={`absolute right-3 top-4 w-5 h-5 text-gray-400 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="p-3 border-b border-gray-200">
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Axtar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
              </div>

              <div className="max-h-50 overflow-y-auto">
                {filteredRoles.length > 0 ? (
                  filteredRoles.map((role) => {
                    const isSelected = selectedRoles.some(
                      (r) => r.id === role.id
                    );
                    return (
                      <label
                        key={role.id}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleRoleToggle(role)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {role.name}
                        </span>
                      </label>
                    );
                  })
                ) : (
                  <div className="px-4 py-8 text-center text-sm text-gray-500">
                    Rol tapılmadı
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="text-white flex justify-center h-12 rounded-xl items-center bg-linear-to-br from-[#2421DB] to-[#211EC5] hover:from-[#1d19b8] hover:to-[#1a17a8] transition-all shadow-lg hover:shadow-xl mt-2 font-medium"
      >
        İstifadəçi yarat
      </button>
    </div>
  );
}
