export default function RoleCard({
  id,
  title,
  usersCount,
  permissions,
  openModal,
}: {
  id: number;
  title: string;
  usersCount: number;
  permissions: string[];
  openModal: (roleId: number) => void;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 border aspect-square min-w-75 border-[#E5E5E5] rounded-xl p-6">
      <div>
        <div className="flex justify-between mb-4">
          <span className="font-bold text-lg">{title}</span>
          <span className="text-[#1E40AF] bg-[#ECF4FF] border border-[#DBEAFE] rounded-full px-4 py-1">{usersCount} istifadəçi</span>
        </div>
        <span className="text-[#757575]">Görə bilər:</span>
        <div className="flex flex-wrap mt-2">
          {permissions.map((permission, index) => (
            <span
              key={index}
              className="bg-[#DBEAFE] text-[#1E40AF] text-sm px-3 py-2 rounded-lg mr-2 mb-2"
            >
              {permission}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 border-t border-[#E5E7EB] pt-4">
        <button className="bg-[#221FCA] text-white px-12 rounded-lg py-2" onClick={() => openModal(id)}>Redaktə et</button>
        <button className="border text-[#757575] border-[#E5E7EB] px-12 rounded-lg py-2">Sil</button>
      </div>
    </div>
  );
}
