import { useState } from "react";
import { UserCircle, UserX, Send } from "lucide-react";

function Suggestions() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [suggestion, setSuggestion] = useState({
    name: "",
    email: "",
    title: "",
    category: "general",
    description: "",
    isAnonymous: false
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
      description: "",
      isAnonymous: false
    });
    setIsAnonymous(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Partagez vos suggestions
          </h1>
          <p className="text-lg text-gray-600">
            Votre avis est précieux pour l'amélioration continue de nos services
          </p>
        </div>

        {showSuccess && (
          <div className="mb-8 bg-green-100 border border-green-200 p-4 rounded-xl shadow-sm animate-fade-in">
            <p className="text-green-700 text-center font-medium">
              Merci pour votre suggestion ! Nous l'examinerons avec attention.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6 backdrop-blur-sm bg-white/90">
          {/* Toggle Anonyme/Public */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              type="button"
              onClick={() => setIsAnonymous(false)}
              className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
                !isAnonymous
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
              className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
                isAnonymous
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
                  value={suggestion.name}
                  onChange={(e) => setSuggestion({...suggestion, name: e.target.value})}
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
                  value={suggestion.email}
                  onChange={(e) => setSuggestion({...suggestion, email: e.target.value})}
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
                value={suggestion.title}
                onChange={(e) => setSuggestion({...suggestion, title: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors group-hover:border-blue-200"
                required
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                Catégorie
              </label>
              <select
                value={suggestion.category}
                onChange={(e) => setSuggestion({...suggestion, category: e.target.value})}
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
                value={suggestion.description}
                onChange={(e) => setSuggestion({...suggestion, description: e.target.value})}
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

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Suggestions;
