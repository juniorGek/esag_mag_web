import { useNavigate } from "react-router-dom";

function AgentLogin() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/ticket/code/scanPage");
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        {/* En-tête */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Connexion Agent</h1>
          <p className="text-gray-500">Accédez à votre espace professionnel</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ Nom */}
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nom de agent
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Entrez votre nom"
            />
          </div>

          {/* Champ Code */}
          <div>
            <label 
              htmlFor="code" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Code accès
            </label>
            <input
              type="password"
              id="code"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* Bouton de connexion */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  )
}

export default AgentLogin