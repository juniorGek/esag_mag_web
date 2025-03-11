import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { API_URL, ImageApi } from "../../config/ApiUrl";
import { formatDate } from "../utils/formatDate";
import { UserCircle, UserX, Send } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





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
  const [showSuccess, setShowSuccess] = useState(false);

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

      console.log("Données envoyées :", formValues);

      const response = await fetch(`${API_URL}/createSuggestion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      setDernierAcu(data.dernierActu);
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

      setEvent(data.events);
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
      description:
        "Votre plateforme interactive pour rester connecté avec la vie de l'école et participer activement à la communauté ESAG-nde.",
      link: "/actualites",
      linkText: "Découvrir les actualités",
      image: "/images/1.jpg",
    },
    {
      title: "Participez aux événements",
      description:
        "Ne manquez aucun événement important de l'école, inscrivez-vous dès maintenant !",
      link: "/evenements",
      linkText: "Voir les événements",
      image: "/images/2.jpg",
    },
    {
      title: "Exprimez-vous",
      description:
        "Donnez votre avis à travers nos sondages et contribuez à l'amélioration de la communauté.",
      link: "/sondages",
      linkText: "Participer aux sondages",
      image: "/images/2.jpg",
    },
  ];

  return (
    <div className="gradient-background min-h-screen">
      {/* Carousel Section */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="w-full h-[600px]"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover brightness-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
              <p className="text-lg max-w-2xl mb-6">{slide.description}</p>
              <Link
                to={slide.link}
                className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
              >
                {slide.linkText}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Actualités Section - Style amélioré */}
      <section className="section-padding bg-white m-5 p-3">
        <div className="container-width">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Dernières Actualités
          </h2>

          {loading ? (
            // 📌 Skeleton Loader
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 rounded-lg animate-pulse h-[380px]"
                  />
                ))}
            </div>
          ) : (
            // 📌 Swiper avec les données réelles
            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="pb-8"
            >
              {dernierAcu.map((news) => (
                <SwiperSlide key={news.id}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-md min-h-[380px] flex flex-col">
                    <div className="relative h-48 flex items-center justify-center bg-gray-200">
                      {/* Loader pour l'image */}
                      <img
                        src={`${ImageApi}/${news.imageCover}`}
                        alt={news.titre}
                        className="w-full h-full object-cover transition-opacity duration-500"
                        onLoad={(e) =>
                          e.currentTarget.classList.remove("opacity-0")
                        }
                      />
                    </div>
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {formatDate(news.createdAt)}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">
                        {news.titre}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {news.sous_titre}
                      </p>
                      <div className="mt-auto">
                        <Link
                          to={`/actualite/${news.id}`}
                          className="text-blue-600 font-medium hover:text-blue-700"
                        >
                          En savoir plus →
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* Événements Section - Style amélioré */}
      {loadingRecentEvent ? (
        <div className="flex justify-center items-center">
          <h1>Chargement...</h1>
        </div>
      ) : (
        <section className="section-padding bg-white m-5 p-3">
          <div className="container-width">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 relative">
              Événements à venir
              <div className="h-1 w-24 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            </h2>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              className="pb-8"
            >
              {event.map((event) => (
                <SwiperSlide key={event.id}>
                  <div className="group mb-3 bg-white rounded-xl overflow-hidden  hover:transition-all duration-300 transform hover:-translate-y-2 h-[360px]">
                    <div className="relative overflow-hidden h-40">
                      <img
                        src={`${ImageApi}/${event.imageCover}`}
                        alt={event.titre}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm font-medium">
                            {formatDate(event.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-1">
                        {event.titre}
                      </h3>
                      <div className="mb-2 text-xs text-gray-600">
                        <div className="flex items-center space-x-2 mb-1">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                          </svg>
                          <span>{event.lieu}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                        {event.sous_titre}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleEvent(event)}
                        className="inline-flex items-center w-full justify-center px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors duration-300 group"
                      >
                        Participer
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="text-center mt-8">
              <Link to="/evenements" className="btn-primary">
                Tout voir
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="bg-blue-600 section-padding  m-5 p-3">
        <div className="container-width">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Restez informé
          </h2>
          <p className="text-center text-white mb-8">
            Inscrivez-vous à notre newsletter pour ne rien manquer des
            actualités de lESAG-nde.
          </p>
          <div className="max-w-2xl mx-auto flex justify-center">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 p-2 rounded-l border-0"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-2 rounded-r font-medium hover:bg-gray-100"
            >
              Sinscrire
            </button>
          </div>
        </div>
      </section>

      {/* Nouvelle section Suggestions */}
      <section className="section-padding  m-5 p-3 bg-white">
        <div className="container-width max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Donnez vos avis
          </h2>

          {showSuccess && (
            <div className="mb-8 bg-green-100 border border-green-200 p-4 rounded-xl shadow-sm animate-fade-in">
              <p className="text-green-700 text-center font-medium">
                Merci pour votre suggestion ! Nous l'examinerons avec attention.
              </p>
            </div>
          )}
          <ToastContainer />

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6 backdrop-blur-sm bg-white/90">
            {/* Toggle Anonyme/Public */}
            <div className="flex justify-center space-x-4 mb-8">
              <button
                type="button"
                onClick={() => setIsAnonymous(false)}
                className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${!isAnonymous
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 transform scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                <UserCircle className="w-5 h-5 mr-2" />
                Public
              </button>
              <button
                type="button"
                onClick={() => setIsAnonymous(true)}
                className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${isAnonymous
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-200 transform scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                <UserX className="w-5 h-5 mr-2" />
                Anonyme
              </button>
            </div>

            {/* Informations personnelles (conditionnelles) */}
            {!isAnonymous && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={suggestion.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors group-hover:border-blue-200"
                    required={!isAnonymous}
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                    Votre email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={suggestion.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors group-hover:border-blue-200"
                    required={!isAnonymous}
                  />
                </div>
              </div>
            )}

            {/* Titre et Catégorie */}
            <div className="space-y-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  Objet de la suggestion
                </label>
                <input
                  type="text"
                  name="object"
                  value={suggestion.object}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors group-hover:border-blue-200"
                  required
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  Catégorie
                </label>
                <select
                  name="categorie"
                  value={suggestion.categorie}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors group-hover:border-blue-200"
                >
                  <option value="general">Général</option>
                  <option value="academic">Académique</option>
                  <option value="events">Événements</option>
                  <option value="facilities">Infrastructures</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  Votre suggestion
                </label>
                <textarea
                  name="message"
                  value={suggestion.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors group-hover:border-blue-200 h-32 resize-none"
                  required
                  placeholder="Décrivez votre suggestion en détail..."
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Envoyer ma suggestion</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
