import { useState } from "react";
import { Upload, X } from "lucide-react";

export default function AddDashboardForm({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeIcon = () => {
    setIconPreview(null);
  };

  return (
    <div className="flex flex-col p-6 gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="dashboardName"
          className="text-sm font-medium text-gray-700"
        >
          Dashboard adı
        </label>
        <input
          id="dashboardName"
          className="border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          type="text"
          placeholder="Dashboard adını daxil edin"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="embedLink"
          className="text-sm font-medium text-gray-700"
        >
          Tableau Embed link
        </label>
        <input
          id="embedLink"
          className="border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          type="text"
          placeholder="https://..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">İkon</label>

        {!iconPreview ? (
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("iconFile")?.click()}
          >
            <input
              id="iconFile"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />

            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  Faylı seçin və ya bura atın
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, SVG (maks. 2MB)
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-white border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
                <img
                  src={iconPreview}
                  alt="Icon preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">
                  İkon yükləndi
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Dəyişdirmək üçün yeni fayl seçin
                </p>
              </div>
              <button
                type="button"
                onClick={removeIcon}
                className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
            </div>
            <input
              id="iconFileHidden"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={() => document.getElementById("iconFileHidden")?.click()}
              className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Başqa fayl seç
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        className="text-white flex justify-center h-12 rounded-xl items-center bg-linear-to-br from-[#2421DB] to-[#211EC5] hover:from-[#1d19b8] hover:to-[#1a17a8] transition-all shadow-lg hover:shadow-xl mt-2"
        onClick={() => setIsOpen(false)}
      >
        Yadda saxla
      </button>
    </div>
  );
}
