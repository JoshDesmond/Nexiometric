import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-light text-white font-inter mb-8">
        Nexiometric
      </h1>
      <div className="flex gap-4">
        <Link 
          to="/demo/automati" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Automati Dashboard
        </Link>
        <Link 
          to="/demo/algae-marketing" 
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Algae Marketing Dashboard
        </Link>
      </div>
    </div>
  )
}

export default Home 