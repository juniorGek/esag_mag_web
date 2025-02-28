import { useState } from "react";
import { Upload, X, Heading, Heading2 } from "lucide-react";

const NewBlog = () => {
  const [formData, setFormData] = useState({
    titre: "",
    sous_titre: "",
    details: "",
    imageCover: null,
    enabled: true,
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
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden transform transition-all hover:shadow-3xl border border-gray-200/50">
        {/* Section Upload - En-tête */}
        <div className="relative w-full h-60  bg-gradient-to-r from-gray-700 to-yellow-600">
          <div
            className={`absolute inset-0 flex items-center justify-center p-8 transition-all duration-300 ${
              preview ? "bg-black/10" : "border-2 border-dashed border-gray-300 hover:border-yellow-500"
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
                  className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-lg hover:bg-yellow-100 transition-all duration-300 hover:scale-110"
                >
                  <X className="w-5 h-5 text-gray-600 hover:text-yellow-600" />
                </button>
              </div>
            ) : (
              <div className="text-center space-y-4 animate-fade-in">
                <Upload className="w-14 h-14 mx-auto text-yellow-500 animate-bounce-slow" />
                <p className="text-lg text-gray-700 font-medium">
                  Déposez une image ici ou{" "}
                  <label className="text-yellow-600 font-semibold cursor-pointer hover:text-yellow-700 transition-colors">
                    choisissez un fichier
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
        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-gray-800 to-yellow-600 bg-clip-text text-transparent mb-8">
            Créer un Nouveau Blog
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Champ Titre */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-hover:text-yellow-600">
                  Titre
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
                    placeholder="Un titre accrocheur"
                    required
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <Heading className="w-5 h-5 text-yellow-500 transition-colors group-hover:text-yellow-600" />
                  </span>
                </div>
              </div>

              {/* Champ Sous TITRE */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-hover:text-yellow-600">
                  Sous Titre
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="sous_titre"
                    value={formData.sous_titre}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
                    placeholder="Mettez le sous titre ici"
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <Heading2 className="w-5 h-5 text-yellow-500 transition-colors group-hover:text-yellow-600" />
                  </span>
                </div>
              </div>
            </div>

            {/* Champ Contenu */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-hover:text-yellow-600">
                Contenu
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
                placeholder="Votre histoire commence ici..."
                rows="6"
                style={{ maxHeight: "180px" }}
              />
            </div>

            {/* Checkbox et Bouton */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center group">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={formData.enabled}
                  onChange={handleChange}
                  className="w-5 h-5 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 cursor-pointer transition-all duration-300"
                />
                <label className="ml-3 text-sm font-medium text-gray-700 group-hover:text-yellow-600 transition-colors">
                  Publier maintenant
                </label>
              </div>
              <button
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-gray-700 to-yellow-500 text-white py-3 px-8 rounded-xl font-semibold shadow-md hover:from-gray-800 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105"
              >
                Publier le Blog
              </button>
            </div>
          </form>
        </div>
      </div>

      
    </div>
  );
};

export default NewBlog;
