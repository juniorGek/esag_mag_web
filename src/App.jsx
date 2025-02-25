import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from "./contexts/theme-provider";
import DashboardPage from "./routes/dashboard/page";
import Layout from "./routes/layouts";
import UsersTable from "./routes/users/page";
import AdminsTable from "./routes/admins/page";
import NewAdmin from "./routes/new-admin/page";
import Login from "./Pages/Auth/Login";
import FrontLayout from "./routes/frontLayout";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Suggestions from "./Pages/suggestions";
import About from "./Pages/About";
import Sondage from "./Pages/Sondage";
import Evenement from "./Pages/Evenement";
import Blog from "./Pages/Blog";
import Actualites from "./Pages/Actualites";
import { PublicRoute } from "./hooks/PublicRoute";
import { ProtectedRoute } from "./hooks/ProtectedRoute";
import ActualiteDetail from './Pages/ActualiteDetail';
import EvenementDetail from './Pages/EvenementDetail';

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <FrontLayout />, // Ce layout contient le Navbar, le Footer, etc.
            children: [
                { index: true, element: <Home /> },
                { path: "suggestions", element: <Suggestions /> },
                { path: "actualites", element: <Actualites /> },
                { path: "actualite/:id", element: <ActualiteDetail /> },
                { path: "blog", element: <Blog /> },
                { path: "evenements", element: <Evenement /> },
                { path: "evenement/:id", element: <EvenementDetail /> },
                { path: "sondages", element: <Sondage /> },
                { path: "about", element: <About /> },
            ],
        },
        {
            path: "/login",
            element: (
                <PublicRoute>
                    <Login />
                </PublicRoute>
            ), // Page d'accueil (Tableau de Bord)
        },
        {
            path: "/admin",
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                {
                    index: true,
                    path: "dashboard",
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
                    element: <UsersTable />, // Page des Utilisateurs
                },
                {
                    path: "new-user",
                    element: <h1 className="title">Nouvel utilisateur</h1>, // Page des utilisateurs vérifiés
                },
                {
                    path: "admins",
                    element: <AdminsTable /> // Page des Utilisateurs
                },
                {
                    path: "new-admin",
                    element: <NewAdmin />, // Page des utilisateurs vérifiés
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
        {
            path: "*",
            element: <NotFound />, // Page par défaut pour une URL invalide
        }
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;