import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Cards from './pages/Cards'
import List from './pages/List'

function Navigation() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path
  
  return (
    <nav className="bg-black text-white px-8 py-4">
      <div className="flex gap-8">
        <Link 
          to="/" 
          className={`hover:text-gray-300 ${isActive('/') ? 'font-bold' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/cards" 
          className={`hover:text-gray-300 ${isActive('/cards') ? 'font-bold' : ''}`}
        >
          Cards
        </Link>
        <Link 
          to="/list" 
          className={`hover:text-gray-300 ${isActive('/list') ? 'font-bold' : ''}`}
        >
          List
        </Link>
      </div>
    </nav>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
