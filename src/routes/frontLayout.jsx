import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTopOnNavigate from '../hooks/useScrollToTop';
import ScrollToTop from '../components/ScrollToTop';

function FrontLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <ScrollToTopOnNavigate />
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Les routes enfants s'affichent ici */}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default FrontLayout;
