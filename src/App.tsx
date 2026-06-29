import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Properties from './pages/Properties'
import ActiveListings from './pages/ActiveListings'
import UnderContract from './pages/UnderContract'
import Sold from './pages/Sold'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/active" element={<ActiveListings />} />
          <Route path="/properties/under-contract" element={<UnderContract />} />
          <Route path="/properties/sold" element={<Sold />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
