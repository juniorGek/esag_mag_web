import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../../../config/ApiUrl";

const SuggestionsTable = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(`${API_URL}/getSuggestions`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const data = await response.json();
      console.log("Réponse de l'API :", data);

      if (response.status === 200) {
        setSuggestions(data || []);
      } else {
        console.error("Erreur de l'API :", data.message || "Erreur inconnue");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des suggestions :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500 dark:text-slate-300 py-10">Chargement en cours...</div>;
  }

  return (
    <div className="p-4 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {Array.isArray(suggestions) && suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl overflow-hidden transform transition-transform"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-50 mb-3">{suggestion.object}</h2>
                <p className="text-gray-600 dark:text-slate-300 mb-2">Catégorie: {suggestion.categorie}</p>
                <Link
                  to={`/admin/suggestions/${suggestion.id}`}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                >
                  Voir les détails
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-slate-300">Aucune suggestion disponible</div>
        )}
      </div>
    </div>
  );
};

export default SuggestionsTable;
