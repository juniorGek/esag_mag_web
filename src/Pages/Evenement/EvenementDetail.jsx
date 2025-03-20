import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Ticket,
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL, ImageApi } from "../../../config/ApiUrl";
import { formatDate } from "../../utils/formatDate";

const EvenementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [evenement, setEvenement] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDetailsEvenement = async () => {
    try {
      const response = await fetch(`${API_URL}/getEventById/${id}`);
      const data = await response.json();
      if (response.status === 200) {
        
        setEvenement(data.event);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailsEvenement();
  }, []);

 
 

  const  handleBuyTicket = (ticketId) => {
    navigate(`/evenement/acheter-ticket/${ticketId}`);
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <ToastContainer />
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <img
          src={`${ImageApi}/${evenement.imageCover}`}
          alt={evenement.titre}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <div className="container mx-auto text-white">
            <h1 className="text-5xl font-bold mb-6">{evenement.titre}</h1>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(evenement.date)}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5" />
                <span>{evenement.lieu}</span>
              </div>
              {/* <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-5 h-5" />
                <span>{evenement.time}</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: evenement.details }}
            />

            {/* Section Tickets */}
            <div className="mt-12">
              {evenement.Tickets && evenement.Tickets.length > 0 ? (
                <>
                  {/* Affichage des dates de vente */}
                  <div className="mb-4">
                    <p className="text-lg text-gray-700">
                      Vente du {formatDate(evenement.saleStartDate)} au{" "}
                      {formatDate(evenement.saleEndDate)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold">Tickets disponibles</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {evenement.Tickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-2/3">
                            <h4 className="text-xl font-semibold text-gray-800">
                              {ticket.typeTicket}
                            </h4>
                          </div>
                          <div className="text-right w-1/3">
                            <p className="text-2xl font-bold text-blue-600">
                              {ticket.price} FCFA
                            </p>
                            <p className="text-sm text-gray-500">
                              {ticket.available} restants
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleBuyTicket(ticket.id)}
                          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                          disabled={ticket.available === 0}
                        >
                          <Ticket className="w-5 h-5" />
                          <span>Acheter</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <h3 className="text-2xl font-bold">Evenement gratuit</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default EvenementDetail;
