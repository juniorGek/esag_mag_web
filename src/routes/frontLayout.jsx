import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTopOnNavigate from '../hooks/useScrollToTop';
import ScrollToTop from '../components/ScrollToTop';

function FrontLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-sky-100">
      <ScrollToTopOnNavigate />
      {/* Navbar fixée en haut */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar />
      </header>

      {/* Main avec flex-grow et padding ajusté */}
      <main className="flex-grow ">
        <div className="max-w-full mx-auto ">
          <Outlet /> {/* Les routes enfants s'affichent ici */}
        </div>
      </main>

      {/* Footer poussé en bas */}
      <footer className="mt-auto">
        <Footer />
      </footer>

      <ScrollToTop />
    </div>
  );
}

export default FrontLayout;