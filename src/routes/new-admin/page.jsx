import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import draw from "../../assets/register.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../config/ApiUrl";

const NewAdmin = () => {
  const [formData, setFormData] = useState({
    Name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetFormData = () => {
    setFormData({
      Name: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/createAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message, { autoClose: 3000 });
        resetFormData();
      } else if (response.status === 400) {
        toast.error(data.message, { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Erreur lors de la création de l’administrateur", {
        autoClose: 3000,
      });
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Section gauche : Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-indigo-50 items-center justify-center p-8">
          <img
            src={draw}
            alt="Illustration"
            className="w-full max-w-sm object-contain"
          />
        </div>

        {/* Section droite : Formulaire */}
        <div className="w-full md:w-1/2 p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Ajouter un Administrateur
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Remplissez les informations ci-dessous
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Champs Nom et Prénom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="w-5 h-5 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Entrer le nom"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="w-5 h-5 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Entrer le prénom"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Champ Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-900 placeholder-gray-400"
                  placeholder="Entrer l’email"
                  required
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="w-5 h-5 text-gray-400" />
                </span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-900 placeholder-gray-400"
                  placeholder="********"
                  required
                />
              </div>
            </div>

            {/* Bouton de soumission */}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 transition-all"
              >
                Ajouter l’Administrateur
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default NewAdmin;