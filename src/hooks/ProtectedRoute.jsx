import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { getUserData } from "./auth";

export function ProtectedRoute({ children }) {
  if (!getUserData()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};