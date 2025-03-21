import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL, ImageApi } from "../../../config/ApiUrl";
import { formatDate } from "../../utils/formatDate";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_URL}/detailBlog/${id}`);
        const data = await response.json();
        if (response.status === 200) {
          setBlog(data.blog);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchComment = async () => {
      try {
        const response = await fetch(`${API_URL}/getComments/${id}`);
        const data = await response.json();
        if (response.status === 200) {
          setComments(data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchBlog();
    fetchComment();
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Chargement...</h1>
      </div>
    );
  }

  if (!blog) return <div>Aucun article trouvé</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {blog.imageCover && (
            <div className="relative h-[400px] w-full">
              <img
                src={`${ImageApi}/${blog.imageCover}`}
                alt={blog.titre}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h1 className="text-4xl font-bold mb-4">{blog.titre}</h1>
                <h2 className="text-2xl font-semibold mb-4">
                  {blog.sous_titre}
                </h2>
                <p className="text-sm opacity-90">
                  {formatDate(blog.createdAt)}
                </p>
              </div>
            </div>
          )}

          <div className="p-8">
            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: blog.details }}
            />

            {/* Section d'interactions sociales */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="flex space-x-4">
                <div className="flex items-center space-x-1 text-gray-600">
                  <span className="text-xl">❤️</span>
                  <span>{blog.likeAccount}</span>
                </div>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
                  <span className="text-xl">🔗</span>
                  <span>Partager</span>
                </button>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <span className="text-xl">💬</span>
                <span>Commenter</span>
              </div>
            </div>

            {/* Section Commentaires */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">Commentaires</h3>
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div className="flex-shrink-0">
                      {/* Avatar généré à partir de la première lettre du nom */}
                      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      <img
                          src={`${ImageApi}/${comment.User.profile}`}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="" >
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{comment.User.nom}</h4>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
