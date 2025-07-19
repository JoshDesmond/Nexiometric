import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from './Home'

// Lazy load dashboard components
const AutomatiDashboard = lazy(() => import('./AutomatiDashboard'))
const AlgaeMarketingDashboard = lazy(() => import('./AlgaeMarketingDashboard'))

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo/automati" element={
          <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
            <AutomatiDashboard />
          </Suspense>
        } />
        <Route path="/demo/algae-marketing" element={
          <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
            <AlgaeMarketingDashboard />
          </Suspense>
        } />
      </Routes>
    </Router>
  )
}

export default App
