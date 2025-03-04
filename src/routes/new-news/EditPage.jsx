import { useEffect, useState } from "react";
import { API_URL, ImageApi } from "../../../config/ApiUrl";
import { useNavigate, useParams } from "react-router-dom";
import {
  Loader2,
  Type,
  FileText,
  Image as ImageIcon,
  ToggleLeft,
  X,
  Save,
  Newspaper,
} from "lucide-react";
import { toast } from "react-toastify";
import { useMessage } from "../../utils/messageContext";

function EditNews() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {setMessage} = useMessage();
  const [editedNews, setEditedNews] = useState({
    titre: "",
    sous_titre: "",
    description: "",
    imageCover: "",
    imageFile: null,
    enabled: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNews({ ...editedNews, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log(editedNews.enabled);
    
    const formValues = new FormData();
    formValues.append("titre", editedNews.titre);
    formValues.append("sous_titre", editedNews.sous_titre);
    formValues.append("description", editedNews.description);
    formValues.append("image", editedNews.imageFile);
    /* formValues.append("enabled", editedNews.enabled); */
   

    try {
      const response = await fetch(`${API_URL}/updateActualite/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formValues,
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        setMessage({ type: "success", text: data.message });
        navigate("/admin/news");
      }else{
        toast.error(data.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error("Erreur lors de la modification de l'actualité", {
        position: "top-right",
        autoClose: 5000,
      });
      console.log(error);
    }
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

  useEffect(() => {
    fetchDetailsActualite();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-850 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="px-8 pt-8 pb-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-750">
            <div className="flex items-center gap-3">
              <Newspaper className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                Modifier l&apos;actualité
              </h2>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Ajustez les informations de cette actualité
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Titre */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  <Type className="h-4 w-4 text-indigo-500" />
                  Titre
                </label>
                <input
                  type="text"
                  name="titre"
                  value={editedNews.titre}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              {/* Sous-titre */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  <FileText className="h-4 w-4 text-indigo-500" />
                  Sous-titre
                </label>
                <input
                  type="text"
                  name="sous_titre"
                  value={editedNews.sous_titre}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  <FileText className="h-4 w-4 text-indigo-500" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={editedNews.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-y min-h-[120px]"
                  required
                />
              </div>

              {/* Image */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  <ImageIcon className="h-4 w-4 text-indigo-500" />
                  Image de couverture
                </label>
                <div className="flex items-center gap-4">
                  {editedNews.imageCover && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                      <img
                        src={
                          editedNews.imageCover.startsWith("blob:")
                            ? editedNews.imageCover
                            : `${ImageApi}/${editedNews.imageCover}`
                        }
                        alt="Aperçu"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200">
                      <ImageIcon className="h-4 w-4" />
                      Changer l&apos;image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setEditedNews({
                              ...editedNews,
                              imageCover: URL.createObjectURL(file), // pour la prévisualisation
                              imageFile: file, // pour l'envoi à l'API
                            });
                          }
                        }}
                        className="hidden"
                      />

                    </span>
                  </label>
                </div>
              </div>

              {/* Statut */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  <ToggleLeft className="h-4 w-4 text-indigo-500" />
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
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="Activé">Activé</option>
                  <option value="Désactivé">Désactivé</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
              >
                <X className="h-4 w-4" />
                Annuler
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
              >
                <Save className="h-4 w-4" />
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditNews;