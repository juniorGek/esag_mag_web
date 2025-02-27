import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { PencilLine, Trash, Eye } from "lucide-react";
import EditModal from "../../components/EditNewsModal";
import DeleteModal from "../../components/DeleteNewsModal";
import { tr } from "framer-motion/m";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Laoder";
import { API_URL, ImageApi } from "../../../config/endPoint";

// Données de démonstration pour les actualités

export default function NewsTable() {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(tr);

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
        setNews(data.actualites);
      } else {
        toast.error("Erreur lors de la récupération des actualités", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error("Erreur de recuperation connexion", {
        position: "top-right",
        autoClose: 5000,
      });
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
      item.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sous_titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const pageCount = Math.ceil(filteredNews.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;
  const currentNews = filteredNews.slice(offset, offset + rowsPerPage);

  // Ouvrir la modale d'édition
  const openEditModal = (item) => {
    setSelectedNews(item);
    setIsEditModalOpen(true);
  };

  // Ouvrir la modale de suppression
  const openDeleteModal = (item) => {
    setSelectedNews(item);
    setIsDeleteModalOpen(true);
  };

  // Fermer les modales
  const closeModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedNews(null);
  };

  // Gérer la modification d'une actualité
  const handleEdit = (updatedNews) => {
    const updatedNewsList = news.map((item) =>
      item.id === updatedNews.id ? updatedNews : item
    );
    setNews(updatedNewsList);
    closeModals();
  };

  // Gérer la suppression d'une actualité
  const handleDelete = () => {
    const updatedNewsList = news.filter((item) => item.id !== selectedNews.id);
    setNews(updatedNewsList);
    closeModals();
  };

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div> 
      ) : (
        <div className="p-4 bg-gray-50 dark:bg-slate-900 min-h-screen">
          {/* Barre de recherche et filtre de lignes */}
          <ToastContainer />
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Rechercher une actualité..."
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

          {/* Tableau des actualités */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-50">
                Liste des Actualités
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
                      Couverture
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-slate-300">
                      Titre
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-slate-300">
                      Sous-titre
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
                  {currentNews.map((item) => (
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
                        {item.sous_titre}
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
                          <button className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => openEditModal(item)}
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

          {/* Modale d'édition */}
          <EditModal
            isOpen={isEditModalOpen}
            onClose={closeModals}
            news={selectedNews}
            onSave={handleEdit}
          />

          {/* Modale de suppression */}
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={closeModals}
            onConfirm={handleDelete}
          />
        </div>
      )}
    </>
  );
}
