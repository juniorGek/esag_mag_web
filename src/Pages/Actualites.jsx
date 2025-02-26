import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { actualites } from '../data';

const Actualites = () => {
  // Séparation des actualités pour différentes sections
  const featuredActualites = actualites.slice(0, 2); // 2 premières actualités
  const otherActualites = actualites.slice(2); // Reste des actualités

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        {/* Section des 2 actualités principales */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {featuredActualites.map((actualite, index) => (
              <motion.article
                key={actualite.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group max-w-md"
              >
                <Link to={`/actualite/${actualite.id}`}>
                  {/* Image */}
                  <div className="aspect-[16/9] mb-3 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                      src={actualite.image}
                      alt={actualite.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Catégorie */}
                  <div className="mb-1.5">
                    <span className="text-sm font-medium uppercase tracking-wide text-blue-600">
                      {actualite.category || 'TECHNOLOGY'}
                    </span>
                  </div>

                  {/* Titre */}
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {actualite.title}
                  </h2>

                  {/* Auteur et Date */}
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="flex items-center">
                      <img 
                        src={actualite.authorImage} 
                        alt={actualite.author}
                        className="w-4 h-4 rounded-full mr-2"
                      />
                      <span>{actualite.author}</span>
                    </div>
                    <span className="mx-2">•</span>
                    <span>{actualite.date}</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Section des 3 actualités secondaires */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {otherActualites.map((actualite, index) => (
              <motion.article
                key={actualite.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 2) * 0.1 }}
                className="group"
              >
                <Link to={`/actualite/${actualite.id}`}>
                  {/* Image plus petite */}
                  <div className="aspect-[3/2] mb-2 overflow-hidden max-w-xs">
                    <motion.img
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                      src={actualite.image}
                      alt={actualite.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Catégorie */}
                  <div className="mb-1">
                    <span className="text-xs font-medium uppercase tracking-wide text-blue-600">
                      {actualite.category || 'TECHNOLOGY'}
                    </span>
                  </div>

                  {/* Titre plus compact */}
                  <h2 className="text-sm font-semibold mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {actualite.title}
                  </h2>

                  {/* Auteur et Date version minimale */}
                  <div className="flex items-center text-xs text-gray-600">
                    <span>{actualite.author}</span>
                    <span className="mx-1.5">•</span>
                    <span>{actualite.date}</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actualites;
