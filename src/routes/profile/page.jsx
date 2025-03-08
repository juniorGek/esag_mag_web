import { useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: 'Doe',
    lastname: 'John',
    email: 'john.doe@example.com',
    profilePicture: 'https://via.placeholder.com/150',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Informations sauvegardées :', user);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Modifier votre Profil
          </span>
        </h1>

        <div className="flex flex-col items-center mb-6">
          {/* Conteneur de la photo de profil */}
          <div className="relative w-32 h-32 mb-4">
            <img
              src={user.profilePicture}
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
            />
            {isEditing && (
              <label
                htmlFor="profile-picture"
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </label>
            )}
          </div>
          {isEditing && (
            <input
              type="file"
              id="profile-picture"
              className="hidden"
              onChange={handleFileChange}
            />
          )}
          {isEditing && (
            <p className="text-sm text-gray-500 text-center">
              Cliquez sur l'icône pour changer la photo de profil.
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Nom</label>
            {isEditing ? (
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Prénom</label>
            {isEditing ? (
              <input
                type="text"
                value={user.lastname}
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700">{user.lastname}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700">{user.email}</p>
            )}
          </div>

          {isEditing && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Changer le mot de passe</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Ancien mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
              >
                Enregistrer
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Modifier
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;