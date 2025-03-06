import { useState, useEffect } from "react";
import { API_URL } from "../../../config/ApiUrl"; // Assurez-vous que cette URL est correcte
import ReactPaginate from "react-paginate";
import { PencilLine, Trash } from "lucide-react";

// Liste d'agents par défaut
const defaultAgents = [
  { id: 1, nomAgent: "Dupont", evenement: "Conférence Tech 2023", codeAgent: "ABC123" },
  { id: 2, nomAgent: "Martin", evenement: "Salon de l'Innovation", codeAgent: "XYZ789" },
  { id: 3, nomAgent: "Durand", evenement: "Atelier de Formation", codeAgent: "DEF456" },
  { id: 4, nomAgent: "Leroy", evenement: "Réunion Annuelle", codeAgent: "GHI789" },
  { id: 5, nomAgent: "Bernard", evenement: "Hackathon 2023", codeAgent: "JKL012" },
  { id: 6, nomAgent: "Morel", evenement: "Conférence Tech 2023", codeAgent: "MNO345" },
];

export default function Agents() {
  const [agents, setAgents] = useState(defaultAgents);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  // Récupérer les agents depuis l'API
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/agents`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.ok && data.agents && data.agents.length > 0) {
          setAgents(data.agents);
        }
      } catch (error) {
        console.log("Erreur lors de la récupération des agents, utilisation de la liste par défaut:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  // Filtrer les agents
  const filteredAgents = agents.filter(
    (agent) =>
      agent.nomAgent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.evenement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.codeAgent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredAgents.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;
  const currentAgents = filteredAgents.slice(offset, offset + rowsPerPage);

  // Fonctions pour les actions (édition et suppression)
  const handleEdit = (id) => {
    console.log("Éditer l'agent avec l'ID:", id);
    // Ajoutez ici la logique pour rediriger ou ouvrir un formulaire d'édition
  };

  const handleDelete = (id) => {
    console.log("Supprimer l'agent avec l'ID:", id);
    // Ajoutez ici la logique pour supprimer l'agent via l'API
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-slate-900 min-h-screen">
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
                  <td colSpan="5" className="px-4 py-3 text-center text-gray-500 dark:text-slate-400">
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
                      {agent.nomAgent}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-50">
                      {agent.evenement}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-50 font-mono">
                      {agent.codeAgent}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-x-4">
                        <button
                          onClick={() => handleEdit(agent.id)}
                          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <PencilLine size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(agent.id)}
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
    </div>
  );
}
