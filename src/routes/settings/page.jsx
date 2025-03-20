import { useState, useEffect } from "react";
import { Save, Info, Users, Award, Zap, PlusCircle, Trash2, User, Mail, Lock, Edit2, X, ToggleLeft, ToggleRight } from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [adminData, setAdminData] = useState({
    name: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "********",
    profil: "Administrateur",
    enabled: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...adminData });
  const [aboutData, setAboutData] = useState({ mission: "", community: "", values: "", impact: "" });
  const [loadingAbout, setLoadingAbout] = useState(true);
  const [carouselImages, setCarouselImages] = useState([]);
  const [loadingCarousel, setLoadingCarousel] = useState(true);
  const [newImageFile, setNewImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const API_URL = "http://localhost:5000";
  const MAX_IMAGES = 3;

  useEffect(() => {
    setTimeout(() => {
      setAboutData({ mission: "Exemple", community: "Exemple", values: "Exemple", impact: "Exemple" });
      setLoadingAbout(false);
    }, 1000);
    setTimeout(() => {
      setCarouselImages([
        { id: 1, url: "https://via.placeholder.com/300" },
        { id: 2, url: "https://via.placeholder.com/300" },
      ]);
      setLoadingCarousel(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleEnabled = () => {
    setFormData({ ...formData, enabled: !formData.enabled });
  };

  const handleSave = () => {
    setAdminData({ ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...adminData });
    setIsEditing(false);
  };

  const handleUpdateAbout = (e) => {
    e.preventDefault();
    console.log("Mise à jour des données À propos :", aboutData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (carouselImages.length >= MAX_IMAGES) {
      alert("Vous ne pouvez pas ajouter plus de 3 images.");
      return;
    }
    if (newImageFile) {
      const newImage = {
        id: Date.now(),
        url: URL.createObjectURL(newImageFile),
      };
      setCarouselImages([...carouselImages, newImage]);
      setNewImageFile(null);
      setPreviewImage(null);
    }
  };

  const handleDeleteImage = (id) => {
    setCarouselImages(carouselImages.filter((image) => image.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Paramètres</h1>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "profile" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-200"
            }`}
          >
            Profil
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "about" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-200"
            }`}
          >
            À propos
          </button>
          <button
            onClick={() => setActiveTab("carousel")}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "carousel" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-200"
            }`}
          >
            Carrousel
          </button>
        </div>

        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl shadow-md p-8 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profil Administrateur</h2>
            {!isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <User className="h-5 w-5 text-blue-500" />
                    <span>Nom</span>
                  </div>
                  <div>{adminData.name}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <User className="h-5 w-5 text-blue-500" />
                    <span>Prénom</span>
                  </div>
                  <div>{adminData.lastName}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <span>Email</span>
                  </div>
                  <div>{adminData.email}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Lock className="h-5 w-5 text-blue-500" />
                    <span>Mot de passe</span>
                  </div>
                  <div>{adminData.password}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    {adminData.enabled ? (
                      <ToggleRight className="h-5 w-5 text-green-500" />
                    ) : (
                      <ToggleLeft className="h-5 w-5 text-red-500" />
                    )}
                    <span>Statut</span>
                  </div>
                  <div>{adminData.enabled ? "Activé" : "Désactivé"}</div>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 mt-6"
                >
                  <Edit2 className="h-5 w-5" /> Modifier le profil
                </button>
              </div>
            ) : (
              <div className="mt-6 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Modifier le profil</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label-block text-sm font-medium text-gray-700 mb-2">Nom</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Entrez votre nom"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="label-block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Entrez votre prénom"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="label-block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Entrez votre email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      required
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="label-block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Entrez votre mot de passe"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <label className="text-sm font-medium text-gray-700">Statut activé</label>
                  <button
                    onClick={handleToggleEnabled}
                    className={`p-2 rounded-full transition-all ${
                      formData.enabled ? "bg-green-500" : "bg-red-500"
                    } text-white hover:scale-105`}
                  >
                    {formData.enabled ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                  </button>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
                  >
                    <Save className="h-5 w-5" /> Sauvegarder
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300"
                  >
                    <X className="h-5 w-5" /> Annuler
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "about" && (
          <div className="bg-white rounded-2xl shadow-md p-8 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">À propos</h2>
            {loadingAbout ? (
              <p className="text-gray-500">Chargement...</p>
            ) : (
              <form onSubmit={handleUpdateAbout} className="space-y-6">
                <div>
                  <label className="label-block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    Mission
                  </label>
                  <p className="text-sm text-gray-500 mb-2">Décrivez la mission de votre organisation en quelques phrases.</p>
                  <textarea
                    value={aboutData.mission}
                    onChange={(e) => setAboutData({ ...aboutData, mission: e.target.value })}
                    className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    rows="4"
                    placeholder="Entrez la mission ici..."
                  />
                </div>
                <div>
                  <label className="label-block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-500" />
                    Communauté
                  </label>
                  <p className="text-sm text-gray-500 mb-2">Parlez de votre communauté ou de vos membres.</p>
                  <textarea
                    value={aboutData.community}
                    onChange={(e) => setAboutData({ ...aboutData, community: e.target.value })}
                    className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    rows="4"
                    placeholder="Entrez la description de la communauté ici..."
                  />
                </div>
                <div>
                  <label className="label-block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Valeurs
                  </label>
                  <p className="text-sm text-gray-500 mb-2">Listez les valeurs qui guident votre organisation.</p>
                  <textarea
                    value={aboutData.values}
                    onChange={(e) => setAboutData({ ...aboutData, values: e.target.value })}
                    className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    rows="4"
                    placeholder="Entrez vos valeurs ici..."
                  />
                </div>
                <div>
                  <label className="label-block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-red-500" />
                    Impact
                  </label>
                  <p className="text-sm text-gray-500 mb-2">Décrivez l’impact de vos actions.</p>
                  <textarea
                    value={aboutData.impact}
                    onChange={(e) => setAboutData({ ...aboutData, impact: e.target.value })}
                    className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    rows="4"
                    placeholder="Entrez l’impact ici..."
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
                  >
                    <Save className="h-5 w-5" />
                    Mettre à jour
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab === "carousel" && (
          <div className="bg-white rounded-2xl shadow-md p-8 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Gestion du Carrousel</h2>
            {loadingCarousel ? (
              <p className="text-gray-500">Chargement des images...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {carouselImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt="Carrousel"
                      className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2 transition-all duration-300"
                      >
                        <Trash2 className="h-5 w-5" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-8">
              <h3 className="text-xl font-medium text-gray-700 mb-4">Ajouter une nouvelle image</h3>
              <form onSubmit={handleAddImage} className="space-y-4">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    required
                  />
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Prévisualisation"
                      className="w-32 h-32 object-cover rounded-lg mt-2"
                    />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={carouselImages.length >= MAX_IMAGES}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    carouselImages.length >= MAX_IMAGES
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <PlusCircle className="h-5 w-5" />
                  Ajouter au carrousel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;