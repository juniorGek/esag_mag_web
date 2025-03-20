// context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { API_URL } from "../../config/ApiUrl";

// Créer le contexte
export const AuthAgentContext = createContext();

// Provider du contexte
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cette fonction vérifiera si l'utilisateur est connecté.
  // Par exemple, on pourrait faire une requête à l'API pour vérifier la session.
  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/checkSession`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de la session", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthAgentContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
      {children}
    </AuthAgentContext.Provider>
  );

  
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };