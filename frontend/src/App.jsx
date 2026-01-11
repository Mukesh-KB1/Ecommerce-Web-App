import {Outlet} from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


function App() {
  return (
    <div className="px-4 sm:px-12 md:px-16 lg:px-20">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App