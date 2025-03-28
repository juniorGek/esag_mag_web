import { useState } from "react";
import { Upload, X, Heading, Heading2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../config/ApiUrl";
import DescriptionEditor from "../../components/DescriptionEditor";

const NewNews = () => {
  const [formData, setFormData] = useState({
    titre: "",
    sous_titre: "",
    description: "",
    description_mobile: "",
    imageCover: null,
    enabled: false,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageCover: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData({ ...formData, imageCover: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const stripTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const resetFormData = () => {
    setFormData({
      titre: "",
      sous_titre: "",
      description: "",
      imageCover: null,
      enabled: false,
    });
    setPreview(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formValues = new FormData();
      formValues.append("titre", formData.titre);
      formValues.append("sous_titre", formData.sous_titre);
      formValues.append("description", formData.description);
      formValues.append("description_mobile", formData.description_mobile);
      formValues.append("image", formData.imageCover);
      formValues.append("enabled", formData.enabled);

      const response = await fetch(`${API_URL}/createActualite`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formValues,
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success("Actualité créée avec succès", { autoClose: 3000 });
        resetFormData();
      } else if (response.status === 400) {
        toast.error(data.message, { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Erreur lors de la création de l'actualité", {
        autoClose: 3000,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <ToastContainer position="top-right" />
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row transform transition-all hover:shadow-3xl">
        {/* Section Image */}
        <div className="w-full md:w-1/3 p-6 bg-gradient-to-b from-green-100 to-white">
          <div
            className={`relative h-80 border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 ${
              preview
                ? "border-green-300 bg-green-50/50"
                : "border-gray-300 hover:border-green-400"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {preview ? (
              <div className="relative h-full group">
                <img
                  src={preview}
                  alt="Aperçu de l'actualité"
                  className="w-full h-full object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => {
                    setPreview(null);
                    setFormData({ ...formData, imageCover: null });
                  }}
                  className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-lg hover:bg-green-100 transition-all duration-300 hover:scale-110"
                >
                  <X className="w-5 h-5 text-gray-700 hover:text-green-600" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-4 animate-fade-in">
                <Upload className="w-12 h-12 text-green-500 animate-bounce-slow" />
                <p className="text-gray-700 font-medium">
                  Déposez une image ou{" "}
                  <label className="text-green-600 font-semibold cursor-pointer hover:text-green-700 transition-colors">
                    choisissez ici
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </p>
                <p className="text-sm text-gray-500">JPEG, PNG (max 5Mo)</p>
              </div>
            )}
          </div>
        </div>

        {/* Section Formulaire */}
        <div className="w-full md:w-2/3 p-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center bg-gradient-to-r from-green-600 to-gray-800 bg-clip-text text-transparent">
            Nouvelle Actualité
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Titre
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
                    placeholder="Titre principal"
                    required
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Heading className="w-5 h-5 text-green-500 group-hover:text-green-600 transition-colors" />
                  </span>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Sous-titre
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="sous_titre"
                    value={formData.sous_titre}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
                    placeholder="Résumé ou accroche"
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Heading2 className="w-5 h-5 text-green-500 group-hover:text-green-600 transition-colors" />
                  </span>
                </div>
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Description
              </label>
              <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <DescriptionEditor
                  value={formData.description}
                  onChange={(html) =>
                    setFormData({
                      ...formData,
                      description: html,
                      description_mobile: stripTags(html), // Mise à jour automatique du texte brut
                    })
                  }
                />
              </div>
            </div>
            
            <textarea
              className="w-full p-2 rounded-lg border-none outline-none hidden"
              value={formData.description_mobile}
              readOnly
            />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center group">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={formData.enabled}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer transition-all duration-300"
                />
                <label className="ml-2 text-sm font-medium text-gray-800 group-hover:text-green-600 transition-colors">
                  Publier immédiatement
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`relative w-full md:w-1/3 bg-gradient-to-r from-green-500 to-gray-800 text-white py-3 px-6 rounded-xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform transition-all duration-300 ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:from-green-600 hover:to-gray-900 hover:scale-105"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    En cours...
                  </div>
                ) : (
                  "Publier l'Actualité"
                )}
              </button>
            </div>

            {loading && (
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 animate-progress"></div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewNews;
