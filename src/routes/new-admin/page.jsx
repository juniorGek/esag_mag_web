import { useState } from "react";
import { User, Mail, Lock } from "lucide-react"; // Import des icônes Lucide
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

  

  const handleSubmit = async(e) => {
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
      }else if (response.status === 400) {
        toast.error(data.message, { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Erreur lors de la création de l'administrateur", {
        autoClose: 3000,
      });
      console.log(error);
    }
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
                      name="Name"
                      value={formData.Name}
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
                      name="lastName"
                      value={formData.lastName}
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
        <ToastContainer position="top-right" />
      </div>
    </div>
  )
}

export default NewAdmin
