import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CreditCard, ArrowLeft } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../config/ApiUrl";
import { generateTicketPDFs } from "../utils/GeneratePdf";

const AcheterTicket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState("");

  const fetchTicket = async () => {
    try {
      const response = await fetch(`${API_URL}/ticketDetail/${ticketId}`);
      const data = await response.json();
      if (response.status === 200) {
        setTicket(data.ticket);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      toast.error("Veuillez sélectionner un mode de paiement");
      return;
    }
    if (!phoneNumber) {
      toast.error("Veuillez entrer votre numéro de téléphone");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/payTicket/${ticketId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          quantity,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
         await generateTicketPDFs(data.tickets, data.event);
        
        navigate(`/evenement/${data.event.id}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Type de ticket non trouvé
          </h2>
          <button
            onClick={() => navigate(`/evenement`)}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour à l&apos;événement</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <ToastContainer />
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(`/evenement`)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour à l&apos;événement</span>
        </button>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold mb-8">Acheter des tickets</h1>

            <div className="space-y-8">
              {/* Détails du ticket */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {ticket.typeTicket}
                </h2>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Prix unitaire</span>
                  <span className="text-xl font-bold text-blue-600">
                    {ticket.price} FCFA
                  </span>
                </div>
              </div>

              {/* Formulaire de paiement */}
              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantité
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[...Array(Math.min(ticket.available, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mode de paiement
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("mix-by-yas")}
                      className={`p-4 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors ${
                        paymentMethod === "mix-by-yas"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-500"
                      }`}
                    >
                      <img
                        src="/images/mix-by-yas.png"
                        alt="Mix By YAS"
                        className="h-12 w-auto"
                      />
                      <span className="text-sm font-medium">Mix By YAS</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("moov-flooz")}
                      className={`p-4 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors ${
                        paymentMethod === "moov-flooz"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-500"
                      }`}
                    >
                      <img
                        src="/images/moov-flooz.png"
                        alt="Moov Flooz"
                        className="h-12 w-auto"
                      />
                      <span className="text-sm font-medium">Moov Flooz</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Ex: 97000000"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span>Sous-total</span>
                    <span>{ticket.price * quantity} FCFA</span>
                  </div>

                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{ticket.price * quantity} FCFA</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Payer maintenant</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcheterTicket;
