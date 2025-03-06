import { useState } from "react";
import { Upload, X, Heading, Heading2 } from "lucide-react";

import { toast, ToastContainer } from "react-toastify";
import { API_URL } from "../../../config/ApiUrl";
import DescriptionEditor from "../../components/DescriptionEditor";



const NewBlog = () => {
  const [formData, setFormData] = useState({
    titre: "",
    sous_titre: "",
    details: "",
    imageCover: null,
    enabled: true,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
      
    try {
      const formValues = new FormData();
      formValues.append("titre", formData.titre);
      formValues.append("sous_titre", formData.sous_titre);
      formValues.append("details", formData.details);
      formValues.append("image", formData.imageCover);
      formValues.append("enabled", formData.enabled);

      const response = await fetch(`${API_URL}/createBlog`, {
        method: "POST",
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formValues,
      });
      const data = await response.json()
      if (response.status === 200) {
        toast.success(data.message, { autoClose: 3000 });
        resetFormData();
      }else if (response.status === 400) {
        toast.error(data.message, { autoClose: 3000 });
      }
      console.log(data)

    } catch (error) {
      toast.error("Erreur lors de la création de l'actualité", {
        autoClose: 3000,
      });
      console.log(error)
    }finally{
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden transform transition-all hover:shadow-3xl border border-gray-200/50">
        {/* Section Upload - En-tête */}
        <div className="relative w-full h-60 bg-gradient-to-r from-gray-700 to-green-600">
          <div
            className={`absolute inset-0 flex items-center justify-center p-8 transition-all duration-300 ${
              preview ? "bg-black/10" : "border-2 border-dashed border-gray-300 hover:border-green-500"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {preview ? (
              <div className="relative w-full h-full group">
                <img
                  src={preview}
                  alt="Aperçu de l'image"
                  className="w-full h-full object-cover rounded-t-3xl transform transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => {
                    setPreview(null);
                    setFormData({ ...formData, imageCover: null });
                  }}
                  className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-lg hover:bg-green-100 transition-all duration-300 hover:scale-110"
                >
                  <X className="w-5 h-5 text-gray-600 hover:text-green-600" />
                </button>
              </div>
            ) : (
              <div className="text-center space-y-4 animate-fade-in">
                <Upload className="w-14 h-14 mx-auto text-green-500 animate-bounce-slow" />
                <p className="text-lg text-gray-700 font-medium">
                  Déposez une image ici ou{" "}
                  <label className="text-green-600 font-semibold cursor-pointer hover:text-green-700 transition-colors">
                    choisissez un fichier
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </p>
                <p className="text-sm text-gray-500">JPEG, PNG (max 5Mo)</p>
              </div>
            )}
          </div>
        </div>

        {/* Section Formulaire */}
        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-gray-800 to-green-600 bg-clip-text text-transparent mb-8">
            Créer un Nouveau Blog
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Champ Titre */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-hover:text-green-600">
                  Titre
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
                    placeholder="Un titre accrocheur"
                    required
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <Heading className="w-5 h-5 text-green-500 transition-colors group-hover:text-green-600" />
                  </span>
                </div>
              </div>

              {/* Champ Sous-titre */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-hover:text-green-600">
                  Sous Titre
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="sous_titre"
                    value={formData.sous_titre}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
                    placeholder="Mettez le sous titre ici"
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <Heading2 className="w-5 h-5 text-green-500 transition-colors group-hover:text-green-600" />
                  </span>
                </div>
              </div>
            </div>

            {/* Champ Contenu avec TipTap */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-hover:text-green-600">
                Contenu
              </label>
              <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <DescriptionEditor
                  value={formData.details}
                  onChange={(html) =>
                    setFormData({ ...formData, details: html })
                  }
                />
              </div>
            </div>

            {/* Checkbox et Bouton */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center group">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={formData.enabled}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer transition-all duration-300"
                />
                <label className="ml-3 text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                  Publier maintenant
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`relative w-full md:w-1/3 bg-gradient-to-r from-green-500 to-gray-800 text-white py-3 px-6 rounded-xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform transition-all duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:from-green-600 hover:to-gray-900 hover:scale-105"
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
                    Publication en cours...
                  </div>
                ) : (
                  "Publier le Blog"
                )}
              </button>
            </div>

             {/* Barre de progression si loading */}
             {loading && (
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 animate-progress"></div>
              </div>
            )}
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" />
      
    </div>
  );
};

export default NewBlog;