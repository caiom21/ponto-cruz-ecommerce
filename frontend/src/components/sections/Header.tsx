import React, { useState } from "react";
import { ShoppingBag, User, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import SideMenu from "../SideMenu";
import SettingsSidebar from "../SettingsSidebar";

interface HeaderProps {
  showCartIcon?: boolean;
  showUserIcon?: boolean;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({
  showCartIcon = true,
  showUserIcon = true,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { cartItems } = useCart(); // Usa o hook do carrinho
  const navigate = useNavigate();

  const handleCartClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate("/login");
    }
  };

  // Calcula a contagem de itens do carrinho a partir do contexto
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="bg-white dark:bg-stone-900 shadow-sm sticky top-0 z-30 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-20 h-20 flex items-center justify-center">
                <img
                  src="/Component 1.png"
                  alt="Viviane ponto a ponto logo"
                  className="w-full h-full object-contain dark:p-1 dark:bg-white dark:rounded-full"
                />
              </div>
            </Link>
            <div className="flex items-center space-x-6">
              {showCartIcon && (
                <Link
                  to="/cart"
                  onClick={handleCartClick}
                  className="relative text-stone-600 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-600 transition-colors"
                >
                  <ShoppingBag size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-sans">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
              {showUserIcon && (
                <button
                  onClick={() => setIsUserMenuOpen(true)}
                  className="text-stone-600 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-600 transition-colors"
                >
                  <User size={20} />
                </button>
              )}
              <button
                onClick={() => setIsSettingsMenuOpen(true)}
                className="text-stone-600 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-600 transition-colors"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
      <SideMenu
        isOpen={isUserMenuOpen}
        onClose={() => setIsUserMenuOpen(false)}
      />
      <SettingsSidebar
        isOpen={isSettingsMenuOpen}
        onClose={() => setIsSettingsMenuOpen(false)}
      />
    </>
  );
};

export default Header;
