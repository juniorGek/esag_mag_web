import PropTypes from 'prop-types'; // Importez PropTypes

export default function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 ease-in-out">
        <h2 className="text-xl font-bold text-gray-900 dark:text-slate-50 mb-4">
          Supprimer l admin
        </h2>
        <p className="text-gray-700 dark:text-slate-300 mb-6">
          Êtes-vous sûr de vouloir supprimer cet admin ?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-50"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

// Validation des props avec PropTypes
DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // isOpen doit être un booléen et est requis
  onClose: PropTypes.func.isRequired, // onClose doit être une fonction et est requis
  onConfirm: PropTypes.func.isRequired, // onConfirm doit être une fonction et est requis
};