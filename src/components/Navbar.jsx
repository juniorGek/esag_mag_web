import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import navigation from './Menu';
import logo from "../assets/im3.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-full mx-auto px-8">
        <div className="flex justify-between items-center py-8">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex "
          >
            <img
                                src={logo}
                                alt="Logoipsum"
                                className="w-[90px] h-auto"
                            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navigation.map((item, index) => (
              item.name !== "À propos" && (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link animate-fade-in flex items-center space-x-1 text-lg font-medium transition-transform transform hover:scale-105 ${
                    isActive(item.href) ? 'text-blue-600' : 'text-gray-600'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="opacity-75">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <span
                  className={`absolute w-6 h-0.5 bg-current transform transition-all duration-200 ${
                    isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-current transform transition-all duration-200 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-current transform transition-all duration-200 ${
                    isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;