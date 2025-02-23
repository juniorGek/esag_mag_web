import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function FrontLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Les routes enfants s'affichent ici */}
      </main>
      <Footer />
    </div>
  );
}

export default FrontLayout;
