import { useState } from "react";
import ReactPaginate from "react-paginate";
import { PencilLine, Trash } from "lucide-react";

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

  const filteredStudents = students.filter(
    (student) =>
      student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredStudents.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;
  const currentStudents = filteredStudents.slice(offset, offset + rowsPerPage);

  return (
    <div className="flex flex-col gap-y-4">
      {/* Barre de recherche et filtre de lignes */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full sm:w-2/3 p-2 border border-gray-300 rounded bg-white text-gray-900 transition-colors dark:bg-slate-800 dark:text-slate-50 dark:border-slate-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded bg-white text-gray-900 transition-colors dark:bg-slate-800 dark:text-slate-50 dark:border-slate-600"
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
      <div className="card">
        <div className="card-header">
          <p className="card-title">Liste des Admins</p>
        </div>
        <div className="card-body p-0">
          <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">#</th>
                  <th className="table-head">Nom</th>
                  <th className="table-head">Prénom</th>
                  <th className="table-head">État</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {currentStudents.map((student) => (
                  <tr key={student.id} className="table-row">
                    <td className="table-cell">{student.id}</td>
                    <td className="table-cell">{student.nom}</td>
                    <td className="table-cell">{student.prenom}</td>
                    <td className={`table-cell font-medium ${student.etat === "Actif" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      {student.etat}
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-x-4">
                        <button className="text-blue-500 dark:text-blue-600">
                          <PencilLine size={20} />
                        </button>
                        <button className="text-red-500">
                          <Trash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <ReactPaginate
          previousLabel={"← Précédent"}
          nextLabel={"Suivant →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName="flex justify-center gap-2 mt-2"
          pageClassName="border border-gray-300 px-3 py-1 rounded transition dark:border-slate-600 dark:text-slate-50"
          activeClassName="bg-blue-500 text-white dark:bg-blue-600"
          previousClassName="border border-gray-300 px-3 py-1 rounded transition dark:border-slate-600 dark:text-slate-50"
          nextClassName="border border-gray-300 px-3 py-1 rounded transition dark:border-slate-600 dark:text-slate-50"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
}