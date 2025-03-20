import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { API_URL, ImageApi } from "../../config/ApiUrl";
import { formatDate } from "../utils/formatDate";
import { UserCircle, UserX, Send, MapPin } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Variants pour les animations
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const Home = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [dernierAcu, setDernierAcu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecentEvent, setLoadingRecentEvent] = useState(false);
  const [event, setEvent] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [suggestion, setSuggestion] = useState({
    nom: "",
    email: "",
    object: "",
    categorie: "general",
    message: "",
    type: "public",
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuggestion({ ...suggestion, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formValues = {
        nom: isAnonymous ? "" : suggestion.nom,
        email: isAnonymous ? "" : suggestion.email,
        object: suggestion.object,
        categorie: suggestion.categorie,
        message: suggestion.message,
        type: isAnonymous ? "anonyme" : "public",
      };

      const response = await fetch(`${API_URL}/createSuggestion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Suggestion envoyée avec succès", { autoClose: 3000 });
        setSuggestion({
          nom: "",
          email: "",
          object: "",
          categorie: "general",
          message: "",
          type: "public",
        });
        setIsAnonymous(true);
      } else {
        const errorMessage = data.errors ? data.errors.map(err => err.message).join(", ") : "Erreur lors de l'envoi";
        toast.error(errorMessage, { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la suggestion", { autoClose: 3000 });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEvent = (eventData) => {
    window.location.href = `/evenement/${eventData.id}`;
  };

  const fetchDernierActu = async () => {
    try {
      const response = await fetch(`${API_URL}/listeDernierActu`);
      const data = await response.json();
      setDernierAcu(data.dernierActu || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvent = async () => {
    try {
      const response = await fetch(`${API_URL}/getRecentEvents`);
      const data = await response.json();
      setEvent(data.events || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRecentEvent(false);
    }
  };

  useEffect(() => {
    fetchDernierActu();
    fetchEvent();
  }, []);

  const heroSlides = [
    {
      title: "Bienvenue sur ESAG MAG",
      description: "Votre plateforme interactive pour rester connecté avec la vie de l'école et participer activement à la communauté ESAG-nde.",
      link: "/actualites",
      linkText: "Découvrir les actualités",
      image: "/images/1.jpg",
    },
    {
      title: "Participez aux événements",
      description: "Ne manquez aucun événement important de l'école, inscrivez-vous dès maintenant !",
      link: "/evenements",
      linkText: "Voir les événements",
      image: "/images/2.jpg",
    },
    {
      title: "Exprimez-vous",
      description: "Donnez votre avis à travers nos sondages et contribuez à l'amélioration de la communauté.",
      link: "/sondages",
      linkText: "Participer aux sondages",
      image: "/images/2.jpg",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white">
      {/* Carousel Section */}
      <section className="relative w-full">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={{ enabled: false }}
          spaceBetween={0}
          slidesPerView={1}
          breakpoints={{
            0: { navigation: { enabled: false }, pagination: { enabled: true } },
            640: { navigation: { enabled: true } },
            1024: { navigation: { enabled: true } },
          }}
          className="w-full h-[300px] sm:h-[400px] lg:h-[600px]"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index} className="relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover brightness-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4">
                  {slide.title}
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl mb-3 sm:mb-4 lg:mb-6">
                  {slide.description}
                </p>
                <Link
                  to={slide.link}
                  className="bg-white text-indigo-600 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full font-semibold hover:bg-indigo-100 transition-all text-sm md:text-base shadow-md"
                >
                  {slide.linkText}
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Actualités Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-900 mb-6 sm:mb-8 md:mb-10 text-center tracking-tight">
            Dernières Actualités
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-xl animate-pulse aspect-square" />
              ))}
            </div>
          ) : dernierAcu.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-6 sm:p-8 shadow-sm text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Aucune actualité disponible</h3>
              <p className="text-sm sm:text-base text-gray-500">Revenez bientôt pour découvrir les dernières nouvelles !</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {dernierAcu.map((news) => (
                <Link
                  key={news.id}
                  to={`/actualite/${news.id}`}
                  className="group bg-white rounded-xl shadow-md overflow-hidden aspect-square flex flex-col transition-transform duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="h-2/3 relative">
                    <img
                      src={`${ImageApi}/${news.imageCover}`}
                      alt={news.titre}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs sm:text-sm px-2 py-1 rounded-full shadow-sm">
                      {formatDate(news.createdAt)}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">
                        {news.titre}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{news.sous_titre}</p>
                    </div>
                    <div className="mt-3">
                      <span className="inline-block text-indigo-600 group-hover:text-indigo-800 font-medium text-sm sm:text-base transition-colors">
                        Lire plus →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Événements Section améliorée */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 to-indigo-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-900 mb-6 sm:mb-8 md:mb-10 text-center tracking-tight">
            Événements à venir
          </h2>
          {loadingRecentEvent ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 sm:h-10 w-8 sm:w-10 border-t-2 border-indigo-600"></div>
            </div>
          ) : event.length === 0 ? (
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Aucun événement disponible</h3>
              <p className="text-sm sm:text-base text-gray-500">Restez à l’écoute pour les prochains événements !</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {event.map((event, index) => (
                  <motion.div
                    key={event.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }} // Délai progressif pour chaque carte
                    className="group bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-xl hover:-translate-y-2"
                  >
                    <div className="relative h-48 sm:h-56">
                      <img
                        src={`${ImageApi}/${event.imageCover}`}
                        alt={event.titre}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-75 group-hover:opacity-50 transition-opacity"></div>
                      <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs sm:text-sm px-2 py-1 rounded-full shadow-sm">
                        {formatDate(event.date)}
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">
                        {event.titre}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm mb-3">
                        <MapPin className="w-4 h-4 text-indigo-600" />
                        <span className="line-clamp-1">{event.lieu}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2">{event.sous_titre}</p>
                      <button
                        onClick={() => handleEvent(event)}
                        className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-indigo-700 transition-colors duration-300 shadow-md flex items-center justify-center gap-2"
                      >
                        Participer
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 sm:mt-8 text-center">
                <Link
                  to="/evenements"
                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm sm:text-base transition-colors"
                >
                  Voir tous les événements
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        className="py-12 sm:py-16 bg-indigo-700 text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-50"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 text-center tracking-tight">
            Restez informé
          </h2>
          <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-center max-w-xl sm:max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir les dernières actualités et événements de l’ESAG-nde directement dans votre boîte mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md sm:max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 p-2 sm:p-3 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-indigo-300 shadow-md text-sm sm:text-base"
            />
            <button
              onClick={handleSubscribe}
              className="bg-white text-indigo-700 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-indigo-100 transition-colors duration-300 shadow-md text-sm sm:text-base"
            >
              S’inscrire
            </button>
          </div>
          {isSubscribed && (
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-center">Merci pour votre inscription !</p>
          )}
        </div>
      </motion.section>

      {/* Suggestions Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-900 mb-6 sm:mb-8 md:mb-10 text-center tracking-tight">
            Partagez vos idées
          </h2>
          <ToastContainer />
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                type="button"
                onClick={() => setIsAnonymous(false)}
                className={`flex-1 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  !isAnonymous ? "bg-indigo-600 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } text-sm sm:text-base`}
              >
                <UserCircle className="w-4 sm:w-5 h-4 sm:h-5" />
                Public
              </button>
              <button
                type="button"
                onClick={() => setIsAnonymous(true)}
                className={`flex-1 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  isAnonymous ? "bg-purple-600 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } text-sm sm:text-base`}
              >
                <UserX className="w-4 sm:w-5 h-4 sm:h-5" />
                Anonyme
              </button>
            </div>
            {!isAnonymous && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Votre nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={suggestion.nom}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm text-sm sm:text-base"
                    required={!isAnonymous}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Votre email</label>
                  <input
                    type="email"
                    name="email"
                    value={suggestion.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm text-sm sm:text-base"
                    required={!isAnonymous}
                  />
                </div>
              </div>
            )}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Objet</label>
                <input
                  type="text"
                  name="object"
                  value={suggestion.object}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Catégorie</label>
                <select
                  name="categorie"
                  value={suggestion.categorie}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm text-sm sm:text-base"
                >
                  <option value="general">Général</option>
                  <option value="academic">Académique</option>
                  <option value="events">Événements</option>
                  <option value="facilities">Infrastructures</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Votre suggestion</label>
                <textarea
                  name="message"
                  value={suggestion.message}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all h-24 sm:h-32 resize-none shadow-sm text-sm sm:text-base"
                  required
                  placeholder="Décrivez votre suggestion..."
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white px-4 py-2 sm:py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center gap-2 disabled:bg-gray-400 shadow-md text-sm sm:text-base"
            >
              <Send className="w-4 sm:w-5 h-4 sm:h-5" />
              {loading ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;