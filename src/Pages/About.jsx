

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:text-center">
        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">À propos</h2>
        <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
          Bienvenue sur ESAG MAG
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Votre source d'information privilégiée pour tout ce qui concerne l'École Supérieure d'Administration et de Gestion
        </p>
      </div>

      <div className="mt-16">
        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-1m-4-4l-3 3m0 0l-3-3m3 3V3" />
                </svg>
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Notre Mission</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              ESAG MAG a pour mission de centraliser et diffuser toutes les informations importantes concernant la vie étudiante et académique de l'école.
            </dd>
          </div>

          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Notre Communauté</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              Nous créons un espace d'échange dynamique où étudiants et personnel peuvent interagir, partager et contribuer à la vie de l'école.
            </dd>
          </div>

          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Nos Valeurs</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              Transparence, qualité de l'information, et engagement communautaire sont au cœur de notre démarche.
            </dd>
          </div>

          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Notre Impact</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              Nous contribuons à créer une communauté étudiante plus informée, plus engagée et plus connectée.
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
