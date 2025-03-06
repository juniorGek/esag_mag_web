import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-provider";
import DashboardPage from "./routes/dashboard/page";
import Layout from "./routes/layouts";
import UsersTable from "./routes/users/page";
import AdminsTable from "./routes/admins/page";
import NewAdmin from "./routes/new-admin/page";
import NewAgent from "./routes/new-agent/page";
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
import { MessageProvider } from "./utils/messageContext";

import NewNews from "./routes/new-news/page";

import NewsTable from "./routes/news/page";
import ForgetPassPage from "./Pages/Auth/forgetPassPage";
import BlogTable from "./routes/blogs/page";
import NewBlog from "./routes/new-blogs/page";
import Agents from "./routes/agents/page";
import NewPoll from "./routes/new-poll/page";
import PollsTable from "./routes/polls/page";
import NewEvent from "./routes/new-event/page";
import EventsTable from "./routes/events/page";
import SettingsPage from "./routes/settings/page";
import ProfilePage from "./routes/profile/page";
import BlogDetail from "./Pages/BlogDetail";
import EditNews from "./routes/new-news/EditPage";
import EditBlog from "./routes/new-blogs/EditPage";
import AdminBlogDetail from "./routes/blog-detail/page";
import AcheterTicket from './Pages/AcheterTicket';
import MesTickets from './Pages/MesTickets';

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
                { path: "blog/:id", element: <BlogDetail /> },
                { path: "evenements", element: <Evenement /> },
                { path: "evenement/:id", element: <EvenementDetail /> },
                { path: "evenement/:id/acheter-ticket/:ticketId", element: <AcheterTicket /> },
                { path: "evenement/:id/mes-tickets", element: <MesTickets /> },
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
            path: "/login/forgetPassword",
            element: (
                <PublicRoute>
                    <ForgetPassPage />
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
                    path: "agents",
                    element: <Agents />, // Page des utilisateurs vérifiés
                },
                {
                    path: "new-agent",
                    element: <NewAgent/>, // Page des utilisateurs vérifiés
                },
                {
                    path: "news",
                    element: <NewsTable/>, // Page des Actualités
                },
                {
                    path: "new-news",
                    element: <NewNews/>, // Page pour ajouter une nouvelle actualité
                },
                {
                    path: "new-edit/:id",
                    element: <EditNews/>, // Page pour ajouter une nouvelle actualité
                },
                {
                    path: "blog-edit/:id",
                    element: <EditBlog/>, // Page pour ajouter une nouvelle actualité
                },
                {
                    path: "blogs",
                    element: <BlogTable />, // Page des Blogs
                },
                {
                    path: "blog-detail/:id",
                    element: <AdminBlogDetail />, // Page de détail du blog (admin)
                },
                {
                    path: "new-blogs",
                    element: <NewBlog />, // Page pour ajouter un nouveau blog
                },
                {
                    path: "new-blogs/:id",
                    element: <EditBlog />,
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
                    element: <SettingsPage/>, // Page des Paramètres
                },
                {
                    path: "Profile",
                    element: <ProfilePage/>, // Page des Paramètres
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
             <MessageProvider>
             <RouterProvider router={router} />
             </MessageProvider>
            
        </ThemeProvider>
    );
}

export default App;