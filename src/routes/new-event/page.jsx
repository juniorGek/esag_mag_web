import { useState } from "react";
import { Upload, X, Heading, Heading2 } from "lucide-react";
import DescriptionEditor from "../../components/DescriptionEditor";
import TarificationForm from "../../components/TarificationForm";
import { API_URL } from "../../../config/ApiUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewEvent = () => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titre: "",
    sous_titre: "",
    date: "",
    lieu: "",
    isPaid: false,
    tickets: [{ typeTicket: "", qte: "", price: "" }], // Liste dynamique avec un objet par ligne
    saleStartDate: "",
    saleEndDate: "",
    details: "",
    imageCover: null,
  });


  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (name === "isPayant") {
      setFormData({ ...formData, isPayant: value === "payant" });
    } else if (name.startsWith("ticketTypes")) {
      const [, field] = name.split(".");
      const updatedTickets = formData.ticketTypes.map((ticket, i) =>
        i === index ? { ...ticket, [field]: value } : ticket
      );
      setFormData({ ...formData, ticketTypes: updatedTickets });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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

  const resetFormData = () => {
    setFormData({
      imageCover: null,
      titre: "",
      sous_titre:"",
      details:"",
      tickets: [{ typeTicket: "", qte: "", price: "" }],
      isPaid:false,
      saleEndDate:'',
      saleStartDate:'',
      lieu:'',
      date:'',
    })
    setPreview(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const tickets = formData.tickets.map(ticket => {
        const qte = Number(ticket.qte);
        const price = Number(ticket.price);
        return {
          ...ticket,
          qte,
          price,
          available: qte, // Le champ "available" est égal à "qte"
        };
      });
      
      const formValues = new FormData();
      formValues.append("titre", formData.titre);
      formValues.append("sous_titre", formData.sous_titre);
      formValues.append("date", formData.date);
      formValues.append("lieu", formData.lieu);
      formValues.append("isPaid", formData.isPaid);
      if(formData.isPaid){
        formValues.append("tickets", JSON.stringify(tickets));
        formValues.append("saleStartDate", formData.saleStartDate);
        formValues.append("saleEndDate", formData.saleEndDate);
      }
      
      formValues.append("details", formData.details);
      formValues.append("image", formData.imageCover);

      const response = await fetch(`${API_URL}/createEvent`,{
        method: "POST",
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formValues,
      })
      const data = await response.json()
      if (response.status === 200) {
        toast.success(data.message)
        resetFormData()
      } else if (response.status === 400) {
        toast.warning(data.message)
      }else{
        toast.error("Erreur lors de la création de l'événement, verifier les champs et réessayer", {
          autoClose: 8000,
        });
        console.log(data)
      }
    } catch (error) {
      toast.error("Erreur lors de la création de l'événement, verifier les champs et réessayer", {
        autoClose: 8000,
      });
      console.log(error)
    }finally{
      setLoading(false)
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <ToastContainer position="top-right" />
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden transform transition-all hover:shadow-3xl">
        {/* Section Image */}
        <div className="relative w-full h-48 bg-gradient-to-r from-green-600 to-gray-800">
          <div
            className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-300 ${
              preview ? "bg-black/30" : "border-2 border-dashed border-white/60 hover:border-white"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {preview ? (
              <div className="relative w-full h-full group">
                <img
                  src={preview}
                  alt="Aperçu de l'événement"
                  className="w-full h-full object-cover rounded-t-3xl transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => {
                    setPreview(null);
                    setFormData({ ...formData, imageCover: null });
                  }}
                  className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 shadow-md hover:bg-green-100 transition-all duration-300 hover:scale-110"
                >
                  <X className="w-4 h-4 text-gray-700 hover:text-green-600" />
                </button>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <Upload className="w-10 h-10 mx-auto text-white animate-pulse" />
                <p className="text-white text-base font-medium">
                  Glissez ou{" "}
                  <label className="underline cursor-pointer hover:text-green-200 transition-colors">
                    téléchargez une image
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </p>
                <p className="text-xs text-white/70">JPEG, PNG (max 5Mo)</p>
              </div>
            )}
          </div>
        </div>

        {/* Section Formulaire */}
        <div className="p-6 sm:p-8 bg-white">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 bg-gradient-to-r from-green-600 to-gray-800 bg-clip-text text-transparent">
            Créer un nouvel événement
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations essentielles */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <label className="absolute top-[-1.25rem] left-3 px-1 text-xs font-medium text-gray-600 bg-white transition-all duration-300 group-focus-within:text-green-600">
                    Titre
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="titre"
                      value={formData.titre}
                      onChange={(e) => handleChange(e)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800 placeholder-gray-400"
                      placeholder="Nom de l'événement"
                      required
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Heading className="w-4 h-4 text-gray-500 group-focus-within:text-green-600 transition-colors" />
                    </span>
                  </div>
                </div>
                <div className="relative group">
                  <label className="absolute top-[-1.25rem] left-3 px-1 text-xs font-medium text-gray-600 bg-white transition-all duration-300 group-focus-within:text-green-600">
                    Sous-titre
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="sous_titre"
                      value={formData.sous_titre}
                      onChange={(e) => handleChange(e)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800 placeholder-gray-400"
                      placeholder="Accroche ou thème"
                      required
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Heading2 className="w-4 h-4 text-gray-500 group-focus-within:text-green-600 transition-colors" />
                    </span>
                  </div>
                </div>
                <div className="relative group">
                  <label className="absolute top-[-1.25rem] left-3 px-1 text-xs font-medium text-gray-600 bg-white transition-all duration-300 group-focus-within:text-green-600">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={(e) => handleChange(e)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800"
                      required
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Heading2 className="w-4 h-4 text-gray-500 group-focus-within:text-green-600 transition-colors" />
                    </span>
                  </div>
                </div>
                <div className="relative group">
                  <label className="absolute top-[-1.25rem] left-3 px-1 text-xs font-medium text-gray-600 bg-white transition-all duration-300 group-focus-within:text-green-600">
                    Lieu
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lieu"
                      value={formData.lieu}
                      onChange={(e) => handleChange(e)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800 placeholder-gray-400"
                      placeholder="Lieu de l'événement"
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Heading2 className="w-4 h-4 text-gray-500 group-focus-within:text-green-600 transition-colors" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarification */}
            <TarificationForm formData={formData} setFormData={setFormData} />

           {/* Section Description */}
           <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Description</h3>
              <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <DescriptionEditor
                  value={formData.details}
                  onChange={(html) =>
                    setFormData({ ...formData, details: html })
                  }
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className={`relative w-full md:w-1/3 bg-gradient-to-r from-green-500 to-gray-800 text-white py-3 px-6 rounded-xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform transition-all duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:from-green-600 hover:to-gray-900 hover:scale-105"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    En cours...
                  </div>
                ) : (
                  "Creer un evenement"
                )}
              </button>
            </div>

            {loading && (
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 animate-progress"></div>
              </div>
            )}

          </form>
        </div>
      </div>

    </div>
  );
};

export default NewEvent;