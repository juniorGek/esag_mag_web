import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { getUserData } from "./auth";

export function PublicRoute({ children }) {
  if (getUserData()) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;      // TODO
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};