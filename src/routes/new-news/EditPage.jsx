import { useEffect, useState } from "react";
import { API_URL, ImageApi } from "../../../config/ApiUrl";
import { useParams } from "react-router-dom";

function EditNews() {
  const { id } = useParams();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editedNews, setEditedNews] = useState({
    titre: "",
    sous_titre: "",
    description: "",
    imageCover: "",
    enabled: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNews({ ...editedNews, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(editedNews);
  };

  const fetchDetailsActualite = async () => {
    try {
      const response = await fetch(`${API_URL}/detailsActu/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setNews(data.actualite);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Récupération des données à l'initialisation
  useEffect(() => {
    fetchDetailsActualite();
  }, []);

  // Synchronisation des données récupérées dans editedNews
  useEffect(() => {
    if (news) {
      setEditedNews({
        titre: news.titre || "",
        sous_titre: news.sous_titre || "",
        description: news.description || "",
        imageCover: news.imageCover || "",
        enabled: news.enabled || false,
      });
    }
  }, [news]);

  // Affichage d'un indicateur de chargement pendant le fetch
  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-50 mb-4">
          Modifier actualité
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
                value={editedNews.titre}
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
                value={editedNews.sous_titre}
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
                value={editedNews.description}
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

export default EditNews;
