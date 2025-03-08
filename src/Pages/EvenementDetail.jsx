import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Ticket, X, CreditCard, Eye, Download } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { evenements } from '../data';

const EvenementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);
  const [purchasedTickets, setPurchasedTickets] = useState([]);
  const [showTicketsModal, setShowTicketsModal] = useState(false);
  const [evenement, setEvenement] = useState(null);

  useEffect(() => {
    // Récupérer l'événement depuis les données
    const event = evenements.find(e => e.id === parseInt(id));
    if (event) {
      // Ajouter les tickets pour la démo (à remplacer par les vrais tickets plus tard)
      const eventWithTickets = {
        ...event,
        Tickets: [
          {
            id: 1,
            typeTicket: "VIP",
            description: "Accès VIP avec cocktail et place réservée",
            prix: 25000,
            available: 20
          },
          {
            id: 2,
            typeTicket: "Standard",
            description: "Place standard",
            prix: 15000,
            available: 100
          }
        ]
      };
      setEvenement(eventWithTickets);
    } else {
      toast.error("Événement non trouvé");
      navigate('/evenements');
    }
  }, [id, navigate]);

  const handleTicketPurchase = () => {
    if (!selectedTicketType) {
      toast.error("Veuillez sélectionner un type de ticket");
      return;
    }

    // Simuler l'achat de tickets
    const ticketNumbers = Array.from({ length: quantity }, (_, i) => ({
      number: `TICKET-${selectedTicketType.id}-${Date.now()}-${i + 1}`,
      type: selectedTicketType.typeTicket
    }));

    setPurchasedTickets(ticketNumbers);
    setShowTicketModal(false);
    setShowPurchaseSuccess(true);
    toast.success("Achat réussi !");
  };

  const downloadTicket = (ticket) => {
    // Simuler le téléchargement
    toast.info(`Téléchargement du ticket ${ticket.number}`);
  };

  const handleBuyTicket = (ticketId) => {
    navigate(`/evenement/${id}/acheter-ticket/${ticketId}`);
  };

  const handleViewTickets = () => {
    navigate(`/evenement/${id}/mes-tickets`);
  };

  if (!evenement) {
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
          src={evenement.image}
          alt={evenement.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <div className="container mx-auto text-white">
            <h1 className="text-5xl font-bold mb-6">{evenement.title}</h1>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5" />
                <span>{evenement.date}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5" />
                <span>{evenement.location}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-5 h-5" />
                <span>{evenement.time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                {evenement.description}
              </p>
            </div>

            {/* Section Tickets */}
            <div className="mt-12">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">Tickets disponibles</h3>
                <button
                  onClick={handleViewTickets}
                  className="flex items-center space-x-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  <span>Voir mes tickets</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {evenement.Tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-2/3"> {/* Largeur fixe pour le conteneur de texte */}
                        <h4 className="text-xl font-semibold text-gray-800">{ticket.typeTicket}</h4>
                        <p className="text-gray-600">{ticket.description}</p>
                      </div>
                      <div className="text-right w-1/3"> {/* Largeur fixe pour le conteneur de prix */}
                        <p className="text-2xl font-bold text-blue-600">{ticket.prix} FCFA</p>
                        <p className="text-sm text-gray-500">{ticket.available} restants</p>
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
            </div>

          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {/* Modal d'achat de tickets */}
        {showTicketModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Acheter des tickets</h3>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">{selectedTicketType?.typeTicket}</h4>
                  <p className="text-gray-600">{selectedTicketType?.description}</p>
                  <p className="text-xl font-bold text-blue-600 mt-2">{selectedTicketType?.prix} FCFA</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantité
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[...Array(Math.min(selectedTicketType?.available || 0, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span>Prix unitaire</span>
                    <span>{selectedTicketType?.prix} FCFA</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{(selectedTicketType?.prix || 0) * quantity} FCFA</span>
                  </div>
                </div>

                <button
                  onClick={handleTicketPurchase}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Payer maintenant</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal de succès d'achat */}
        {showPurchaseSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Achat réussi !</h3>
                <p className="text-gray-600 mb-6">
                  Vos tickets ont été générés avec succès. Vous pouvez les télécharger maintenant.
                </p>
                <div className="space-y-4">
                  {purchasedTickets.map((ticket, index) => (
                    <button
                      key={index}
                      onClick={() => downloadTicket(ticket)}
                      className="w-full bg-blue-50 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Download className="w-5 h-5" />
                      <span>Télécharger le ticket {index + 1}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowPurchaseSuccess(false)}
                  className="mt-6 text-gray-500 hover:text-gray-700"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal de visualisation des tickets */}
        {showTicketsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Mes tickets</h3>
                <button
                  onClick={() => setShowTicketsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {purchasedTickets.map((ticket, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">Ticket {index + 1}</span>
                      <p className="text-sm text-gray-500">{ticket.type}</p>
                      <p className="text-xs text-gray-400">{ticket.number}</p>
                    </div>
                    <button
                      onClick={() => downloadTicket(ticket)}
                      className="text-blue-600 hover:text-blue-700 flex items-center space-x-2"
                    >
                      <Download className="w-5 h-5" />
                      <span>Télécharger</span>
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EvenementDetail; 