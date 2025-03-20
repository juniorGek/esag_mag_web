import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { PencilLine, Trash, Eye } from "lucide-react";
import DeleteModal from "../../components/DeleteNewsModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Laoder"; // Corrigé "Laoder" en "Loader"
import { API_URL, ImageApi } from "../../../config/ApiUrl";
import { useNavigate } from "react-router-dom";

export default function NewsTable() {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Corrigé "tr" en "true"
  const navigate = useNavigate();

  const fetchActuListe = async () => {
    try {
      const response = await fetch(`${API_URL}/getActualite`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setNews(data.actualites || []);
      } else {
        toast.error("Erreur lors de la récupération des actualités");
      }
    } catch (error) {
      toast.error("Erreur de connexion au serveur");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActuListe();
  }, []);

  // Filtrage des actualités
  const filteredNews = news.filter(
    (item) =>
      item.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sous_titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ""
  );

  // Pagination
  const pageCount = Math.ceil(filteredNews.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;
  const currentNews = filteredNews.slice(offset, offset + rowsPerPage);

  // Ouvrir la page d'édition
  const openEdit = (item) => {
    navigate(`/admin/new-edit/${item.id}`);
  };

  // Ouvrir la page de visualisation dans un nouvel onglet
  const openView = (item) => {
    window.open(`/actualite/${item.id}`, "_blank");
  };

  // Ouvrir la modale de suppression
  const openDeleteModal = (item) => {
    setSelectedNews(item);
    setIsDeleteModalOpen(true);
  };

  // Fermer les modales
  const closeModals = () => {
    setIsDeleteModalOpen(false);
    setSelectedNews(null);
  };

  // Gérer la suppression d'une actualité
  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/deleteActualite/${selectedNews.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message || "Actualité supprimée avec succès");
        setNews(news.filter((item) => item.id !== selectedNews.id));
      } else {
        toast.error(data.message || "Erreur lors de la suppression");
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression de l’actualité");
      console.log(error);
    }
    closeModals();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        ) : (
          <>
            {/* En-tête avec recherche et filtre */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Liste des Actualités
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Rechercher une actualité..."
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
                        Couverture
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Titre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Sous-titre
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
                    {currentNews.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                          Aucune actualité trouvée
                        </td>
                      </tr>
                    ) : (
                      currentNews.map((item) => (
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
                                onError={(e) => (e.target.src = "/placeholder.jpg")}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {item.titre}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {item.sous_titre || "Non spécifié"}
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
            {pageCount > 1 && (
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
            )}

            {/* Modale de suppression */}
            <DeleteModal
              isOpen={isDeleteModalOpen}
              onClose={closeModals}
              onConfirm={handleDelete}
            />
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}