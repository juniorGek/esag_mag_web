import { Button } from "@mui/material";
import { FaQrcode, FaBarcode } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../config/ApiUrl";
import { useContext } from "react";
import { AuthAgentContext } from "../../contexts/AgentAuthContext";

function ScanCodePage() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthAgentContext);
  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/logoutAgent`, {
        method: "POST",
        credentials: "include",

      });
      /* const data = await response.json(); */
      if (response.status === 200) {
        setIsAuthenticated(false);
        navigate("/ticket/code/agentLogin");
      }
    } catch (error) {
      console.log("Erreur lors de la déconnexion", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      {/* En-tête */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Vérification du ticket
        </h1>
        <p className="text-gray-500">Choisissez votre méthode de validation</p>
      </div>
      <Button onClick={handleLogout} variant="contained" color="primary" className="mb-4" >
        Deconnecter
      </Button>

      {/* Options principales */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl mx-auto">
        {/* Carte Scanner QR Code */}
        <Link
          to="/ticket/code/scanner"
          className="flex-1 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group"
        >
          <div className="flex-1 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-5 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                <FaQrcode className="text-blue-600 text-4xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Scanner le QR Code
              </h3>
              <p className="text-gray-500 text-sm">
                Positionnez le QR code dans le cadre de l'appareil photo
              </p>
            </div>
          </div>
        </Link>

        {/* Carte Entrer le code manuellement */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group">
          <div className="flex flex-col items-center text-center">
            <div className="bg-purple-100 p-5 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
              <FaBarcode className="text-purple-600 text-4xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Entrer le code
            </h3>
            <p className="text-gray-500 text-sm">
              Saisissez manuellement le code du ticket
            </p>

            {/* Champ de saisie (apparaît au clic) */}
            <div className="mt-4 w-full max-w-xs">
              <input
                type="text"
                placeholder="Code à 8 chiffres"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto text-center pt-8">
        <p className="text-gray-400 text-sm">
          Besoin d'aide ?{" "}
          <span className="text-blue-600 cursor-pointer">
            Contactez le support
          </span>
        </p>
      </div>
    </div>
  );
}

export default ScanCodePage;
