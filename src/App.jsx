import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopOnNavigate from './hooks/useScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
import { MessageProvider } from "./utils/messageContext";

const App = () => {
    return (
        <div className="relative">
            <ScrollToTopOnNavigate />
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/actualites" element={<Actualites />} />
                    <Route path="/actualite/:id" element={<ActualiteDetail />} />
                    <Route path="/evenements" element={<Evenement />} />
                    <Route path="/evenement/:id" element={<EvenementDetail />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/suggestions" element={<Suggestions />} />
                    <Route path="/login" element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />
                    <Route path="/admin" element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<DashboardPage />} />
                        <Route path="analytics" element={<h1 className="title">Analytiques</h1>} />
                        <Route path="reports" element={<h1 className="title">Rapports</h1>} />
                        <Route path="users" element={<UsersTable />} />
                        <Route path="new-user" element={<h1 className="title">Nouvel utilisateur</h1>} />
                        <Route path="admins" element={<AdminsTable />} />
                        <Route path="new-admin" element={<NewAdmin />} />
                        <Route path="news" element={<h1 className="title">Actualités</h1>} />
                        <Route path="new-news" element={<h1 className="title">Nouvelle Actualité</h1>} />
                        <Route path="blogs" element={<h1 className="title">Blogs</h1>} />
                        <Route path="polls" element={<h1 className="title">Sondages</h1>} />
                        <Route path="new-poll" element={<h1 className="title">Nouveau Sondage</h1>} />
                        <Route path="suggestions" element={<h1 className="title">Suggestions</h1>} />
                        <Route path="events" element={<h1 className="title">Événements</h1>} />
                        <Route path="new-event" element={<h1 className="title">Nouvel Événement</h1>} />
                        <Route path="settings" element={<h1 className="title">Paramètres</h1>} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default App;