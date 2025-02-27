import { useState } from "react";
import ReactPaginate from "react-paginate";
import { PencilLine, Trash, Eye } from "lucide-react";

// Données de démonstration pour les blogs
const blogsData = [
  {
    id: 1,
    titre: "Nouvelle fonctionnalité",
    auteur: "Mario Sanchez",
    description: "Nous avons ajouté de nouvelles fonctionnalités pour améliorer votre expérience.",
    imageCover: "https://placehold.co/150",
    enabled: true,
  },
  {
    id: 2,
    titre: "Maintenance prévue",
    auteur: "Travor rose",
    description: "Une maintenance est prévue ce week-end. Veuillez planifier en conséquence.",
    imageCover: "https://placehold.co/150",
    enabled: false,
  },
  {
    id: 3,
    titre: "Événement à venir",
    auteur: "Allison bird",
    description: "Rejoignez-nous pour un événement passionnant avec des invités spéciaux.",
    imageCover: "https://placehold.co/150",
    enabled: true,
  },
  {
    id: 4,
    titre: "Promotion spéciale",
    auteur: "Joseph creman",
    description: "Des offres spéciales vous attendent. Ne manquez pas cette opportunité !",
    imageCover: "https://placehold.co/150",
    enabled: true,
  },
];

export default function BlogTable() {
  const [blogs, setBlogs] = useState(blogsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedBlogs, setSelectedBlogs] = useState(null); // Pour stocker le blog sélectionnée
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Pour gérer l'ouverture de la modale d'édition
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Pour gérer l'ouverture de la modale de suppression

  // Filtrage des blogs en fonction de la recherche
  const filteredBlogs = blogs.filter(
    (item) =>
      item.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.auteur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcul de la pagination
  const pageCount = Math.ceil(filteredBlogs.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;
  const currentBlogs = filteredBlogs.slice(offset, offset + rowsPerPage);

  // Ouvrir la modale d'édition
  const openEditModal = (item) => {
    setSelectedBlogs(item);
    setIsEditModalOpen(true);
  };

  // Ouvrir la modale de suppression
  const openDeleteModal = (item) => {
    setSelectedBlogs(item);
    setIsDeleteModalOpen(true);
  };

  // Fermer les modales
  const closeModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedBlogs(null);
  };

  // Gérer la modification d'un blog
  const handleEdit = (e) => {
    e.preventDefault();
    const updatedBlogs = blogs.map((item) =>
      item.id === selectedBlogs.id ? { ...item, ...selectedBlogs } : item
    );
    setBlogs(updatedBlogs);
    closeModals();
  };

  // Gérer la suppression d'un blog
  const handleDelete = () => {
    const updatedBlogs = blogs.filter((item) => item.id !== selectedBlogs.id);
    setBlogs(updatedBlogs);
    closeModals();
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* Barre de recherche et filtre de lignes */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher un blog..."
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

      {/* Tableau des blogs */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-50">
            Liste des Blogs
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
                  Image
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-slate-300">
                  Titre
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-slate-300">
                  Auteur
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
              {currentBlogs.map((item) => (
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
                        src={item.imageCover}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-50">
                    {item.titre}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-50">
                    {item.auteur}
                  </td>
                  <td
                    className={`px-4 py-3 text-sm font-medium ${
                      item.enabled
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {item.enabled ? "Activé" : "Désactivé"}
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
          previousLabel={"← Précédent"}
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

      {isEditModalOpen && (
  <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center mt-7 p-4">
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-50 mb-4">
        Modifier le blog
      </h2>
      <form onSubmit={handleEdit}>
        <div className="space-y-4">
          {/* Champ Titre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Titre
            </label>
            <input
              type="text"
              value={selectedBlogs.titre}
              onChange={(e) =>
                setSelectedBlogs({ ...selectedBlogs, titre: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-slate-700 dark:text-slate-50"
              required
            />
          </div>

          {/* Champ Auteur */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Auteur
            </label>
            <input
              type="text"
              value={selectedBlogs.auteur}
              onChange={(e) =>
                setSelectedBlogs({ ...selectedBlogs, auteur: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-slate-700 dark:text-slate-50"
              required
            />
          </div>

          {/* Champ Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Description
            </label>
            <textarea
              value={selectedBlogs.description}
              onChange={(e) =>
                setSelectedBlogs({ ...selectedBlogs, description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-slate-700 dark:text-slate-50"
              rows="4"
              required
            />
          </div>

          {/* Champ Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Image 
            </label>
            <div className="mt-2 flex items-center gap-4">
              {/* Aperçu de l'image actuelle */}
              {selectedBlogs.imageCover && (
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img
                    src={selectedBlogs.imageCover}
                    alt="Aperçu de l'image"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {/* Bouton pour téléverser une nouvelle image */}
              <label className="cursor-pointer">
                <span className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  Changer l image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setSelectedBlogs({
                          ...selectedBlogs,
                          imageCover: URL.createObjectURL(file),
                        });
                      }
                    }}
                    className="hidden"
                  />
                </span>
              </label>
            </div>
          </div>

          {/* Champ Statut */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Statut
            </label>
            <select
              value={selectedBlogs.enabled ? "Activé" : "Désactivé"}
              onChange={(e) =>
                setSelectedBlogs({
                  ...selectedBlogs,
                  enabled: e.target.value === "Activé",
                })
              }
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-slate-700 dark:text-slate-50"
            >
              <option value="Activé">Activé</option>
              <option value="Désactivé">Désactivé</option>
            </select>
          </div>
        </div>

        {/* Boutons de la modale */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={closeModals}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
      )}

      {/* Modale de suppression */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-50 mb-4">
              Supprimer le blog
            </h2>
            <p className="text-gray-700 dark:text-slate-300 mb-6">
              Êtes-vous sûr de vouloir supprimer cet blog ?
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