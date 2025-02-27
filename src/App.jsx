import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
import NewsTable from "./routes/news/page";
import NewsNews from "./routes/news-news/page";
import BlogTable from "./routes/blogs/page";
import NewBlogs from "./routes/new-blogs/page";
import PollsTable from "./routes/polls/page";
import NewPoll from "./routes/new-poll/page";
import EventsTable from "./routes/events/page";
import NewEvent from "./routes/new-event/page";


function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <FrontLayout />, // Ce layout contient le Navbar, le Footer, etc.
            children: [
              { index: true, element: <Home /> },
              { path: "suggestions", element: <Suggestions /> },
              { path: "actualites", element: <Actualites /> },
              { path: "blog", element: <Blog /> },
              { path: "evenements", element: <Evenement /> },
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
                
                    <Layout />
                
            ),
            children: [
                {
                    index: true,
                    path: "dashboard",
                    element: <DashboardPage />, // Page d'accueil (Tableau de Bord)
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
                    element:<NewAdmin />, // Page des utilisateurs vérifiés
                },
                {
                    path: "news",
                    element: <NewsTable />, // Page des Actualités
                },
                {
                    path: "new-news",
                    element: <NewsNews />, // Page pour ajouter une nouvelle actualité
                },
                {
                    path: "blogs",
                    element: <BlogTable />, // Page des Blogs
                },
                {
                    path: "new-blogs",
                    element: <NewBlogs />, // Page pour ajouter un nouveau blog
                },
                {
                    path: "polls",
                    element: <PollsTable />, // Page des Sondages
                },
                {
                    path: "new-poll",
                    element: <NewPoll />, // Page pour créer un nouveau sondage
                },
                {
                    path: "suggestions",
                    element: <h1 className="title">Suggestions</h1>, // Page des Suggestions
                },
                {
                    path: "events",
                    element: <EventsTable />, // Page des Événements
                },
                {
                    path: "new-event",
                    element: <NewEvent />, // Page pour créer un nouvel événement
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