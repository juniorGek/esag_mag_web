import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { API_URL, ImageApi } from "../../config/ApiUrl";
import { formatDate } from "../utils/formatDate";

const Home = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [dernierAcu, setDernierAcu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState({
    title: "",
    description: "",
    category: "general",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail("");
  };

  const handleSuggestionSubmit = (e) => {
    e.preventDefault();
    setShowSuccessMessage(true);
    setSuggestion({ title: "", description: "", category: "general" });
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleEvent = (eventData) => {
    window.location.href = `/evenement/${eventData.id}`;
  };

  const fetchDernierActu = async() =>{
    try {
      const response = await fetch(`${API_URL}/listeDernierActu`);
      const data = await response.json();
      setDernierAcu(data.dernierActu);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDernierActu();
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

  const evenements = [
    {
      id: 1,
      title: "Hackathon 2025",
      date: "15 Avril 2025",
      description: "Un challenge de programmation ouvert à tous les étudiants.",
      image: "/images/event2.png",
      location: "Campus Principal",
      time: "09:00 - 18:00",
    },
    {
      id: 2,
      title: "Gala des 20 ans",
      date: "30 Juin 2025",
      description: "Célébration spéciale des 20 ans de ESAG-NDE.",
      image: "/images/event1.jpg",
      location: "Salle des fêtes",
      time: "19:00 - 23:00",
    },
    {
      id: 3,
      title: "Forum Entreprises",
      date: "10 Mai 2025",
      description: "Rencontrez les plus grandes entreprises du secteur.",
      image: "/images/event3.jpg",
      location: "Hall des conférences",
      time: "10:00 - 17:00",
    },
    {
      id: 4,
      title: "Conférence Tech",
      date: "25 Mai 2025",
      description:
        "Les dernières innovations technologiques présentées par des experts.",
      image: "/images/event4.jpg",
      location: "Amphithéâtre A",
      time: "14:00 - 16:00",
    },
    {
      id: 5,
      title: "Journée Culturelle",
      date: "5 Juin 2025",
      description: "Découvrez la diversité culturelle de notre école.",
      image: "/images/event5.jpg",
      location: "Esplanade",
      time: "11:00 - 20:00",
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
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg animate-pulse h-[380px]" />
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
                      onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
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
            autoplay={{ delay: 2000, disableOnInteraction: false, reverseDirection: true }}
            className="pb-8"
          >
            {evenements.map((event) => (
              <SwiperSlide key={event.id}>
                <div className="group mb-3 bg-white rounded-xl overflow-hidden  hover:transition-all duration-300 transform hover:-translate-y-2 h-[360px]">
                  <div className="relative overflow-hidden h-40">
                    <img
                      src={event.image}
                      alt={event.title}
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
                          {event.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-1">
                      {event.title}
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
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                      {event.description}
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

          {showSuccessMessage ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 animate-fade-in">
              <p className="text-center">
                Merci pour votre suggestion ! Nous l examinerons avec attention.
              </p>
            </div>
          ) : null}

          <form onSubmit={handleSuggestionSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Titre de votre suggestion
              </label>
              <input
                type="text"
                value={suggestion.title}
                onChange={(e) =>
                  setSuggestion({ ...suggestion, title: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Catégorie
              </label>
              <select
                value={suggestion.category}
                onChange={(e) =>
                  setSuggestion({ ...suggestion, category: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="general">Général</option>
                <option value="academic">Académique</option>
                <option value="events">Événements</option>
                <option value="facilities">Infrastructures</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Votre suggestion
              </label>
              <textarea
                value={suggestion.description}
                onChange={(e) =>
                  setSuggestion({ ...suggestion, description: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg h-32"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
            >
              Envoyer ma suggestion
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
