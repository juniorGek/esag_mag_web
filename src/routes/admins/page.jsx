import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { PencilLine, Trash } from "lucide-react";
import EditModal from "../../components/Editmodal";
import DeleteModal from "../../components/DeleteModal";
import { API_URL } from "../../../config/ApiUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMessage } from "../../utils/messageContext";

export default function AdminsTable() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { message, setMessage } = useMessage();

  const filteredStudents = students.filter(
    (student) =>
      student.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (message) {
      if (message.type === "success") {
        toast.success(message.text, { position: "top-right", autoClose: 5000 });
      } else if (message.type === "error") {
        toast.error(message.text, { position: "top-right", autoClose: 5000 });
      }
      setMessage(null);
    }
  }, [message, setMessage]);

  const fetchAdminList = async () => {
    try {
      const response = await fetch(`${API_URL}/getAdmins`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setStudents(data.admins);
      } else {
        toast.error("Erreur lors de la récupération des administrateurs");
      }
    } catch (error) {
      toast.error("Erreur de connexion au serveur");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminList();
  }, []);

  const pageCount = Math.ceil(filteredStudents.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;
  const currentStudents = filteredStudents.slice(offset, offset + rowsPerPage);

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedStudent(null);
  };

  const handleEdit = async (updatedStudent) => {
    console.log(updatedStudent);
    fetchAdminList(); // Rafraîchir la liste après modification
    closeModals();
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/deleteAdmin/${selectedStudent.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        toast.success("Administrateur supprimé avec succès");
        fetchAdminList();
      } else {
        toast.error("Erreur lors de la suppression");
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression");
      console.error(error);
    }
    closeModals();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* En-tête avec recherche et filtre */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Liste des Administrateurs
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Rechercher un administrateur..."
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
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Prénom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      État
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentStudents.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        Aucun administrateur trouvé
                      </td>
                    </tr>
                  ) : (
                    currentStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {student.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {student.Name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {student.lastName}
                        </td>
                        <td
                          className={`px-6 py-4 text-sm font-medium ${
                            student.enabled ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {student.enabled ? "Actif" : "Inactif"}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => openEditModal(student)}
                              className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                              aria-label="Modifier"
                            >
                              <PencilLine size={20} />
                            </button>
                            <button
                              onClick={() => openDeleteModal(student)}
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

          {/* Modals */}
          <EditModal
            isOpen={isEditModalOpen}
            onClose={closeModals}
            student={selectedStudent}
            onSave={handleEdit}
          />
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={closeModals}
            onConfirm={handleDelete}
          />
          <ToastContainer />
        </div>
      )}
    </div>
  );
}