import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL, ImageApi } from "../../../config/ApiUrl";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { User, Calendar } from "lucide-react";

// Variants pour les animations
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ActualiteDetail = () => {
  const { id } = useParams();
  const [actu, setActualite] = useState(null); // null au lieu de "" pour mieux gérer l'absence de données
  const [autresActu, setAutresActu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetailActu = async () => {
    try {
      const response = await fetch(`${API_URL}/detailActu/${id}`);
      const data = await response.json();
      if (response.status === 200) {
        setActualite(data.actu);
      }
    } catch (error) {
      console.log("Erreur lors du chargement des détails :", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAutresActu = async () => {
    try {
      const response = await fetch(`${API_URL}/AutreActu/${id}`);
      const data = await response.json();
      if (response.status === 200) {
        setAutresActu(data.autresActualites || []);
      } else if (response.status === 404) {
        console.log("Aucun autre article trouvé");
      }
    } catch (error) {
      console.log("Erreur lors du chargement des autres actualités :", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailActu();
    fetchAutresActu();
  }, [id]); // Ajout de "id" comme dépendance pour recharger si l'ID change

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600"></div>
          <span className="text-lg text-gray-600">Chargement...</span>
        </div>
      </div>
    );
  }

  if (!actu) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4">Actualité non trouvée</h1>
        <Link to="/actualites" className="text-indigo-600 hover:underline text-sm sm:text-base">
          Retour à la liste des actualités
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50"
    >
      {/* En-tête avec catégorie */}
      <div className="container mx-auto px-4 pt-12">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-6"
        >
          <span className="inline-block bg-indigo-600 text-white text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
            ACTUALITÉ
          </span>
        </motion.div>

        {/* Lien de retour */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-8"
        >
          <Link
            to="/actualites"
            className="text-indigo-600 hover:underline text-sm sm:text-base font-medium"
          >
            ← Retour à la liste des actualités
          </Link>
        </motion.div>

        {/* Titre principal et sous-titre */}
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center max-w-4xl mx-auto leading-tight text-gray-900 mb-4"
        >
          {actu.titre}
        </motion.h1>
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl font-medium text-center max-w-3xl mx-auto leading-relaxed text-gray-600 mb-8"
        >
          {actu.sous_titre}
        </motion.h2>

        {/* Informations meta */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center space-x-4 mb-12 text-gray-600 text-sm sm:text-base"
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            <span>ESAG-NDE</span>
          </div>
          <span className="text-gray-400">•</span>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            <span>{formatDate(actu.createdAt)}</span>
          </div>
        </motion.div>
      </div>

      {/* Image principale */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="container mx-auto px-4 mb-16"
      >
        <div className="relative aspect-[16/9] max-w-5xl mx-auto overflow-hidden rounded-xl shadow-2xl">
          <img
            src={`${ImageApi}/${actu.imageCover}`}
            alt={actu.titre}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </motion.div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="prose prose-lg sm:prose-xl max-w-none mb-16 text-gray-700"
        >
          <div
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: actu.description }}
          />
        </motion.div>

        {/* Articles similaires */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="py-16 border-t border-gray-200"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center">
            Autres actualités
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600"></div>
            </div>
          ) : autresActu.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {autresActu.slice(0, 3).map((article) => (
                <motion.div
                  key={article.id}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl"
                >
                  <Link to={`/actualite/${article.id}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={`${ImageApi}/${article.imageCover}`}
                        alt={article.titre}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {article.titre}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
                        {article.sous_titre}
                      </p>
                      <span className="inline-block mt-3 text-indigo-600 group-hover:text-indigo-800 text-sm sm:text-base font-medium transition-colors">
                        Lire plus →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-sm sm:text-base">
              Aucun autre article n’est disponible pour le moment.
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ActualiteDetail;