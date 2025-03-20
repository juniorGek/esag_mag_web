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
import Evenement from "./Pages/Evenement/Evenement";
import Blog from "./Pages/Blog/Blog";
import Actualites from "./Pages/Actualite/Actualites";
import { PublicRoute } from "./hooks/PublicRoute";
import { ProtectedRoute } from "./hooks/ProtectedRoute";
import ActualiteDetail from "./Pages/Actualite/ActualiteDetail";
import EvenementDetail from "./Pages/Evenement/EvenementDetail";
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
import SuggestionsTable from "./routes/suggestions/page";
import SuggestionDetail from "./routes/suggestions/SuggestionDetail";
import StatsPage from "./routes/stats/page";

import BlogDetail from "./Pages/Blog/BlogDetail";
import EditNews from "./routes/new-news/EditPage";
import EditBlog from "./routes/new-blogs/EditPage";
import AdminBlogDetail from "./routes/blog-detail/page";
import AdminEventsDetails from "./routes/events-detail/page";
import AcheterTicket from "./Pages/AcheterTicket";
import MesTickets from "./Pages/MesTickets";
import AgentLogin from "./Pages/Agent/AgentLogin";
import ScanCodePage from "./Pages/Agent/ScanCodePage";
import MobileOnlyRoute from "./hooks/MobileOnlyRoute";
import ScannerPage from "./Pages/Agent/ScanPage";

import PublicAgentRoute from "./hooks/AgentPublicRoute";
import ProtectedAgentRoute from "./hooks/AgentProtectedRoute";
import { AuthProvider } from "./contexts/AgentAuthContext";
import SondageSubmit from "./Pages/SondageSubmit";

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
        {
          path: "evenement/acheter-ticket/:ticketId",
          element: <AcheterTicket />,
        },
        { path: "evenement/:id/mes-tickets", element: <MesTickets /> },
        { path: "sondages", element: <Sondage /> },
        {path: "sondage_details/:id", element: <SondageSubmit /> },
        { path: "about", element: <About /> },
      ],
    },
    {
      path: "/ticket/code",
      children: [
        {
          path: "options", // /ticket/code/options
          element: (
            <MobileOnlyRoute>
                <ProtectedAgentRoute>
                    <ScanCodePage />
                </ProtectedAgentRoute>
            </MobileOnlyRoute>
          ),
        },
        {
          path: "agentLogin", // /ticket/code/agentLogin
          element: (
            <MobileOnlyRoute>
                <PublicAgentRoute>
                    <AgentLogin />
                </PublicAgentRoute>
            </MobileOnlyRoute>
                
           
          ),
        },
        {
          path: "scanner", // /ticket/code/scanner
          element: (
            <MobileOnlyRoute>
                <ProtectedAgentRoute>
                    <ScannerPage />
                </ProtectedAgentRoute>
            </MobileOnlyRoute>
          ),
        },
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
          path: "rapports",
          element: <StatsPage/>, // Page des utilisateurs vérifiés
        },
        {
          path: "admins",
          element: <AdminsTable />, // Page des Utilisateurs
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
          element: <NewAgent />, // Page des utilisateurs vérifiés
        },
        {
          path: "news",
          element: <NewsTable />, // Page des Actualités
        },
        {
          path: "new-news",
          element: <NewNews />, // Page pour ajouter une nouvelle actualité
        },
        {
          path: "new-edit/:id",
          element: <EditNews />, // Page pour ajouter une nouvelle actualité
        },
        {
          path: "blog-edit/:id",
          element: <EditBlog />, // Page pour ajouter une nouvelle actualité
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
          path: "events-detail/:id",
          element: <AdminEventsDetails />, // Page des Événements
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
          element: <SuggestionsTable />, // Page des Suggestions
        },
        {
          path: "suggestions/:id",
          element: <SuggestionDetail />, // Page des Suggestions
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
          element: <SettingsPage />, // Page des Paramètres
        },
        
      ],
    },
    {
      path: "*",
      element: <NotFound />, // Page par défaut pour une URL invalide
    },
  ]);

  return (
    <ThemeProvider storageKey="theme">
      <MessageProvider>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
        
      </MessageProvider>
    </ThemeProvider>
  );
}

export default App;
