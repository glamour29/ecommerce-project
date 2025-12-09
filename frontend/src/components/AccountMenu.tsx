import React, { useState, useRef, useEffect } from 'react';
import { User, Heart, Package, Sparkles, Settings, LogOut } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface AccountMenuProps {
  onNavigateAuth?: () => void;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({ onNavigateAuth }) => {
  const { user, isLoggedIn, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    window.location.href = '/'; // Redirect to home
  };

  if (!isLoggedIn) {
    // Show login button if not logged in
    return (
      <button 
        onClick={onNavigateAuth}
        className="px-2.5 py-1 hover:bg-black/5 rounded-md transition-colors flex items-center space-x-1"
      >
        <User className="w-3 h-3" />
        <span>Đăng Nhập</span>
      </button>
    );
  }

  // Show user menu if logged in
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-2.5 py-1 hover:bg-black/5 rounded-md transition-colors flex items-center space-x-1"
      >
        <User className="w-3 h-3" />
        <span>Chào, {user.firstName}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          <div className="py-1">
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Hồ Sơ</span>
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span>Đơn Hàng</span>
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Yêu Thích</span>
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Trải Nghiệm</span>
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Cài Đặt</span>
            </button>
          </div>

          <div className="border-t border-gray-100 py-1">
            <button 
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng Xuất</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

