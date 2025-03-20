import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL, ImageApi } from "../../../config/ApiUrl";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";

const Evenement = () => {
  const [evenements, setEvenements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvenements();
  }, []);

  const fetchEvenements = async () => {
    try {
      const response = await fetch(`${API_URL}/listeEvent`);
      const data = await response.json();
      if (response.status === 200) {
        setEvenements(data.events || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Animation pour le message "Aucun événement"
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
    <div className="min-h-screen bg-gray-50 py-12">
      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : evenements.length === 0 ? (
        // Message animé et stylé pour aucun événement
        <motion.div
          className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-gray-100 to-blue-50 rounded-xl shadow-lg p-8 text-center"
          variants={messageVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            variants={childVariants}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Aucun événement pour le moment
          </motion.h2>
          <motion.p
            variants={childVariants}
            className="text-lg text-gray-600 mb-6 max-w-md"
          >
            Restez connecté, de nouveaux événements passionnants seront bientôt annoncés !
          </motion.p>
          <motion.div variants={childVariants} className="flex justify-center">
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
              rotate: [0, 5, -5, 0],
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </motion.div>
        </motion.div>
      ) : (
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-12">
              {evenements.map((evenement, index) => (
                <motion.div
                  key={evenement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Ligne de timeline */}
                  {index !== evenements.length - 1 && (
                    <div className="absolute left-[49px] top-[80px] bottom-[-40px] w-0.5 bg-gray-200" />
                  )}

                  <Link
                    to={`/evenement/${evenement.id}`}
                    className="group relative flex flex-col md:flex-row gap-8 bg-white p-6 rounded-xl hover:shadow-xl transition-all duration-300"
                  >
                    {/* Date badge */}
                    <div className="flex-shrink-0 w-24 h-24 bg-blue-600 text-white rounded-lg flex flex-col items-center justify-center group-hover:bg-blue-700 transition-colors">
                      <span className="text-2xl font-bold">
                        {formatDate(evenement.date)}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="md:w-1/3 aspect-[4/3] overflow-hidden rounded-lg">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        src={`${ImageApi}/${evenement.imageCover}`}
                        alt={evenement.titre}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Contenu */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-sm text-blue-600 mb-2">
                        <span>•</span>
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                          </svg>
                          {evenement.lieu}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                        {evenement.titre}
                      </h2>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {evenement.sous_titre}
                      </p>

                      <div className="flex items-center text-blue-600 font-medium">
                        Voir les détails
                        <svg
                          className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evenement;