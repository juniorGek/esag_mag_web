import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Trash, Eye, PencilLine } from "lucide-react";
import { API_URL, ImageApi } from "../../../config/ApiUrl";
import { formatDate } from "../../utils/formatDate";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function EventsTable() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Veuillez vous reconnecter");
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/eventListe`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setEvents(data.event || []);
      } else {
        toast.error("Erreur lors du chargement des événements");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Naviguer vers la page de détails
  const openView = (item) => {
    navigate(`/admin/events-detail/${item.id}`);
  };

  // Naviguer vers la page d'édition
  const openEdit = (item) => {
    navigate(`/admin/events/edit/${item.id}`);
  };

  // Filtrage des événements
  const filteredEvents = events.filter((item) =>
    item.titre?.toLowerCase().includes(searchTerm.toLowerCase()) || ""
  );

  // Calcul de la pagination
  const pageCount = Math.ceil(filteredEvents.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;
  const currentEvents = filteredEvents.slice(offset, offset + rowsPerPage);

  // Ouvrir la modale de suppression
  const openDeleteModal = (item) => {
    setSelectedEvent(item);
    setIsDeleteModalOpen(true);
  };

  // Fermer la modale
  const closeModals = () => {
    setIsDeleteModalOpen(false);
    setSelectedEvent(null);
  };

  // Gérer la suppression d'un événement
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Veuillez vous reconnecter");
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/deleteEvent/${selectedEvent.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Événement supprimé avec succès");
        setEvents(events.filter((item) => item.id !== selectedEvent.id)); // Mise à jour immédiate
      } else {
        const data = await response.json();
        toast.error(data.message || "Erreur lors de la suppression");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la suppression");
    }
    closeModals();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {/* En-tête avec recherche et filtre */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Liste des Événements
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Rechercher un événement..."
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
                        Date / Lieu
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
                    {currentEvents.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                          Aucun événement trouvé
                        </td>
                      </tr>
                    ) : (
                      currentEvents.map((item) => (
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
                            {formatDate(item.date)} / {item.lieu || "Non spécifié"}
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

            {/* Modal de suppression */}
            {isDeleteModalOpen && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Supprimer l’événement
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Êtes-vous sûr de vouloir supprimer l’événement{" "}
                    <span className="font-medium">{selectedEvent?.titre}</span> ?
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
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}