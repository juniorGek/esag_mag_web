import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { PencilLine, Trash } from "lucide-react";
import EditModal from "../../components/Editmodal";
import DeleteModal from "../../components/DeleteModal";
import { API_URL } from "../../../config/ApiUrl";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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
  const {message, setMessage} = useMessage();

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
      // Réinitialiser le message une fois affiché
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
        toast.error("Erreur lors de la récupération des administrateurs", {
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

  const handleEdit =async (updatedStudent) => {
    console.log(updatedStudent);
    closeModals();
  };

  const handleDelete = async() => {
    try {
      const response = await fetch(`${API_URL}/deleteAdmin/${selectedStudent.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        toast.success("L'administrateur a été supprimé avec succès", {
          position: "top-right",
          autoClose: 5000,
        });
        fetchAdminList();
      } else {
        toast.error("Erreur lors de la suppression de l'administrateur", {
          position: "top-right",
          autoClose: 5000,
        });
       
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'administrateur", {
        position: "top-right",
        autoClose: 5000,
      });
      console.error(error);
    }
    closeModals();
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <h1>Chargement...</h1>
        </div>
      ) : (
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

          {/* Tableau des admins */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-50">
                Liste des Admins
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
                      Prénom
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-slate-300">
                      État
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-slate-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {currentStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-50">
                        {student.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-50">
                        {student.Name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-50">
                        {student.lastName}
                      </td>
                      <td
                        className={`px-4 py-3 text-sm font-medium ${
                          student.enabled
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {student.enabled ? "Activé" : "Désactivé"}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-x-4">
                          <button
                            onClick={() => openEditModal(student)}
                            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <PencilLine size={18} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(student)}
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
            student={selectedStudent}
            onSave={handleEdit}
          />

          {/* Modale de suppression */}
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={closeModals}
            onConfirm={handleDelete}
          />
          <ToastContainer />
        </div>
        
      )}
    </>
  );
}
