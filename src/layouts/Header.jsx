import { useState } from "react";
import { useTheme } from "../hooks/use-theme";
import { Bell, ChevronsLeft, Moon, Search, Sun, User, LogOut, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Import de Link pour la navigation
import profileImg from "../assets/profile-image.jpg";
import PropTypes from "prop-types";
import { useMessage } from "../utils/messageContext";

export const Header = ({ collapsed, setCollapsed }) => {
    const { theme, setTheme } = useTheme();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const {setMessage} = useMessage();
    const navigate = useNavigate();

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const handleLogout = async() => {
         localStorage.removeItem('token')
         setMessage({ type: "success", text: "Vous etes deconnectés !" })
         navigate("/login")
    };

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            {/* Section gauche : Bouton de collapse et barre de recherche */}
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
                </button>
                <div className="input flex items-center gap-x-2 rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800">
                    <Search
                        size={20}
                        className="text-slate-400 dark:text-slate-500"
                    />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-400 dark:text-slate-50 dark:placeholder:text-slate-500"
                    />
                </div>
            </div>

            {/* Section droite : Boutons de thème, notifications et profil */}
            <div className="flex items-center gap-x-3">
                {/* Bouton de changement de thème */}
                <button
                    className="btn-ghost size-10"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    {theme === "light" ? (
                        <Moon size={20} className="text-slate-700 dark:text-slate-300" />
                    ) : (
                        <Sun size={20} className="text-slate-700 dark:text-slate-300" />
                    )}
                </button>

                {/* Bouton de notifications */}
                <button className="btn-ghost size-10 relative">
                    <Bell size={20} className="text-slate-700 dark:text-slate-300" />
                    <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Bouton du profil avec menu déroulant */}
                <div className="relative">
                    <button
                        className="size-10 overflow-hidden rounded-full border-2 border-slate-200 hover:border-indigo-500 transition-all duration-300 dark:border-slate-700 dark:hover:border-indigo-500"
                        onClick={toggleProfileMenu}
                    >
                        <img
                            src={profileImg}
                            alt="Profile"
                            className="size-full object-cover"
                        />
                    </button>

                    {/* Menu déroulant */}
                    {isProfileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                            <div className="p-2">
                                {/* Option Profil */}
                                <Link
                                    to="/admin/profile" // Lien vers la page de profil
                                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                                    onClick={() => setIsProfileMenuOpen(false)}
                                >
                                    <User className="size-4 text-slate-500 dark:text-slate-400" />
                                    <span>Profil</span>
                                </Link>

                                {/* Option Paramètres */}
                                <Link
                                    to="/admin/settings" // Lien vers la page des paramètres
                                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                                    onClick={() => setIsProfileMenuOpen(false)}
                                >
                                    <Settings className="size-4 text-slate-500 dark:text-slate-400" />
                                    <span>Paramètres</span>
                                </Link>

                                {/* Option Déconnexion */}
                                <button
                                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="size-4" />
                                    <span>Déconnexion</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};