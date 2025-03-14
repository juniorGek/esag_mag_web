import { useState, useEffect } from "react";
import { Save, Info, Users, Award, Zap, PlusCircle, Trash2 } from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("about");

  // États pour la section "À propos"
  const [aboutData, setAboutData] = useState({ mission: "", community: "", values: "", impact: "" });
  const [loadingAbout, setLoadingAbout] = useState(true);

  // États pour la section "Carrousel"
  const [carouselImages, setCarouselImages] = useState([]);
  const [loadingCarousel, setLoadingCarousel] = useState(true);

  // Simulons une URL d'API (à adapter à votre backend)
  const API_URL = "http://localhost:5000";

  // Charger les données au montage (simulation)
  useEffect(() => {
    // Simulation pour "À propos"
    setTimeout(() => {
      setAboutData({ mission: "Exemple", community: "Exemple", values: "Exemple", impact: "Exemple" });
      setLoadingAbout(false);
    }, 1000);

    // Simulation pour "Carrousel"
    setTimeout(() => {
      setCarouselImages([
        { id: 1, url: "https://via.placeholder.com/300", title: "Image 1" },
        { id: 2, url: "https://via.placeholder.com/300", title: "Image 2" },
      ]);
      setLoadingCarousel(false);
    }, 1000);
  }, []);

  // Mettre à jour les données "À propos" (simulation)
  const handleUpdateAbout = (e) => {
    e.preventDefault();
    console.log("Mise à jour des données À propos :", aboutData);
  };

  // Ajouter une image au carrousel (simulation)
  const handleAddImage = (e) => {
    e.preventDefault();
    const newImage = {
      id: Date.now(), // ID temporaire
      url: e.target.url.value,
      title: e.target.title.value,
    };
    setCarouselImages([...carouselImages, newImage]);
    e.target.reset();
  };

  // Supprimer une image du carrousel (simulation)
  const handleDeleteImage = (id) => {
    setCarouselImages(carouselImages.filter((image) => image.id !== id));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Paramètres</h1>

      {/* Onglets */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("about")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "about" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-200"
          }`}
        >
          À propos
        </button>
        <button
          onClick={() => setActiveTab("carousel")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "carousel" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-200"
          }`}
        >
          Carrousel
        </button>
      </div>

      {/* Section "À propos" */}
      {activeTab === "about" && (
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Modifier les informations &quot;À propos&quot;</h2>
          {loadingAbout ? (
            <p className="text-gray-500">Chargement...</p>
          ) : (
            <form onSubmit={handleUpdateAbout} className="space-y-6">
              {["mission", "community", "values", "impact"].map((field) => (
                <div key={field} className="relative">
                  <label className="block text-sm font-medium text-gray-700 capitalize mb-2 flex items-center gap-2">
                    {field === "mission" && <Info className="h-5 w-5 text-blue-500" />}
                    {field === "community" && <Users className="h-5 w-5 text-green-500" />}
                    {field === "values" && <Award className="h-5 w-5 text-yellow-500" />}
                    {field === "impact" && <Zap className="h-5 w-5 text-red-500" />}
                    {field}
                  </label>
                  <textarea
                    value={aboutData[field]}
                    onChange={(e) => setAboutData({ ...aboutData, [field]: e.target.value })}
                    className="w-full p-4 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:shadow-md focus:outline-none text-base transition-all duration-300"
                    rows="4"
                    placeholder={`Entrez la description pour ${field} ici...`}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                <Save className="h-5 w-5" />
                Mettre à jour
              </button>
            </form>
          )}
        </section>
      )}

      {/* Section "Carrousel" */}
      {activeTab === "carousel" && (
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gestion du Carrousel</h2>
          {loadingCarousel ? (
            <p className="text-gray-500">Chargement des images...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {carouselImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
                    >
                      <Trash2 className="h-5 w-5" />
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Formulaire pour ajouter une image */}
          <div className="mt-8">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Ajouter une nouvelle image</h3>
            <form onSubmit={handleAddImage} className="space-y-4">
              <input
                type="text"
                name="url"
                placeholder="URL de l'image"
                className="w-full p-4 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:shadow-md focus:outline-none text-base transition-all duration-300"
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Titre de l'image"
                className="w-full p-4 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:shadow-md focus:outline-none text-base transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
              >
                <PlusCircle className="h-5 w-5" />
                Ajouter au carrousel
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};

export default SettingsPage;