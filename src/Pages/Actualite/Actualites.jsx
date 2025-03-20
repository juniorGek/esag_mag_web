import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { API_URL, ImageApi } from "../../../config/ApiUrl";
import { ActualitesSkeleton } from "../../components/ActualiteSkeleton";
import { formatDate } from "../../utils/formatDate";

const Actualites = () => {
  const [listeActu, setListeActu] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListeActu = async () => {
    try {
      const response = await fetch(`${API_URL}/listeActu`);
      const data = await response.json();
      if (response.status === 200) {
        setListeActu(data.actu || []);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des actualités :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListeActu();
  }, []);

  // Séparation des actualités pour différentes sections
  const featuredActualites = listeActu.slice(0, 2); // 2 premières actualités
  const otherActualites = listeActu.slice(2); // Reste des actualités

  // Animation pour le message "Aucune actualité"
  const messageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Affichage du skeleton pendant le chargement
  if (loading) {
    return <ActualitesSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto">
          {listeActu.length === 0 ? (
            // Message animé et stylé pour aucune actualité
            <motion.div
              className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl shadow-lg p-8 text-center"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2
                variants={childVariants}
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
              >
                Aucune actualité pour le moment
              </motion.h2>
              <motion.p
                variants={childVariants}
                className="text-lg text-gray-600 mb-6 max-w-md"
              >
                Ne vous inquiétez pas, de nouvelles histoires passionnantes arrivent bientôt !
              </motion.p>
              <motion.div
                variants={childVariants}
                className="flex justify-center"
              >
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-md"
                >
                  Retour à l&apos;accueil
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </Link>
              </motion.div>
              {/* Animation décorative */}
              <motion.div
                className="mt-8"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <svg
                  className="w-16 h-16 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>
            </motion.div>
          ) : (
            <>
              {/* Section des 2 actualités principales */}
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
                          src={`${ImageApi}/${actualite.imageCover}`}
                          alt={actualite.titre}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Catégorie */}
                      <div className="mb-1.5">
                        <span className="text-sm font-medium uppercase tracking-wide text-blue-600">
                          {actualite.titre}
                        </span>
                      </div>

                      {/* Titre */}
                      <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {actualite.sous_titre}
                      </h2>

                      {/* Auteur et Date */}
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mx-2">•</span>
                        <span>{formatDate(actualite.createdAt)}</span>
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
                          src={`${ImageApi}/${actualite.imageCover}`}
                          alt={actualite.titre}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Catégorie */}
                      <div className="mb-1">
                        <span className="text-xs font-medium uppercase tracking-wide text-blue-600">
                          {actualite.titre}
                        </span>
                      </div>

                      {/* Titre plus compact */}
                      <h2 className="text-sm font-semibold mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {actualite.sous_titre}
                      </h2>

                      {/* Auteur et Date version minimale */}
                      <div className="flex items-center text-xs text-gray-600">
                        <span className="mx-1.5">•</span>
                        <span>{formatDate(actualite.createdAt)}</span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Actualites;