import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { API_URL, ImageApi } from "../../config/ApiUrl";
import { ActualitesSkeleton } from "../components/ActualiteSkeleton";
import { formatDate } from "../utils/formatDate";

// Composant Skeleton pour afficher un indicateur de chargement


const Actualites = () => {
  const [listeActu, setListeActu] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListeActu = async () => {
    try {
      const response = await fetch(`${API_URL}/listeActu`);
      const data = await response.json();
      if (response.status === 200) {
        // Mise à jour du state avec les actualités récupérées
        setListeActu(data.actu);
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

  // Affichage du skeleton pendant le chargement
  if (loading) {
    return <ActualitesSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto">
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
        </div>
      </div>
    </div>
  );
};

export default Actualites;
