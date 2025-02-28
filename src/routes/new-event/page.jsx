import { useState } from "react";
import { Upload, X, Heading, Heading2 } from "lucide-react";

const NewEvent = () => {
  const [formData, setFormData] = useState({
    titre: "",
    sous_titre: "",
    lieu: "",
    prix: "",
    description: "",
    imageCover: null,
    enabled: false,
  });

  const [preview, setPreview] = useState(null);

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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données soumises:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-yellow-50 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden border border-gray-200/50">
        {/* Section Image */}
        <div className="relative w-full h-60 bg-gradient-to-r from-gray-700 to-yellow-600">
          <div
            className={`absolute inset-0 flex items-center justify-center p-6 transition-all duration-300 ${
              preview ? "bg-black/20" : "border-2 border-dashed border-white/60 hover:border-white"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {preview ? (
              <div className="relative w-full h-full group">
                <img
                  src={preview}
                  alt="Aperçu de l'événement"
                  className="w-full h-full object-cover rounded-t-2xl transform transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => {
                    setPreview(null);
                    setFormData({ ...formData, imageCover: null });
                  }}
                  className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-lg hover:bg-yellow-100 transition-all duration-300 hover:scale-110"
                >
                  <X className="w-5 h-5 text-gray-700 hover:text-yellow-600" />
                </button>
              </div>
            ) : (
              <div className="text-center space-y-3 animate-fade-in">
                <Upload className="w-12 h-12 mx-auto text-white animate-pulse" />
                <p className="text-white text-lg font-semibold">
                  Ajoutez une image d'événement{" "}
                  <label className="underline cursor-pointer hover:text-yellow-200 transition-colors">
                    en cliquant ici
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </p>
                <p className="text-sm text-white/80">JPEG, PNG (max 5Mo)</p>
              </div>
            )}
          </div>
        </div>

        {/* Section Formulaire */}
        <div className="p-8 bg-white">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 bg-gradient-to-r from-gray-800 to-yellow-600 bg-clip-text text-transparent">
            Créer un Événement
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section Titre et Sous-titre */}
            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Titre de l'événement
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
                    placeholder="Nom de l'événement"
                    required
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Heading className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600 transition-colors" />
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
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
                    placeholder="Accroche ou thème"
                    required
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Heading className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600 transition-colors" />
                  </span>
                </div>
              </div>
            </div>

            {/* Section Lieu et Prix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Lieu
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="lieu"
                    value={formData.lieu}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
                    placeholder="Lieu de l'événement"
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Heading2 className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600 transition-colors" />
                  </span>
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Prix
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="prix"
                    value={formData.prix}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
                    placeholder="Ex: 15€ ou Gratuit"
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Heading2 className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600 transition-colors" />
                  </span>
                </div>
              </div>
            </div>

            {/* Section Description */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md resize-none overflow-y-auto"
                placeholder="Détails et informations clés..."
                rows="5"
                style={{ maxHeight: "120px" }}
              />
            </div>

            {/* Section Actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-gray-200">
              <div className="flex items-center group">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={formData.enabled}
                  onChange={handleChange}
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 cursor-pointer transition-all duration-300"
                />
                <label className="ml-2 text-sm font-medium text-gray-800 group-hover:text-yellow-600 transition-colors">
                  Activer immédiatement
                </label>
              </div>
              <button
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-gray-700 to-yellow-500 text-white py-3 px-8 rounded-xl font-semibold shadow-md hover:from-gray-800 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105"
              >
                Ajouter l'Événement
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Styles personnalisés */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default NewEvent;