import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Cards from './pages/Cards'
import List from './pages/List'
import Insight from './pages/Insight'
import Hypothesis from './pages/Hypothesis'
import FeedyLogo from './assets/FeedyLogo'

function Navigation() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white text-gray-700 px-8 py-4 border-b border-gray-200">
      <div className="flex gap-8 items-center">
        <Link to="/" className="hover:opacity-80 transition">
          <FeedyLogo className="h-8" />
        </Link>
        <Link
          to="/cards"
          className={`hover:text-gray-900 ${isActive('/cards') ? 'font-bold text-gray-900' : ''}`}
        >
          Cards
        </Link>
        <Link
          to="/list"
          className={`hover:text-gray-900 ${isActive('/list') ? 'font-bold text-gray-900' : ''}`}
        >
          List
        </Link>
        <Link
          to="/insight"
          className={`hover:text-gray-900 ${isActive('/insight') ? 'font-bold text-gray-900' : ''}`}
        >
          Insight
        </Link>
        <Link
          to="/hypothesis"
          className={`hover:text-gray-900 ${isActive('/hypothesis') ? 'font-bold text-gray-900' : ''}`}
        >
          Hypothesis
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
          <Route path="/insight" element={<Insight />} />
          <Route path="/hypothesis" element={<Hypothesis />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
