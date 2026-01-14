import { Outlet, useLocation } from 'react-router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const location = useLocation();

  // Check if we're on homepage
  const isHomePage = location.pathname === '/';

  return (
    <div className={isHomePage ? "px-6 sm:px-16 md:px-20 lg:px-24 xl:px-32" : "px-4 sm:px-10 md:px-14 lg:px-20 xl:px-24"}>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App;
