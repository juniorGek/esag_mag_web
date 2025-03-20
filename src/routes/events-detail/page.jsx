import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL, ImageApi } from "../../../config/ApiUrl";
import { formatDate } from "../../utils/formatDate";
import { ArrowLeft, Trash, ToggleLeft, ToggleRight, PencilLine } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminEventsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState("");
  const [tickets, setTickets] = useState([]); // Ajout des tickets
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchEventDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Veuillez vous reconnecter");
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/eventDetails/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setEvent(data.event);
        if (data.event.isPaid && data.event.Tickets) {
          setTickets(data.event.Tickets); // Récupérer les tickets si fournis par l'API
        }
      } else {
        toast.error("Erreur lors du chargement de l'événement");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/deleteEvent/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message || "Événement supprimé avec succès");
        setTimeout(() => navigate("/admin/events"), 2000);
      } else {
        toast.error(data.message || "Erreur lors de la suppression");
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression");
      console.log(error);
    }
    setIsDeleteModalOpen(false);
  };

  const toggleStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/toggleEventStatus/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setEvent({ ...event, enabled: !event.enabled });
        toast.success(data.message || "Statut mis à jour");
      } else {
        toast.error(data.message || "Erreur lors du changement de statut");
      }
    } catch (error) {
      toast.error("Erreur lors du changement de statut");
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!event) {
    return <div className="text-center bg-red-900 py-12">Aucun événement trouvé</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        {/* Barre d'actions administratives */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/events")}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Retour à la liste</span>
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleStatus}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                event.enabled
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
            >
              {event.enabled ? (
                <>
                  <ToggleRight size={20} />
                  <span>Activé</span>
                </>
              ) : (
                <>
                  <ToggleLeft size={20} />
                  <span>Désactivé</span>
                </>
              )}
            </button>
            <button
              onClick={() => navigate(`/admin/events/edit/${id}`)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <PencilLine size={20} />
              <span>Modifier</span>
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <Trash size={20} />
              <span>Supprimer</span>
            </button>
          </div>
        </div>

        {/* Contenu de l'événement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {event.imageCover && (
            <div className="relative h-[400px] w-full">
              <img
                src={`${ImageApi}/${event.imageCover}`}
                alt={event.titre}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h1 className="text-4xl font-bold mb-2">{event.titre}</h1>
                {event.sous_titre && (
                  <h2 className="text-xl font-semibold mb-4">{event.sous_titre}</h2>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Date : {formatDate(event.date)}</p>
                    <p className="text-sm opacity-90">Lieu : {event.lieu}</p>
                    <p className="text-sm opacity-90">
                      Type : {event.isPaid ? "Payant" : "Gratuit"}
                    </p>
                    {event.isPaid && (
                      <>
                        <p className="text-sm opacity-90">
                          Début des ventes : {event.saleStartDate ? formatDate(event.saleStartDate) : "Non défini"}
                        </p>
                        <p className="text-sm opacity-90">
                          Fin des ventes : {event.saleEndDate ? formatDate(event.saleEndDate) : "Non défini"}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">
                      Créé le : {formatDate(event.createdAt)}
                    </p>
                    <p className="text-sm opacity-90">
                      Dernière modification : {formatDate(event.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="p-8">
            {/* Détails de l'événement */}
            <div
              className="prose prose-lg max-w-none dark:prose-invert mb-6"
              dangerouslySetInnerHTML={{ __html: event.details }}
            />

            {/* Affichage des tickets si l'événement est payant */}
            {event.isPaid && tickets.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-50 mb-4">
                  Billets associés
                </h3>
                <div className="grid gap-4">
                  {tickets.map((ticket, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-100 dark:bg-slate-700 rounded-lg shadow-sm"
                    >
                      <p className="text-gray-900 dark:text-slate-50">
                        <strong>Type :</strong> {ticket.type || "Standard"}
                      </p>
                      <p className="text-gray-900 dark:text-slate-50">
                        <strong>Prix :</strong> {ticket.price || "N/A"} €
                      </p>
                      <p className="text-gray-900 dark:text-slate-50">
                        <strong>Quantité :</strong> {ticket.quantity || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modale de confirmation de suppression */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Confirmer la suppression
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventsDetails;