import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { actualites } from '../data';

const ActualiteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const actualite = actualites.find(act => act.id.toString() === id);

  if (!actualite) {
    return <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl text-gray-600">Actualité non trouvée</h1>
    </div>;
  }

  const handleSimilarClick = (actualiteId) => {
    navigate(`/actualite/${actualiteId}`);
    window.scrollTo(0, 0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white"
    >
      {/* En-tête avec catégorie */}
      <div className="container mx-auto px-4 pt-8">
        <div className="text-center">
          <motion.span
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block text-blue-600 font-medium mb-4"
          >
            ACTUALITÉ
          </motion.span>
        </div>
      </div>

      {/* Titre principal */}
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-center max-w-4xl mx-auto leading-tight text-gray-900 mb-8"
        >
          {actualite.title}
        </motion.h1>

        {/* Informations de l'auteur et date */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center space-x-4 mb-12"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <img src="/images/avatar.jpg" alt="Author" className="w-full h-full object-cover" />
            </div>
            <span className="text-gray-700">ESAG-NDE</span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">{actualite.date}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">8 min de lecture</span>
        </motion.div>
      </div>

      {/* Image principale avec animation */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="container mx-auto px-4 mb-16"
      >
        <div className="relative aspect-[16/9] max-w-4xl mx-auto  overflow-hidden shadow-2xl">
          <img 
            src={actualite.image} 
            alt={actualite.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
      </motion.div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="prose prose-lg max-w-none mb-16"
        >
          <p className="text-xl leading-relaxed text-gray-700">
            {actualite.description}
          </p>

          {/* Points clés en grille */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Points essentiels</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-blue-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-gray-700">Point important de l'actualité avec plus de détails et d'explications</span>
                </li>
                {/* Ajoutez d'autres points si nécessaire */}
              </ul>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-blue-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-xl font-semibold mb-4">Impact</h3>
              <p className="opacity-90">
                Analyse de l'impact et des conséquences de cette actualité sur la communauté ESAG-NDE
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Articles similaires */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="my-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Articles similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {actualites.slice(0, 3).map((article, index) => (
              <motion.div
                key={article.id}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link to={`/actualite/${article.id}`} className="block">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                    <img 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 text-sm">
                    {article.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ActualiteDetail; 