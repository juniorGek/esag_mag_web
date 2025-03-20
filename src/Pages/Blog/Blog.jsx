import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { API_URL, ImageApi } from "../../../config/ApiUrl";
import { formatDate } from "../../utils/formatDate";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchBlogList = async () => {
    try {
      const response = await fetch(`${API_URL}/listeBlog`);
      const data = await response.json();
      if (response.status === 200) {
        setBlogs(data.blog || []);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogList();
  }, []);

  // Animation pour le message "Aucun blog"
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

  if (error) {
    return <div>Erreur lors de la récupération des blogs</div>;
  }

  // Skeleton pendant le chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Blog ESAG
        </h1>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-4 animate-pulse"
              >
                <div className="bg-gray-300 h-40 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Blog ESAG
        </h1>

        <div className="max-w-7xl mx-auto">
          {blogs.length === 0 ? (
            // Message animé et stylé pour aucun blog
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
                Aucun article de blog pour le moment
              </motion.h2>
              <motion.p
                variants={childVariants}
                className="text-lg text-gray-600 mb-6 max-w-md"
              >
                Restez à l&apos;affût, de nouveaux articles inspirants arrivent bientôt !
              </motion.p>
              <motion.div
                variants={childVariants}
                className="flex justify-center"
              >
                <button
                  onClick={() => navigate("/")}
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-md"
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
                </button>
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
                  className="w-16 h-16 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
                  />
                </svg>
              </motion.div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Pour les index pairs, l'image est affichée en haut */}
                  {index % 2 === 0 && blog.imageCover && (
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                      <img
                        src={`${ImageApi}/${blog.imageCover}`}
                        alt={blog.titre}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <p className="text-xs text-gray-500">
                        {formatDate(blog.createdAt)}
                      </p>
                    </div>
                    <h2 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">
                      {blog.titre}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {blog.sous_titre}
                    </p>
                  </div>

                  {/* Pour les index impairs, l'image est affichée en bas */}
                  {index % 2 !== 0 && blog.imageCover && (
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                      <img
                        src={`${ImageApi}/${blog.imageCover}`}
                        alt={blog.titre}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;