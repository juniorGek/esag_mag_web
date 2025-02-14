import { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données soumises:", formData);
    // Ajouter ici la logique pour envoyer les données au serveur
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg dark:bg-slate-900">
      <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-slate-50">
        Ajouter un Administrateur
      </h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* Champ Nom */}
        <div>
          <label className="block text-slate-900 dark:text-slate-50">Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-800 dark:text-slate-50 dark:border-slate-700"
            placeholder="Entrer le nom"
          />
        </div>

        {/* Champ Prénom */}
        <div>
          <label className="block text-slate-900 dark:text-slate-50">Prénom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-800 dark:text-slate-50 dark:border-slate-700"
            placeholder="Entrer le prénom"
          />
        </div>

        {/* Champ Email */}
        <div>
          <label className="block text-slate-900 dark:text-slate-50">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-800 dark:text-slate-50 dark:border-slate-700"
            placeholder="Entrer l'email"
          />
        </div>

        {/* Champ Photo */}
        <div>
          <label className="block text-slate-900 dark:text-slate-50">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-800 dark:text-slate-50 dark:border-slate-700"
          />
          {preview && (
            <img
              src={preview}
              alt="Aperçu"
              className="mt-2 w-20 h-20 rounded-full object-cover border border-gray-300 dark:border-slate-700"
            />
          )}
        </div>

        {/* Champ Mot de passe */}
        <div>
          <label className="block text-slate-900 dark:text-slate-50">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-800 dark:text-slate-50 dark:border-slate-700"
            placeholder="Entrer le mot de passe"
          />
        </div>

        {/* Bouton Soumettre */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default NewAdmin;
