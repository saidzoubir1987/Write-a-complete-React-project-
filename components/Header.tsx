import React from 'react';
import { User } from '../types';
import { LogoutIcon } from './icons/LogoutIcon';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto flex max-w-5xl items-center justify-between p-4">
        <div className="text-xl font-bold text-slate-50">Subscribely</div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-200">{user.name}</p>
            <p className="text-xs text-slate-400">{user.email}</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-lg bg-slate-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-600"
            aria-label="Logout"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
