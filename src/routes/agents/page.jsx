import { useState, useEffect } from "react";
import { API_URL } from "../../../config/ApiUrl"; // Assurez-vous que cette URL est correcte
import ReactPaginate from "react-paginate";
import { Trash } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  // Récupérer les agents depuis l'API
  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/getAgents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setAgents(data.agents);
      }
    } catch (error) {
      console.log(
        "Erreur lors de la récupération des agents, utilisation de la liste par défaut:",
        error
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
   
    fetchAgents();
  }, []);


  const openDeleteModal = (item) => {
    setSelectedAgent(item)
    setIsDeleteModalOpen(true);
  };

  // Fermer les modales
  const closeModals = () => {
    setIsDeleteModalOpen(false);
    setSelectedAgent(null);
  };

  // Filtrer les agents
  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.codeAgent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredAgents.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;
  const currentAgents = filteredAgents.slice(offset, offset + rowsPerPage);

  const handleDelete = async() => {
    try {
      const response = await  fetch(`${API_URL}/deleteAgent/${selectedAgent.id}`,{
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      const data = await response.json()
      if (response.status === 200){
        toast.success(data.message)
        fetchAgents()
        closeModals()
      }else{
        toast.error(data.message)
        closeModals()
      }
    } catch (error) {
      toast.error("erreur lors de la suppression")
      console.log(error)
      closeModals()
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <ToastContainer />
      {/* Barre de recherche et filtre de lignes */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher..."
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

      {/* Tableau des agents */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-50">
            Liste des Agents
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
                  Nom
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-slate-300">
                  Événement
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-slate-300">
                  Code
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-3 text-center text-gray-500 dark:text-slate-400"
                  >
                    Chargement...
                  </td>
                </tr>
              ) : (
                currentAgents.map((agent) => (
                  <tr
                    key={agent.id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-50">
                      {agent.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-50">
                      {agent.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-50">
                      {agent.Event.titre}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-50 font-mono">
                      {agent.codeAgent}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-x-4">
                        <button
                          onClick={() => openDeleteModal(agent)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash size={18} />
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
              Êtes-vous sûr de vouloir supprimer cet agent ?
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
