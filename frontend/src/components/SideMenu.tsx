import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { X } from "lucide-react";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      ></div>

      {/* Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white dark:bg-stone-900 w-80 shadow-lg z-50 transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex justify-between items-center border-b border-stone-200 dark:border-stone-700">
          <h2 className="text-2xl font-serif text-stone-800 dark:text-stone-200">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="p-6">
          <ul>
            {isAuthenticated ? (
              <>
                <li className="mb-4">
                  <Link
                    to="/account"
                    onClick={onClose}
                    className="text-lg text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-600 font-sans"
                  >
                    Minha Conta
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="text-lg text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-600 font-sans w-full text-left"
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="mb-4">
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="text-lg text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-600 font-sans"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={onClose}
                    className="text-lg text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-600 font-sans"
                  >
                    Cadastro
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideMenu;
