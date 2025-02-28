import { useState } from "react";
import { Upload, X } from "lucide-react";

const NewBlog = () => {
  const [formData, setFormData] = useState({
    titre: "",
    sous_titre: "",
    description: "",
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
    // Ajouter ici la logique pour envoyer les données au serveur
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-10">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl p-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Ajouter un Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Colonne de gauche pour l'upload (plus étroite) */}
          <div className="md:col-span-1">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Aperçu de l'image"
                    className="w-full h-64 object-cover rounded-lg"
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
                <div>
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
                        required
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Formats supportés : JPEG, PNG,JPG
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Colonne de droite pour le formulaire (occupant 2/3 de la largeur) */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Entrez le titre"
                      required
                    />
                    
                  </div>
                </div>

                {/* Champ Auteur */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sous titre
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="sous_titre"
                      value={formData.auteur}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Entrez l'auteur"
                    />
                    
                  </div>
                </div>
              </div>

              {/* Champ Description (plus d'espace et en pleine largeur) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Entrez la description"
                  rows="8"
                />
              </div>

              {/* Champ Activer/Desactiver */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={formData.enabled}
                  onChange={handleChange}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Activer ce blog
                </label>
              </div>

              {/* Bouton de soumission */}
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-3 px-6 rounded-xl hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Ajouter le blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
