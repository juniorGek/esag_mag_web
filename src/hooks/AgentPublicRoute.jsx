// components/PublicRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthAgentContext } from "../contexts/AgentAuthContext";
import PropTypes from "prop-types";

function PublicAgentRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthAgentContext);

  if (loading) return <div>Loading...</div>;

  // Si l'utilisateur est connecté, rediriger vers la page protégée
  if (isAuthenticated) {
    return <Navigate to="/ticket/code/options" replace />;
  }

  return children;
}

PublicAgentRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default PublicAgentRoute;
