import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-indigo-950 to-blue-950 text-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Section ESAG MAG */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-extrabold text-blue-400 mb-4 tracking-tight">ESAG MAG</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Votre plateforme interactive pour rester connecté avec la vie de l&apos;école et participer activement à la communauté.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              <a href="mailto:contact@esagmag.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                contact@esagmag.com
              </a>
            </div>
          </div>

          {/* Section Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-gray-100 tracking-wider uppercase mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/actualites" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Actualités
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/evenements" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Événements
                </Link>
              </li>
            </ul>
          </div>

          {/* Section Participation */}
          <div>
            <h4 className="text-sm font-semibold text-gray-100 tracking-wider uppercase mb-6">Participation</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/sondages" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Sondages
                </Link>
              </li>
              <li>
                <Link to="/suggestions" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Suggestions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  À propos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur et bas de page */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ESAG MAG. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 hover:bg-gray-800 p-2 rounded-full transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 hover:bg-gray-800 p-2 rounded-full transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 hover:bg-gray-800 p-2 rounded-full transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;