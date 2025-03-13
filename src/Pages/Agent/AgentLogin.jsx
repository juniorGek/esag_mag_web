import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { API_URL } from "../../../config/ApiUrl";
import { AuthAgentContext } from "../../contexts/AgentAuthContext";
import { useContext } from "react";

function AgentLogin() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthAgentContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* navigate("/ticket/code/scanPage"); */
    try {
      const response = await fetch(`${API_URL}/AgentConnexion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: e.target.name.value,
          codeAgent: e.target.code.value,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
        setIsAuthenticated(true);
        navigate("/ticket/code/options");
      }else if (response.status === 400){
        toast.error(data.message);
      }else{
        console.log(data)
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Erreur lors de la connexion");
      console.log(error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <ToastContainer />
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