import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "./contexts/theme-provider";
import DashboardPage from "./routes/dashboard/page";
import Layout from "./routes/layouts";
import LoginPage from "./Pages/login";


function App() {
    const router = createBrowserRouter([


        {
            path: "/login",
            element: <LoginPage />,
        },
        
        {
            path: "/dashboard",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />, // Page d'accueil (Tableau de Bord)
                },
                {
                    path: "analytics",
                    element: <h1 className="title">Analytiques</h1>, // Page des Analytiques
                },
                {
                    path: "reports",
                    element: <h1 className="title">Rapports</h1>, // Page des Rapports
                },
                {
                    path: "users",
                    element: <h1 className="title">Utilisateurs</h1>, // Page des Utilisateurs
                },
                {
                    path: "new-user",
                    element: <h1 className="title">Nouvel Utilisateur</h1>, // Page pour ajouter un nouvel utilisateur
                },
                {
                    path: "verified-users",
                    element: <h1 className="title">Utilisateurs Vérifiés</h1>, // Page des utilisateurs vérifiés
                },
                {
                    path: "news",
                    element: <h1 className="title">Actualités</h1>, // Page des Actualités
                },
                {
                    path: "new-news",
                    element: <h1 className="title">Nouvelle Actualité</h1>, // Page pour ajouter une nouvelle actualité
                },
                {
                    path: "blogs",
                    element: <h1 className="title">Blogs</h1>, // Page des Blogs
                },
                {
                    path: "polls",
                    element: <h1 className="title">Sondages</h1>, // Page des Sondages
                },
                {
                    path: "new-poll",
                    element: <h1 className="title">Nouveau Sondage</h1>, // Page pour créer un nouveau sondage
                },
                {
                    path: "suggestions",
                    element: <h1 className="title">Suggestions</h1>, // Page des Suggestions
                },
                {
                    path: "events",
                    element: <h1 className="title">Événements</h1>, // Page des Événements
                },
                {
                    path: "new-event",
                    element: <h1 className="title">Nouvel Événement</h1>, // Page pour créer un nouvel événement
                },
                {
                    path: "settings",
                    element: <h1 className="title">Paramètres</h1>, // Page des Paramètres
                },
            ],
        },
    ]);
    

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;