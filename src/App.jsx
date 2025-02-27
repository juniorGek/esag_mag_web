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
import BlogDetail from "./Pages/BlogDetail";
import Actualites from "./Pages/Actualites";
import { PublicRoute } from "./hooks/PublicRoute";
import { ProtectedRoute } from "./hooks/ProtectedRoute";
import ActualiteDetail from './Pages/ActualiteDetail';
import EvenementDetail from './Pages/EvenementDetail';
import { MessageProvider } from "./utils/messageContext";



const router = createBrowserRouter([
    {
        path: "/",
        element: <FrontLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "suggestions", element: <Suggestions /> },
            { path: "actualites", element: <Actualites /> },
            { path: "actualite/:id", element: <ActualiteDetail /> },
            { path: "blog", element: <Blog /> },
            { path: "blog/:id", element: <BlogDetail /> },
            { path: "evenements", element: <Evenement /> },
            { path: "evenement/:id", element: <EvenementDetail /> },
            { path: "sondages", element: <Sondage /> },
            { path: "about", element: <About /> },
        ],
    },
    {
        path: "/login",
        element: <PublicRoute><Login /></PublicRoute>,
    },
    {
        path: "/admin",
        element: <ProtectedRoute><Layout /></ProtectedRoute>,
        children: [
            {
                index: true,
                path: "dashboard",
                element: <DashboardPage />,
            },
            {
                path: "analytics",
                element: <h1 className="title">Analytiques</h1>,
            },
            {
                path: "reports",
                element: <h1 className="title">Rapports</h1>,
            },
            {
                path: "users",
                element: <UsersTable />,
            },
            {
                path: "new-user",
                element: <h1 className="title">Nouvel utilisateur</h1>,
            },
            {
                path: "admins",
                element: <AdminsTable />
            },
            {
                path: "new-admin",
                element: <NewAdmin />,
            },
            {
                path: "news",
                element: <Actualites />,
            },
            {
                path: "new-news",
                element: <Actualites />,
            },
            {
                path: "blogs",
                element: <h1 className="title">Blogs</h1>,
            },
            {
                path: "polls",
                element: <h1 className="title">Sondages</h1>,
            },
            {
                path: "new-poll",
                element: <h1 className="title">Nouveau Sondage</h1>,
            },
            {
                path: "suggestions",
                element: <h1 className="title">Suggestions</h1>,
            },
            {
                path: "events",
                element: <h1 className="title">Événements</h1>,
            },
            {
                path: "new-event",
                element: <h1 className="title">Nouvel Événement</h1>,
            },
            {
                path: "settings",
                element: <h1 className="title">Paramètres</h1>,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    }
]);

function App() {
    return (
        <ThemeProvider storageKey="theme">
            <MessageProvider>
                <RouterProvider router={router} />
            </MessageProvider>
        </ThemeProvider>
    );
}

export default App;