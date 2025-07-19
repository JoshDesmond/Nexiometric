import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import AutomatiDashboard from './AutomatiDashboard'
import AlgaeMarketingDashboard from './AlgaeMarketingDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo/automati" element={<AutomatiDashboard />} />
        <Route path="/demo/algae-marketing" element={<AlgaeMarketingDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
