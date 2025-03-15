const SuggestionsTable = () => {
  const Suggestions = [
    {
      id: 1,
      title: 'Améliorer la page d\'accueil',
      category: 'Général',
      suggestion: 'La page d\'accueil pourrait être plus interactive et moderne.',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      date: '2023-10-15',
    },
    {
      id: 2,
      title: 'Ajouter un dark mode',
      category: 'Design',
      suggestion: 'Un mode sombre serait apprécié pour les utilisateurs nocturnes.',
      name: null, // Suggestion anonyme
      email: null,
      date: '2023-10-14',
    },
    {
      id: 3,
      title: 'Optimiser les performances',
      category: 'Technique',
      suggestion: 'Le site pourrait être optimisé pour charger plus rapidement.',
      name: 'Marie Curie',
      email: 'marie.curie@example.com',
      date: '2023-10-13',
    },
    {
      id: 4,
      title: 'Ajouter un chat en direct',
      category: 'Fonctionnalité',
      suggestion: 'Un chat en direct pour le support client serait très utile.',
      name: 'Lucie Martin',
      email: 'lucie.martin@example.com',
      date: '2023-10-12',
    },
    {
      id: 5,
      title: 'Améliorer la recherche',
      category: 'Général',
      suggestion: 'La fonction de recherche pourrait être plus intuitive.',
      name: null, // Suggestion anonyme
      email: null,
      date: '2023-10-11',
    },
    {
      id: 6,
      title: 'Ajouter des tutoriels',
      category: 'Documentation',
      suggestion: 'Des tutoriels vidéo aideraient les nouveaux utilisateurs.',
      name: 'Paul Lefevre',
      email: 'paul.lefevre@example.com',
      date: '2023-10-10',
    },
    {
      id: 7,
      title: 'Créer une application mobile',
      category: 'Mobile',
      suggestion: 'Une application mobile serait un excellent ajout.',
      name: 'Sophie Dubois',
      email: 'sophie.dubois@example.com',
      date: '2023-10-09',
    },
    {
      id: 8,
      title: 'Améliorer les notifications',
      category: 'Général',
      suggestion: 'Les notifications pourraient être plus personnalisées.',
      name: null, // Suggestion anonyme
      email: null,
      date: '2023-10-08',
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      {/* Titre stylisé */}
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Suggestions reçues
        </span>
        <div className="mt-2 w-20 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
      </h1>

      {/* Grille de cartes pour afficher les suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col min-h-[400px]"
            // ^^ Conserve uniquement `transform` et `hover:scale-105`
          >
            <div className="p-6 flex flex-col flex-grow">
              {/* Titre de la suggestion */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">Titre</label>
                <h3 className="text-xl font-semibold text-gray-800">{suggestion.title}</h3>
              </div>

              {/* Catégorie */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">Catégorie</label>
                <p className="text-gray-600">{suggestion.category}</p>
              </div>

              {/* Suggestion */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">Suggestion</label>
                <p className="text-gray-600">{suggestion.suggestion}</p>
              </div>

              {/* Informations utilisateur */}
              <div className="text-sm text-gray-500">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-500">Nom</label>
                  <p>{suggestion.name || 'Anonyme'}</p>
                </div>
                {suggestion.email && (
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p>{suggestion.email}</p>
                  </div>
                )}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-500">Date</label>
                  <p>{suggestion.date}</p>
                </div>
              </div>
            </div>

            {/* Bouton "Voir les détails" */}
            <div className="px-6 py-4 mt-auto border-t border-gray-100">
              <button className="text-indigo-600 hover:text-indigo-800 font-medium w-full text-left">
                Voir les détails
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsTable;