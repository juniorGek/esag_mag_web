import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Ticket } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { evenements } from '../data';
import 'react-toastify/dist/ReactToastify.css';

const MesTickets = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [evenement, setEvenement] = useState(null);

  useEffect(() => {
    // Récupérer l'événement
    const event = evenements.find(e => e.id === parseInt(id));
    if (event) {
      setEvenement(event);
    }

    // Récupérer les tickets du localStorage
    const storedTickets = localStorage.getItem('purchasedTickets');
    if (storedTickets) {
      const allTickets = JSON.parse(storedTickets);
      // Filtrer les tickets pour cet événement spécifique
      const eventTickets = allTickets.filter(ticket => ticket.eventId === parseInt(id));
      setTickets(eventTickets);
    }
  }, [id]);

  const handleDownload = (ticket) => {
    // Simuler le téléchargement
    toast.info(`Téléchargement du ticket ${ticket.number}`);
  };

  if (!evenement) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <ToastContainer />
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(`/evenement/${id}`)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour à l'événement</span>
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Mes tickets</h1>
            <div className="text-gray-600">
              {tickets.length} ticket{tickets.length !== 1 ? 's' : ''} pour {evenement.title}
            </div>
          </div>

          {tickets.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="mb-4">
                <Ticket className="w-12 h-12 text-gray-400 mx-auto" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Aucun ticket acheté
              </h2>
              <p className="text-gray-500 mb-4">
                Vous n'avez pas encore acheté de tickets pour cet événement.
              </p>
              <button
                onClick={() => navigate(`/evenement/${id}`)}
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Ticket className="w-5 h-5" />
                <span>Acheter des tickets</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {tickets.map((ticket) => (
                <div
                  key={ticket.number}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{evenement.title}</h2>
                        <div className="space-y-2">
                          <p className="text-gray-600">
                            <span className="font-medium">Date:</span> {evenement.date} à {evenement.time}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Lieu:</span> {evenement.location}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Type:</span> {ticket.type}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Numéro:</span> {ticket.number}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full inline-flex items-center space-x-1">
                          <Ticket className="w-4 h-4" />
                          <span>{ticket.prix} FCFA</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => handleDownload(ticket)}
                        className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        <span>Télécharger</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MesTickets; 