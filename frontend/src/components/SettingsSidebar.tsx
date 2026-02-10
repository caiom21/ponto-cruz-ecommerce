import React from "react";
import { useTheme } from "../context/ThemeContext";
import { X, Sun, Moon } from "lucide-react";

interface SettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full bg-white dark:bg-stone-900 w-80 shadow-lg z-50 transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex justify-between items-center border-b border-stone-200 dark:border-stone-700">
          <h2 className="text-2xl font-serif text-stone-800 dark:text-stone-200">
            Configurações
          </h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-sans text-stone-700 dark:text-stone-300 mb-4">
            Tema
          </h3>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-3 bg-stone-100 dark:bg-stone-800 rounded-md text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
          >
            <span>
              Alternar para tema {theme === "light" ? "Escuro" : "Claro"}
            </span>
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingsSidebar;
