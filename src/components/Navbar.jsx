import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import navigation from './Menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Séparer les liens en deux groupes : gauche et droite
  const leftLinks = navigation.filter((item) => item.position === 'left');
  const rightLinks = navigation.filter((item) => item.position === 'right');

  return (
    <nav className="bg-blue-100 backdrop-blur-md top-0 z-50 shadow-lg sticky">
      <div className="container-width mx-auto">
        <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          {/* Liens à gauche */}
          <div className="hidden md:flex items-center space-x-8">
            {leftLinks.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link animate-fade-in flex items-center space-x-2 ${
                  isActive(item.href)
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700 hover:text-blue-600'
                } transition-all duration-300 ease-in-out hover:scale-105`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="opacity-80">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Logo au centre */}
          <Link
            to="/"
            className="mx-4 flex items-center justify-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-transform duration-300"
          >
            ESAG MAG
          </Link>

          {/* Liens à droite */}
          <div className="hidden md:flex items-center space-x-8">
            {rightLinks.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link animate-fade-in flex items-center space-x-2 ${
                  isActive(item.href)
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700 hover:text-blue-600'
                } transition-all duration-300 ease-in-out hover:scale-105`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="opacity-80">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Bouton du menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none transition-colors duration-200"
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

        {/* Menu mobile */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="opacity-80">{item.icon}</span>
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