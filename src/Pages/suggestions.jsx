import { useState } from "react";

function Suggestions() {
  const [suggestion, setSuggestion] = useState({
    name: "",
    email: "",
    title: "",
    category: "general",
    description: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setSuggestion({
      name: "",
      email: "",
      title: "",
      category: "general",
      description: ""
    });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Partagez vos suggestions
          </h1>
          <p className="text-lg text-gray-600">
            Votre avis compte pour nous
          </p>
        </div>

        {showSuccess && (
          <div className="mb-8 bg-green-100 border-l-4 border-green-500 p-4 rounded-lg">
            <p className="text-green-700 text-center">Merci pour votre suggestion !</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Votre nom
              </label>
              <input
                type="text"
                value={suggestion.name}
                onChange={(e) => setSuggestion({...suggestion, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Votre email
              </label>
              <input
                type="email"
                value={suggestion.email}
                onChange={(e) => setSuggestion({...suggestion, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre de la suggestion
            </label>
            <input
              type="text"
              value={suggestion.title}
              onChange={(e) => setSuggestion({...suggestion, title: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie
            </label>
            <select
              value={suggestion.category}
              onChange={(e) => setSuggestion({...suggestion, category: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            >
              <option value="general">Général</option>
              <option value="academic">Académique</option>
              <option value="events">Événements</option>
              <option value="facilities">Infrastructures</option>
              <option value="other">Autre</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Votre suggestion
            </label>
            <textarea
              value={suggestion.description}
              onChange={(e) => setSuggestion({...suggestion, description: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors h-32 resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
          >
            Envoyer ma suggestion
          </button>
        </form>
      </div>
    </div>
  );
}

export default Suggestions;
