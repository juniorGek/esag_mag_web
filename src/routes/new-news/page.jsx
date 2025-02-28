import { useEffect, useState } from "react";
import { Upload, X, Heading, Heading2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../config/ApiUrl";


const NewNews = () => {
  const [formData, setFormData] = useState({
    titre: "",
    sous_titre: "",
    description: "",
    imageCover: null,
    enabled: false,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialisation de react-quilljs
  const { quill, quillRef } = useQuill({
    theme: "snow",
    placeholder: "Entrez la description...",
  });

  useEffect(() => {
    if (quill) {
      // Si vous souhaitez initialiser l'éditeur avec une valeur existante :
      if (formData.description) {
        quill.clipboard.dangerouslyPasteHTML(formData.description);
      }
      // On écoute l'événement "text-change" pour mettre à jour le state
      quill.on("text-change", () => {
        setFormData((prev) => ({
          ...prev,
          description: quill.root.innerHTML,
        }));
      });
    }
  }, [quill]); // S'exécute dès que quill est défini

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
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formValues = new FormData();
      formValues.append("titre", formData.titre);
      formValues.append("sous_titre", formData.sous_titre);
      formValues.append("description", formData.description);
    
      formValues.append("image", formData.imageCover);
      formValues.append("enabled", formData.enabled);

      const response = await fetch(`${API_URL}/createActualite`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <ToastContainer />
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="md:flex">
          {/* Section gauche pour l'upload d'image */}
          <div className="w-full md:w-1/2 p-8 bg-gray-50">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Aperçu de l'image"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setPreview(null);
                      setFormData({ ...formData, imageCover: null });
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-10 h-10 mx-auto text-gray-400" />
                  <p className="mt-4 text-gray-600">
                    Glissez-déposez une image ou{" "}
                    <label className="text-indigo-500 cursor-pointer hover:underline">
                      parcourez
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Formats supportés : JPEG, PNG
                  </p>
                </>
              )}
            </div>
            {/* Champ Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Entrez la description"
                  rows="4"
                />
              </div>
            </div>
          </div>

          {/* Section droite pour le formulaire */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Ajouter une Actualité
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ Titre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Entrez le titre"
                    required
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Heading className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600 transition-colors" />
                  </span>
                </div>
              </div>

              {/* Sous-titre */}
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Entrez le sous-titre"
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Heading2 className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600 transition-colors" />
                  </span>
                </div>
              </div>
            </div>

           

            {/* Description */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md resize-y"
                placeholder="Détails de l'actualité..."
                rows="4"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center group">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={formData.enabled}
                  onChange={handleChange}
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 cursor-pointer transition-all duration-300"
                />
                <label className="ml-2 text-sm font-medium text-gray-800 group-hover:text-yellow-600 transition-colors">
                  Publier immédiatement
                </label>
              </div>

              {/* Bouton de soumission */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    loading
                      ? "bg-indigo-300 cursor-not-allowed"
                      : "bg-indigo-500 hover:bg-indigo-600"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      {/* Spinner SVG */}
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
                      Chargement...
                    </div>
                  ) : (
                    "Ajouter l'actualité"
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Styles personnalisés */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        .animate-bounce-slow {
          animation: bounceSlow 2s infinite;
        }
        .animate-progress {
          animation: progress 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default NewNews;