import { useState } from "react";
import ReactPaginate from "react-paginate";
import { PencilLine, Trash } from "lucide-react";
import EditModal from "../../components/Editmodal";
import DeleteModal from "../../components/DeleteModal";

const studentsData = [
  { id: 1, nom: "Dupont", prenom: "Jean", etat: "Actif" },
  { id: 2, nom: "Martin", prenom: "Sophie", etat: "Inactif" },
  { id: 3, nom: "Durand", prenom: "Luc", etat: "Actif" },
  { id: 4, nom: "Leroy", prenom: "Emma", etat: "Inactif" },
  { id: 5, nom: "Bernard", prenom: "Paul", etat: "Actif" },
  { id: 6, nom: "Morel", prenom: "Julie", etat: "Inactif" },
];

export default function AdminsTable() {
  const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredStudents = students.filter(
    (student) =>
      student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleEdit = (updatedStudent) => {
    const updatedStudents = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedStudents);
    closeModals();
  };

  const handleDelete = () => {
    const updatedStudents = students.filter((student) => student.id !== selectedStudent.id);
    setStudents(updatedStudents);
    closeModals();
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
                    {student.nom}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-50">
                    {student.prenom}
                  </td>
                  <td
                    className={`px-4 py-3 text-sm font-medium ${
                      student.etat === "Actif"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {student.etat}
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
    </div>
  )
}
