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
      console.log(data);
      if (response.status === 200) {
        setBlogs(data.blog);
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

  if (error) {
    return <div>Erreur lors de la récupération des actualités</div>;
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
        </div>
      </div>
    </div>
  );
};

export default Blog;
