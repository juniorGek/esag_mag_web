import { useState } from "react";
import ReactPaginate from "react-paginate";

const studentsData = [
  { id: 1, nom: "Dupont", prenom: "Jean", etat: "Actif" },
  { id: 2, nom: "Martin", prenom: "Sophie", etat: "Inactif" },
  { id: 3, nom: "Durand", prenom: "Luc", etat: "Actif" },
  { id: 4, nom: "Leroy", prenom: "Emma", etat: "Inactif" },
  { id: 5, nom: "Bernard", prenom: "Paul", etat: "Actif" },
  { id: 6, nom: "Morel", prenom: "Julie", etat: "Inactif" },
];

export default function UsersTable() {
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
    <div className="max-w-4xl mx-auto p-4 bg-slate-100 shadow-lg rounded-lg transition-colors dark:bg-slate-900">
      <h2 className="text-center text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">
        Liste des Utilisateurs
      </h2>

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

      {/* Tableau */}
      <table className="w-full border-collapse border border-gray-200 transition-colors dark:border-slate-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-slate-800">
            <th className="border p-2 text-gray-900 dark:text-slate-50">Nom</th>
            <th className="border p-2 text-gray-900 dark:text-slate-50">Prénom</th>
            <th className="border p-2 text-gray-900 dark:text-slate-50">État</th>
            <th className="border p-2 text-gray-900 dark:text-slate-50">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id} className="text-center border-t dark:border-slate-700">
              <td className="border p-2 text-gray-900 dark:text-slate-50">{student.nom}</td>
              <td className="border p-2 text-gray-900 dark:text-slate-50">{student.prenom}</td>
              <td className={`border p-2 font-medium ${student.etat === "Actif" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {student.etat}
              </td>
              <td className="border p-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition dark:bg-blue-600 dark:hover:bg-blue-700">
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
