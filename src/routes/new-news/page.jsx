import { useState } from "react";
import { Upload, X, Heading, Heading2 } from "lucide-react";
import { API_URL } from "../../../config/endpoint";

const NewNews = () => {
  const [formData, setFormData] = useState({
    titre: "",
    sous_titre: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formValues = new FormData();
    formValues.append("titre", formData.titre);
    formValues.append("description", formData.description);
    formValues.append("sous_titre", formData.sous_titre);
    formValues.append("image", formData.imageCover);
    formValues.append("enabled", formData.enabled);

    try {
      const response = await fetch(`${API_URL}/createActualite`, {
        method: "POST",
        body: formValues,
      });

      if (response.ok) {
        console.log("Actualité créée avec succès");
        // Réinitialiser le formulaire après un envoi réussi
        setFormData({
          titre: "",
          sous_titre: "",
          description: "",
          imageCover: null,
          enabled: false,
        });
        setPreview(null);
      } else {
        console.error("Erreur lors de la création de l'actualité");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
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
                    <Heading className="w-5 h-5 text-gray-400" />
                  </span>
                </div>
              </div>

              {/* Champ Sous-titre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <Heading2 className="w-5 h-5 text-gray-400" />
                  </span>
                </div>
              </div>

              {/* Champ Activé/Désactivé */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={formData.enabled}
                  onChange={handleChange}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Activer cette actualité
                </label>
              </div>

              {/* Bouton de soumission */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Ajouter l actualité
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewNews;