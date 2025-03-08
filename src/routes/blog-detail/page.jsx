import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL, ImageApi } from "../../../config/ApiUrl";
import { formatDate } from "../../utils/formatDate";
import { ArrowLeft, Edit, Trash, ToggleLeft, ToggleRight } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminBlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_URL}/detailsBlog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.status === 200) {
          setBlog(data.blog);
        } else {
          toast.error("Erreur lors du chargement du blog");
        }
      } catch (error) {
        console.log(error);
        toast.error("Erreur de connexion");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/deleteBlog/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
        setTimeout(() => navigate('/admin/blogs'), 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression");
      console.log(error);
    }
    setIsDeleteModalOpen(false);
  };

  const toggleStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/toggleBlogStatus/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.status === 200) {
        setBlog({ ...blog, enabled: !blog.enabled });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Erreur lors du changement de statut");
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!blog) return <div>Aucun article trouvé</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        {/* Barre d'actions administrative */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/admin/blogs')}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Retour à la liste</span>
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleStatus}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                blog.enabled
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              {blog.enabled ? (
                <>
                  <ToggleRight size={20} />
                  <span>Activé</span>
                </>
              ) : (
                <>
                  <ToggleLeft size={20} />
                  <span>Désactivé</span>
                </>
              )}
            </button>
            <button
              onClick={() => navigate(`/admin/new-blogs/${id}`)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Edit size={20} />
              <span>Modifier</span>
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <Trash size={20} />
              <span>Supprimer</span>
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
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
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">{blog.sous_titre}</h2>
                    <p className="text-sm opacity-90">Publié le {formatDate(blog.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Par {blog.auteur}</p>
                    <p className="text-sm opacity-90">Dernière modification le {formatDate(blog.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="p-8">
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: blog.details }}
            />
          </div>
        </motion.div>
      </div>

      {/* Modal de confirmation de suppression */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Confirmer la suppression</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Êtes-vous sûr de vouloir supprimer ce blog ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogDetail; 