import { useState } from "react";

export default function SimpleModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Кнопка открытия модалки */}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setIsOpen(true)}
      >
        Открыть модалку
      </button>

      {/* Модальное окно */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
          onClick={() => setIsOpen(false)} // клик на фон закрывает модалку
        >
          <div
            className="bg-white rounded-lg p-6 w-[300px] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()} // клик внутри окна не закрывает
          >
            <h2 className="text-xl font-bold">Простая модалка</h2>
            <p>Нажми кнопку, чтобы закрыть окно</p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              ОК
            </button>
          </div>
        </div>
      )}
    </>
  );
}
