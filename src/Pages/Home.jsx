import { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Home = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [suggestion, setSuggestion] = useState({
    title: "",
    description: "",
    category: "general"
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

  const actualites = [
    {
      title: "Nouvelle rentrée académique",
      date: "12 Février 2025",
      description: "Découvrez les nouveautés pour cette nouvelle année universitaire.",
      link: "/actualites/1",
      image: "/images/news1.jpg",
    },
    {
      title: "Conférence sur l'IA",
      date: "20 Mars 2025",
      description: "Un événement à ne pas manquer sur l'intelligence artificielle.",
      link: "/actualites/2",
      image: "/images/news2.jpg",
    },
    {
      title: "Forum des entreprises",
      date: "15 Avril 2025",
      description: "Rencontrez vos futurs employeurs lors de notre forum annuel.",
      link: "/actualites/3",
      image: "/images/news3.jpg",
    },
    {
      title: "Nouveaux partenariats",
      date: "5 Mai 2025",
      description: "Découvrez nos nouveaux partenaires internationaux.",
      link: "/actualites/4",
      image: "/images/news4.jpg",
    },
    {
      title: "Innovation Lab",
      date: "1 Juin 2025",
      description: "Ouverture du nouveau laboratoire d'innovation.",
      link: "/actualites/5",
      image: "/images/news5.jpg",
    }
  ];

  const evenements = [
    {
      title: "Hackathon 2025",
      date: "15 Avril 2025",
      description: "Un challenge de programmation ouvert à tous les étudiants.",
      link: "/evenements/1",
      image: "/images/event2.png",
      location: "Campus Principal",
      time: "09:00 - 18:00"
    },
    {
      title: "Gala des 20 ans",
      date: "30 Juin 2025",
      description: "Célébration spéciale des 20 ans de ESAG-NDE.",
      link: "/evenements/2",
      image: "/images/event1.jpg",
      location: "Salle des fêtes",
      time: "19:00 - 23:00"
    },
    {
      title: "Forum Entreprises",
      date: "10 Mai 2025",
      description: "Rencontrez les plus grandes entreprises du secteur.",
      link: "/evenements/3",
      image: "/images/event3.jpg",
      location: "Hall des conférences",
      time: "10:00 - 17:00"
    },
    {
      title: "Conférence Tech",
      date: "25 Mai 2025",
      description: "Les dernières innovations technologiques présentées par des experts.",
      link: "/evenements/4",
      image: "/images/event4.jpg",
      location: "Amphithéâtre A",
      time: "14:00 - 16:00"
    },
    {
      title: "Journée Culturelle",
      date: "5 Juin 2025",
      description: "Découvrez la diversité culturelle de notre école.",
      link: "/evenements/5",
      image: "/images/event5.jpg",
      location: "Esplanade",
      time: "11:00 - 20:00"
    }
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
      <section className="section-padding bg-gray-100 m-5 p-3 ">
        <div className="container-width">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 relative">
            Dernières Actualités
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
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            className="pb-8 "
          >
            {actualites.map((news, index) => (
              <SwiperSlide key={index}>
                <div className="group bg-white rounded-xl overflow-hidden hover:transition-all duration-300 transform hover:-translate-y-2 h-[320px]">
                  <div className="relative overflow-hidden h-40">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                      {news.date}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-1">{news.title}</h3>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">{news.description}</p>
                    <Link 
                      to={news.link} 
                      className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      En savoir + 
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            className="pb-8"
          >
            {evenements.map((event, index) => (
              <SwiperSlide key={index}>
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
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">{event.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-1">{event.title}</h3>
                    <div className="mb-2 text-xs text-gray-600">
                      <div className="flex items-center space-x-2 mb-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">{event.description}</p>
                    <Link 
                      to={event.link} 
                      className="inline-flex items-center w-full justify-center px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors duration-300 group"
                    >
                      Participer
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="text-center mt-8">
            <Link to="/evenements" className="btn-primary">Tout voir</Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="container-width">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4 animate-fade-in">
              Restez informé
            </h2>
            <p className="mb-8 animate-fade-in">
              Inscrivez-vous à notre newsletter pour ne rien manquer des
              actualités de lESAG-nde.
            </p>
            {isSubscribed ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-scale-in">
                <p className="text-lg">Merci pour votre inscription ! 🎉</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="animate-fade-in">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    className="input-field bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border-white/20 focus:border-white"
                    required
                  />
                  <button
                    type="submit"
                    className="btn-secondary bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Sinscrire
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Nouvelle section Suggestions */}
      <section className="section-padding bg-gray-50">
        <div className="container-width max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 relative">
            Donnez vos avis 
            <div className="h-1 w-24 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </h2>
          
          {showSuccessMessage ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 animate-fade-in">
              <p className="text-center">Merci pour votre suggestion ! Nous l examinerons avec attention.</p>
            </div>
          ) : null}

          <form onSubmit={handleSuggestionSubmit} className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                Titre de votre suggestion
              </label>
              <input
                type="text"
                id="title"
                value={suggestion.title}
                onChange={(e) => setSuggestion({...suggestion, title: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
                Catégorie
              </label>
              <select
                id="category"
                value={suggestion.category}
                onChange={(e) => setSuggestion({...suggestion, category: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
              >
                <option value="general">Général</option>
                <option value="academic">Académique</option>
                <option value="events">Événements</option>
                <option value="facilities">Infrastructures</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                Votre suggestion
              </label>
              <textarea
                id="description"
                value={suggestion.description}
                onChange={(e) => setSuggestion({...suggestion, description: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors h-32 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-300"
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
