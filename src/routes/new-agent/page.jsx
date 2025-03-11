import { useState, useEffect } from "react";
import { API_URL } from "../../../config/ApiUrl"; // Assurez-vous que cette URL est correcte
import {
  User,
  Calendar,
  Key,
  PlusCircle,
  XCircle,
  Loader2,
  Search,
} from "lucide-react";
import { toast,ToastContainer } from "react-toastify";

const NewAgent = () => {
  const [formData, setFormData] = useState({
    name: "",
    evenementId: "",
    codeAgent: "",
  });
  const [events, setEvents] = useState([]); // Liste par défaut
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Récupérer les événements depuis l'API (optionnel)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/eventListe`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.status === 200) {
          setEvents(data.event);
          setFilteredEvents(data.event);
        }
      } catch (error) {
        console.log("Erreur lors de la récupération des événements, utilisation de la liste par défaut:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filtrer les événements en fonction de la recherche
  useEffect(() => {
    const filtered = events.filter((event) =>
      event.titre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  // Gérer les changements dans les champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Générer un code agent aléatoire de 6 caractères
  const generateCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setFormData({ ...formData, codeAgent: code });
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/createAgent/${formData.evenementId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        
        setFormData({ nomAgent: "", evenementId: "", codeAgent: "" });
        setSearchTerm("");
        setIsDropdownOpen(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("erreur lors de la création de l'agent");
      console.log("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  // Gérer l'ouverture/fermeture du dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Sélectionner un événement
  const selectEvent = (eventId, eventNom) => {
    setFormData({ ...formData, evenementId: eventId });
    setSearchTerm(eventNom);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-5 border-b border-blue-900">
          <h2 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
            <User className="w-6 h-6" /> Création d&apos;un nouvel agent
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nom de l'agent */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" /> Nom de l&apos;agent
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full py-2.5 px-4 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
              placeholder="Entrez le nom de l'agent"
              required
            />
          </div>

          {/* Événement de l'agent avec recherche intégrée */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" /> Événement
            </label>
            <div className="relative">
              <div
                className="w-full py-2.5 px-4 border border-gray-300 rounded-lg bg-white text-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 flex items-center justify-between"
                onClick={toggleDropdown}
              >
                <span>{searchTerm || "Sélectionnez un événement"}</span>
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-2 border-b border-gray-200">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-2 px-3 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        placeholder="Rechercher..."
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Search className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </div>
                  <ul className="py-1">
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => (
                        <li
                          key={event.id}
                          className="px-4 py-2 text-gray-900 hover:bg-blue-100 cursor-pointer transition-colors duration-200"
                          onClick={() => selectEvent(event.id, event.titre)}
                        >
                          {event.titre}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-500">Aucun événement trouvé</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Code agent */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Key className="w-5 h-5 text-blue-600" /> Code agent
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                name="codeAgent"
                value={formData.codeAgent}
                onChange={handleChange}
                className="w-full py-2.5 px-4 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                placeholder="Code de 6 caractères"
                maxLength={6}
                readOnly
                required
              />
              <button
                type="button"
                onClick={generateCode}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 flex items-center gap-2"
              >
                <Key className="w-5 h-5" /> Générer
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-5 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 flex items-center gap-2"
            >
              <XCircle className="w-5 h-5" /> Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 flex items-center gap-2 disabled:bg-green-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <PlusCircle className="w-5 h-5" />
              )}
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAgent;