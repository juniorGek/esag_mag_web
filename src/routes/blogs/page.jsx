import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { PencilLine, Trash, Eye } from "lucide-react";
import { API_URL, ImageApi } from "../../../config/ApiUrl";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BlogTable() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedBlogs, setSelectedBlogs] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Filtrage des blogs en fonction de la recherche
  const filteredBlogs = blogs.filter(
    (item) =>
      item.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.auteur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcul de la pagination
  const pageCount = Math.ceil(filteredBlogs.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;
  const currentBlogs = filteredBlogs.slice(offset, offset + rowsPerPage);

  // Ouvrir la page d'édition
  const openEdit = (item) => {
    navigate(`/admin/blog-edit/${item.id}`);
  };

  // Ouvrir la page de détails
  const openView = (item) => {
    navigate(`/admin/blog-detail/${item.id}`);
  };

  // Ouvrir la modale de suppression
  const openDeleteModal = (item) => {
    setSelectedBlogs(item);
    setIsDeleteModalOpen(true);
  };

  // Fermer les modales
  const closeModals = () => {
    setIsDeleteModalOpen(false);
    setSelectedBlogs(null);
  };

  // Récupérer la liste des blogs
  const fetchBlogList = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/getBlog`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setBlogs(data.blogs);
      } else {
        toast.error("Erreur lors de la récupération des blogs");
      }
    } catch (error) {
      toast.error("Erreur de connexion au serveur");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogList();
  }, []);

  // Gérer la suppression d'un blog
  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/deleteBlog/${selectedBlogs.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message || "Blog supprimé avec succès");
        setBlogs(blogs.filter((item) => item.id !== selectedBlogs.id));
      } else {
        toast.error(data.message || "Erreur lors de la suppression");
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression du blog");
      console.log(error);
    }
    closeModals();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête avec recherche et filtre */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Liste des Blogs
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Rechercher un blog..."
              className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors text-gray-900 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="w-full sm:w-32 px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors text-gray-900 shadow-sm"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(0);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Titre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Auteur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
                      </div>
                    </td>
                  </tr>
                ) : currentBlogs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      Aucun blog trouvé
                    </td>
                  </tr>
                ) : (
                  currentBlogs.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {item.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-md overflow-hidden">
                          <img
                            src={`${ImageApi}/${item.imageCover}`}
                            alt={item.titre}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.titre}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.auteur}
                      </td>
                      <td
                        className={`px-6 py-4 text-sm font-medium ${
                          item.enabled ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {item.enabled ? "Actif" : "Inactif"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => openView(item)}
                            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                            aria-label="Voir"
                          >
                            <Eye size={20} />
                          </button>
                          <button
                            onClick={() => openEdit(item)}
                            className="text-teal-600 hover:text-teal-800 transition-colors duration-200"
                            aria-label="Modifier"
                          >
                            <PencilLine size={20} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(item)}
                            className="text-red-600 hover:text-red-800 transition-colors duration-200"
                            aria-label="Supprimer"
                          >
                            <Trash size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <ReactPaginate
            previousLabel={"← Précédent"}
            nextLabel={"Suivant →"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={({ selected }) => setCurrentPage(selected)}
            containerClassName="flex items-center gap-2"
            pageClassName="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            activeClassName="bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
            previousClassName="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            nextClassName="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>

        {/* Modal de suppression */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Supprimer le blog
              </h2>
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer le blog{" "}
                <span className="font-medium">{selectedBlogs?.titre}</span> ?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModals}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}