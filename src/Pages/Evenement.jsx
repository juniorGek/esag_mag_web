import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL, ImageApi } from "../../config/ApiUrl";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/formatDate";

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
        setEvenements(data.events);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {loading ? (
        <div className="flex justify-center items-center">
          <h1>Chargement...</h1>
        </div>
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
                      {/* <span className="text-sm">{evenement.date.split(' ')[1]}</span> */}
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
                        {/* <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {evenement.time}
                      </span> */}
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

                      <p
                        className="text-gray-600 mb-4 line-clamp-2"
                        
                      >
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
