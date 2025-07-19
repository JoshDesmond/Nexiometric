import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AutomatiDashboard from './AutomatiDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <h1 className="text-6xl font-light text-white font-inter">
              Nexiometric
            </h1>
          </div>
        } />
        <Route path="/demo/automati" element={<AutomatiDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
