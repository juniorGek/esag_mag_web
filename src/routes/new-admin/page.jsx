import { useState } from "react";
import { User, Mail, Lock, UploadCloud } from "lucide-react"; // Import des icônes Lucide
import draw from "../../assets/register.svg";

const NewAdmin = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    photo: null,
    password: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
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
    <div className="min-w-screen min-h-screen shadow-xl flex items-center justify-center px-5 py-5">
      <div className="bg-gray-200 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: "900px" }}>
        <div className="md:flex w-full">
          {/* Section droite avec le formulaire */}
          <div className="w-full md:w-1/2 py-6 px-5 md:px-8"> {/* Réduction du padding */}
            <div className="text-center mb-6"> {/* Réduction de la marge */}
              <h1 className="font-bold text-2xl text-gray-900">AJOUTER UN ADMINISTRATEUR</h1> {/* Réduction de la taille du texte */}
              <p className="text-sm">Entrez les informations pour ajouter un administrateur</p> {/* Réduction de la taille du texte */}
            </div>
            <form onSubmit={handleSubmit}>
              {/* Champ Photo avec Drag and Drop */}
              <div className="mb-4"> {/* Réduction de la marge */}
                <label className="text-xs font-semibold px-1">Photo</label>
                <div
                  className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Aperçu"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <UploadCloud className="w-6 h-6 text-gray-400 mx-auto" /> {/* Icône Lucide */}
                      <p className="text-gray-400 text-sm mt-2"> {/* Réduction de la taille du texte */}
                        Glissez-déposez une image ici ou{" "}
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
                    </div>
                  )}
                </div>
              </div>

              {/* Champs Nom et Prénom sur la même ligne */}
              <div className="flex -mx-3">
                <div className="w-1/2 px-3 mb-4"> {/* Réduction de la marge */}
                  <label className="text-xs font-semibold px-1">Nom</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <User className="text-gray-400 w-5 h-5" /> {/* Icône Lucide */}
                    </div>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Entrer le nom"
                      required
                    />
                  </div>
                </div>
                <div className="w-1/2 px-3 mb-4"> {/* Réduction de la marge */}
                  <label className="text-xs font-semibold px-1">Prénom</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <User className="text-gray-400 w-5 h-5" /> {/* Icône Lucide */}
                    </div>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Entrer le prénom"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Champ Email */}
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-4"> {/* Réduction de la marge */}
                  <label className="text-xs font-semibold px-1">Email</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <Mail className="text-gray-400 w-5 h-5" /> {/* Icône Lucide */}
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Entrer l'email"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Champ Mot de passe */}
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-8"> {/* Réduction de la marge */}
                  <label className="text-xs font-semibold px-1">Mot de passe</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <Lock className="text-gray-400 w-5 h-5" /> {/* Icône Lucide */}
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="************"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Bouton de soumission */}
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-4"> {/* Réduction de la marge */}
                  <button
                    type="submit"
                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold" 
                  >
                    AJOUTER
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* Section gauche avec illustration */}
          <div className="hidden md:block w-1/2 bg-gray-200 py-6 px-8"> {/* Réduction du padding */}
            <img
              src={draw}
              alt="Illustration"
              className="w-full h-full items-center justify-center flex"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewAdmin
