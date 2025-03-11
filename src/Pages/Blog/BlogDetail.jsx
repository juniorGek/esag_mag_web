import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL, ImageApi } from "../../../config/ApiUrl";
import { formatDate } from "../../utils/formatDate";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  // Quelques commentaires statiques pour l'exemple
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Alice",
      date: "2023-03-01T10:30:00Z",
      content: "Super article ! Merci pour le partage.",
    },
    {
      id: 2,
      author: "Bob",
      date: "2023-03-02T12:00:00Z",
      content: "Vraiment intéressant, hâte de lire la suite.",
    },
  ]);

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

    fetchBlog();
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === "") return;
    const newComment = {
      id: comments.length + 1,
      author: "Vous",
      date: new Date().toISOString(),
      content: commentText,
    };
    setComments([...comments, newComment]);
    setCommentText("");
  };

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
                <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
                  <span className="text-xl">❤️</span>
                  <span>Aimer</span>
                </button>
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
                        {comment.author.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{comment.author}</h4>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.date)}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Formulaire d'ajout de commentaire */}
              <form onSubmit={handleCommentSubmit} className="mt-8">
                <h4 className="text-xl font-semibold mb-2">
                  Ajouter un commentaire
                </h4>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Votre commentaire..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
                <button
                  type="submit"
                  className="mt-4 w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Poster le commentaire
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
