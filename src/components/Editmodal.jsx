import { useState, useEffect } from 'react'; // Ajoutez useEffect pour gérer les mises à jour de student
import PropTypes from 'prop-types';

export default function EditModal({ isOpen, onClose, student, onSave }) {
  // Initialisez editedStudent avec un objet vide si student est null
  const [editedStudent, setEditedStudent] = useState(student || { Name: '', lastName: '', enabled: '', email:'' });

  // Mettez à jour editedStudent lorsque student change
  useEffect(() => {
    if (student) {
      setEditedStudent(student);
    }
  }, [student]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent({ ...editedStudent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedStudent);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 ease-in-out">
        <h2 className="text-xl font-bold text-gray-900 dark:text-slate-50 mb-4">
          Modifier l admin
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Nom
              </label>
              <input
                type="text"
                name="Name"
                value={editedStudent.Name || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-50 dark:border-slate-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Prénom
              </label>
              <input
                type="text"
                name="lastName"
                value={editedStudent.lastName || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-50 dark:border-slate-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={editedStudent.email || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-50 dark:border-slate-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                État
              </label>
              <select
                name="enabled"
                value={editedStudent.enabled || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-50 dark:border-slate-600"
              >
                <option value="true">Actif</option>
                <option value="false">Inactif</option>
              </select>
            </div>

          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Validation des props avec PropTypes
EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nom: PropTypes.string.isRequired,
    prenom: PropTypes.string.isRequired,
    etat: PropTypes.string.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
};

// Valeurs par défaut pour les props
EditModal.defaultProps = {
  student: null, // student peut être null
};