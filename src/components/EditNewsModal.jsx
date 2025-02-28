import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ImageApi } from "../../config/ApiUrl";

export default function EditNewsModal({ isOpen, onClose, news, onSave }) {
  // Initialiser editedNews avec un objet vide si news est null
  const [editedNews, setEditedNews] = useState({
    titre: "",
    sous_titre: "",
    description: "",
    imageCover: "",
    enabled: false,
  });

  // Mettre à jour editedNews lorsque news change
  useEffect(() => {
    if (news) {
      setEditedNews(news);
    }
  }, [news]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNews({ ...editedNews, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedNews);
  };

  return (
    <div className="fixed inset-2 z-20 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-50 mb-4">
          Modifier l actualité
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Champ Titre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                Titre
              </label>
              <input
                type="text"
                name="titre"
                value={editedNews.titre || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg dark:bg-slate-700 dark:text-slate-50"
                required
              />
            </div>

            {/* Champ Sous-titre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                Sous-titre
              </label>
              <input
                type="text"
                name="sous_titre"
                value={editedNews.sous_titre || ""}
                onChange={handleChange}
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
                name="description"
                value={editedNews.description || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg dark:bg-slate-700 dark:text-slate-50"
                rows="4"
                required
              />
            </div>

            {/* Champ Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                Image de couverture
              </label>
              <div className="mt-2 flex items-center gap-4">
                {editedNews.imageCover && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img
                      src={
                        editedNews.imageCover.startsWith("blob:")
                          ? editedNews.imageCover
                          : `${ImageApi}/${editedNews.imageCover}`
                      }
                      alt="Aperçu de l'image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <label className="cursor-pointer">
                  <span className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                    Changer image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setEditedNews({
                            ...editedNews,
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
                name="enabled"
                value={editedNews.enabled ? "Activé" : "Désactivé"}
                onChange={(e) =>
                  setEditedNews({
                    ...editedNews,
                    enabled: e.target.value === "Activé",
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg dark:bg-slate-700 dark:text-slate-50"
              >
                <option value="Activé">Activé</option>
                <option value="Désactivé">Désactivé</option>
              </select>
            </div>
          </div>

          {/* Boutons de la modale */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
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
  );
}

EditNewsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  news: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titre: PropTypes.string.isRequired,
    sous_titre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageCover: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
};

EditNewsModal.defaultProps = {
  news: null, // news peut être null
};
