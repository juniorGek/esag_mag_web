import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/ApiUrl";
import { Eye, Clock, Calendar, ChevronRight } from "lucide-react";

const Sondage = () => {
  const [poll, setPoll] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handlePoll = async () => {
    try {
      const response = await fetch(`${API_URL}/getPollListe`);
      const data = await response.json();
      if (response.status === 200) {
        setPoll(data.polls || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePoll();
  }, []);

  const handleSondage = (item) => {
    navigate(`/sondage_details/${item.id}`);
  };

  // Animation pour le message "Aucun sondage"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-gray-900 mb-12"
      >
        Nos Sondages
      </motion.h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
              <div className="h-10 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      ) : poll.length === 0 ? (
        // Message animé pour aucun sondage
        <motion.div
          className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-indigo-50 to-blue-100 rounded-xl shadow-lg p-8 text-center"
          variants={messageVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            variants={childVariants}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Aucun sondage disponible
          </motion.h2>
          <motion.p
            variants={childVariants}
            className="text-lg text-gray-600 mb-6 max-w-md"
          >
            Revenez bientôt pour participer à nos prochains sondages !
          </motion.p>
          <motion.div variants={childVariants} className="flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-md"
            >
              Retour à l&apos;accueil
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </motion.div>
          <motion.div
            className="mt-8"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <Clock className="w-16 h-16 text-indigo-500" />
          </motion.div>
        </motion.div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {poll.map((sondage, index) => (
              <motion.div
                key={sondage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="p-6">
                  {/* Titre */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {sondage.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {sondage.description}
                  </p>

                  {/* Infos supplémentaires */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {sondage.duration || "Durée non précisée"}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {sondage.questions?.length || 0} question(s)
                    </span>
                  </div>

                  {/* Bouton */}
                  <button
                    onClick={() => handleSondage(sondage)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors duration-300 shadow-md group-hover:shadow-lg"
                  >
                    Voir le sondage
                    <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Sondage;