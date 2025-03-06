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

  // Ouvrir la modale d'édition
  const openEdit = (item) => {
    navigate(`/admin/new-blogs/${item.id}`);
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

  const fetchBlogList = async () => {
    try {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogList();
  }, []);

  // Ouvrir la page de détails du blog
  const openView = (item) => {
    navigate(`/admin/blog-detail/${item.id}`);
  };

  // Gérer la suppression d'un blog
  const handleDelete = async () => {
    try {
      closeModals();
      const response = await fetch(`${API_URL}/deleteBlog/${selectedBlogs.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000
        });
        // Mise à jour immédiate de l'état
        setBlogs(blogs.filter(item => item.id !== selectedBlogs.id));
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000
        });
      }
    } catch (error) {
      closeModals();
      toast.error("Erreur lors de la suppression", {
        position: "top-right",
        autoClose: 3000
      });
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <ToastContainer />
      {/* Barre de recherche et filtre de lignes */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher un blog..."
          className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-lg bg-white text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-slate-800 dark:text-slate-50 dark:border-slate-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-lg bg-white text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-slate-800 dark:text-slate-50 dark:border-slate-600"
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(0);
          }}
        >
          <option value="5">5 lignes</option>
          <option value="10">10 lignes</option>
          <option value="20">20 lignes</option>
        </select>
      </div>

      {/* Tableau des blogs */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-50">
            Liste des Blogs
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-slate-300">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-slate-300">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-slate-300">
                  Titre
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-slate-300">
                  Auteur
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-slate-300">
                  Statut
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {currentBlogs.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-50">
                    {item.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <img
                        src={`${ImageApi}/${item.imageCover}`}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-50">
                    {item.titre}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-50">
                    {item.auteur}
                  </td>
                  <td
                    className={`px-4 py-3 text-sm font-medium ${
                      item.enabled
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {item.enabled ? "Activé" : "Désactivé"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-x-4">
                      <button
                        onClick={() => openView(item)}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => openEdit(item)}
                        className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                      >
                        <PencilLine size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(item)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
          containerClassName="flex gap-2"
          pageClassName="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-50"
          activeClassName="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600"
          previousClassName="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-50"
          nextClassName="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-50"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>

      {/* Modale de suppression */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-50 mb-4">
              Supprimer le blog
            </h2>
            <p className="text-gray-700 dark:text-slate-300 mb-6">
              Êtes-vous sûr de vouloir supprimer ce blog ?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-50"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
