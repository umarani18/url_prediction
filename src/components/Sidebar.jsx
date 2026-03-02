import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Search,
    History as HistoryIcon,
    LogOut,
    Sun,
    Moon,
    User as UserIcon,
    ShieldAlert
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ user, logout, theme, toggleTheme }) => {
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', path: '/detector', icon: <LayoutDashboard size={20} /> },
        { name: 'URL Analyzer', path: '/detector/analyze', icon: <Search size={20} /> },
        { name: 'History', path: '/history', icon: <HistoryIcon size={20} /> },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="fixed left-0 top-0 h-full w-64 glass border-r border-white/10 flex flex-col z-[1001]">
            <div className="p-8">
                <NavLink to="/detector" className="flex items-center gap-3 group">
                    <ShieldAlert className="w-8 h-8 text-cyan group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-outfit font-bold tracking-tight text-theme">
                        Phish<span className="text-cyan">Guard</span> AI
                    </span>
                </NavLink>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-primary-gradient text-white shadow-lg shadow-blue/20'
                                : 'text-theme-muted hover:text-cyan hover:bg-white/5'
                            }`
                        }
                    >
                        {item.icon}
                        <span className="font-medium text-sm">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-4">
                {/* User Info */}
                {user && (
                    <div className="px-4 py-3 rounded-2xl bg-white/5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-cyan/20 flex items-center justify-center text-cyan">
                            <UserIcon size={20} />
                        </div>
                        <div className="flex-1 min-w-0 text-theme">
                            <p className="text-sm font-bold truncate">{user.full_name}</p>
                            <p className="text-[10px] text-theme-muted truncate">{user.email}</p>
                        </div>
                    </div>
                )}

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-theme-muted hover:text-cyan hover:bg-white/5 transition-all"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    <span className="font-medium text-sm text-theme-muted">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:text-white hover:bg-red-500/10 transition-all"
                >
                    <LogOut size={20} />
                    <span className="font-medium text-sm">Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
