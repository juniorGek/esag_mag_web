// components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthAgentContext } from "../contexts/AgentAuthContext";
import PropTypes from "prop-types";

function ProtectedAgentRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthAgentContext);

  // Afficher un loader pendant le check (optionnel)
  if (loading) return <div>Loading...</div>;

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de login
  if (!isAuthenticated) {
    return <Navigate to="/ticket/code/agentLogin" replace />;
  }

  return children;
}

ProtectedAgentRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedAgentRoute;
