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
    // Logique pour sauvegarder les modifications
    console.log('Informations sauvegardées :', user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Modifier le Profil</h1>

        {/* Section Photo de profil */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 mb-4">
            <img
              src={user.profilePicture}
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
            />
            {isEditing && (
              <label
                htmlFor="profile-picture"
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
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
          <p className="text-sm text-gray-500">
            Cliquez sur l'icône pour changer la photo de profil.
          </p>
        </div>

        {/* Section Informations du compte */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            {isEditing ? (
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-100 rounded-md">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            {isEditing ? (
              <input
                type="text"
                value={user.lastname}
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-100 rounded-md">{user.lastname}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-100 rounded-md">{user.email}</p>
            )}
          </div>

          {/* Section Changer le mot de passe */}
          {isEditing && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Changer le mot de passe</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ancien mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Boutons Modifier/Enregistrer */}
        <div className="flex justify-end mt-8">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Enregistrer
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
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