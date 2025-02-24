
import { jwtDecode } from "jwt-decode";

export function getUserData() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);

    // Vérifier l'expiration du token
    if (decodedToken.exp * 1000 < Date.now()) {
      console.error("Le token est expiré.");
      return null;
    }

    // Vérifier que l'utilisateur est admin (ajustez selon votre payload)
   /* if (decodedToken.compte !== "admin") {
      console.error("L'utilisateur n'est pas admin.");
      return null;
    }*/

    return {
      id: decodedToken.id,
      email: decodedToken.email,
      name: decodedToken.name,
      // Ajoutez d'autres informations si besoin
    };
  } catch (error) {
    console.error("Erreur de décodage du token", error);
    return null;
  }
}
