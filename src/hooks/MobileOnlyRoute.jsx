import PropTypes from "prop-types";
import { useMobileCheck } from "./useMobileCheck";


const MobileOnlyRoute = ({ children }) => {
  const isMobile = useMobileCheck();

  if (!isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-red-600">Accès mobile requis</h1>
          <p className="text-gray-600">
            Cette fonctionnalité est optimisée pour les appareils mobiles.
          </p>
          <p className="text-gray-500 text-sm">
            Veuillez scanner le QR code depuis votre smartphone.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

MobileOnlyRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MobileOnlyRoute;
