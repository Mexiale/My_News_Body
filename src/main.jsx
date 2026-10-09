import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import AlphaAccess from './pages/AlphaAccess.jsx'
import CheckIn from './pages/CheckIn.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MentionsLegales from './pages/MentionsLegales.jsx'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite.jsx'
import DroitOubli from './pages/DroitOubli.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/alpha" element={<AlphaAccess />} />
          <Route
            path="/check-in"
            element={
              <ProtectedRoute>
                <CheckIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/droit-oubli" element={<DroitOubli />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
