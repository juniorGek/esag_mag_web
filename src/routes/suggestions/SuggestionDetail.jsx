import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../../../config/ApiUrl";
import { formatDate } from "../../utils/formatDate";
import { ArrowLeft } from "lucide-react";

const SuggestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSuggestion = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/detailSuggestion/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (response.status === 200 && data) {
        setSuggestion(data);
      } else {
        setError("Suggestion non trouvée");
      }
    } catch (error) {
      setError("Erreur lors de la récupération de la suggestion.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestion();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-500 dark:text-slate-300 py-10">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 dark:text-red-300 py-10">{error}</div>;
  }

  if (!suggestion) {
    return <div className="text-center text-gray-500 dark:text-slate-300 py-10">Suggestion non trouvée</div>;
  }

  const isAnonyme = suggestion.type === "anonyme";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center p-4 bg-gray-50 dark:bg-slate-900 min-h-screen"
    >
      <div className="max-w-3xl w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 relative font-serif">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 left-4 bg-purple-200 dark:bg-purple-700 text-purple-600 dark:text-purple-200 p-2 rounded-full shadow-md hover:bg-purple-300 dark:hover:bg-purple-600"
          onClick={() => navigate("/admin/suggestions")}
        >
          <ArrowLeft size={24} />
        </motion.button>

        <motion.h1
          className="text-4xl font-bold text-gray-800 dark:text-slate-50 mb-6 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {suggestion.object || "Titre indisponible"}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="p-4 bg-purple-100 dark:bg-purple-900 rounded-md shadow-sm flex items-center justify-between"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-medium text-purple-700 dark:text-purple-200">Catégorie</span>
            <p className="text-gray-800 dark:text-slate-50 font-semibold">{suggestion.categorie || "Non spécifiée"}</p>
          </motion.div>

          <motion.div
            className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md shadow-sm flex items-center justify-between"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-medium text-blue-700 dark:text-blue-200">Date</span>
            <p className="text-gray-800 dark:text-slate-50 italic">{formatDate(suggestion.createdAt)}</p>
          </motion.div>
        </div>

        <motion.div
          className="mt-6 p-4 bg-gray-100 dark:bg-slate-700 rounded-md shadow-sm"
          whileHover={{ scale: 1.05 }}
        >
          <span className="block text-sm font-medium text-gray-600 dark:text-slate-300">Nom</span>
          {isAnonyme ? (
            <p className="text-gray-800 dark:text-slate-50 font-semibold italic">Anonyme</p>
          ) : (
            <p className="text-gray-800 dark:text-slate-50">{suggestion.nom || "Non spécifié"}</p>
          )}
        </motion.div>

        <motion.div
          className="mt-6 p-4 bg-gray-100 dark:bg-slate-700 rounded-md shadow-sm"
          whileHover={{ scale: 1.05 }}
        >
          <span className="block text-sm font-medium text-gray-600 dark:text-slate-300">Suggestion</span>
          <p className="text-gray-800 dark:text-slate-50">{suggestion.message || "Aucun message"}</p>
        </motion.div>

        {!isAnonyme && suggestion.email && (
          <motion.div
            className="mt-6 p-4 bg-gray-100 dark:bg-slate-700 rounded-md shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span className="block text-sm font-medium text-gray-600 dark:text-slate-300">Email</span>
            <p className="text-gray-800 dark:text-slate-50">{suggestion.email}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SuggestionDetail;
