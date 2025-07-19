import { Link } from 'react-router-dom'
import Navigation from './components/Navigation'

function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <div id="hero" className="container mx-auto px-6 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Simplified container with solid background */}
          <div className="relative bg-slate-800 rounded-3xl border border-cyan-500/20 shadow-lg">
            <div className="px-8 py-16">
              <h1 className="text-6xl font-light text-white font-inter mb-6 tracking-tight">
                Nexiometric
              </h1>
              <p className="text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto">
                Custom KPI dashboards and CRM software built specifically for your business. 
                No bloat, no unnecessary features, just the analytics and tools you actually need 
                to understand and grow your business.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div id="problem" className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-white mb-8">The Problem with One-Size-Fits-All</h2>
          <div className="space-y-6 text-slate-200">
            <p className="text-lg">
              You've probably looked at HubSpot, Salesforce, or Pipedrive. They're powerful tools, 
              but they come with complexity and costs that don't always make sense for growing businesses.
            </p>
            <p className="text-lg">
              Most businesses end up using maybe 20% of the features while paying for 100% of the platform. 
              Worse, you're forced to adapt your processes to fit their system, not the other way around.
            </p>
            <p className="text-lg">
              What if you could have exactly what you need? A dashboard that tracks your specific KPIs, 
              a CRM that matches your sales process, and integrations with the tools you already use.
            </p>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div id="solution" className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-white mb-8 text-center">Built For Your Business</h2>
          <div className="relative bg-slate-800 rounded-3xl border border-cyan-500/20 shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-slate-700 border border-cyan-500/10 hover:border-cyan-400/30 transition-all duration-300">
                <h3 className="text-xl font-medium text-white mb-3">Custom Analytics</h3>
                <p className="text-slate-200">
                  I'll connect your data sources using webhooks and APIs, store everything in a 
                  Supabase database, and build dashboards that show exactly what matters to you. 
                  Real-time metrics, historical trends, whatever helps you make better decisions.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-slate-700 border border-cyan-500/10 hover:border-cyan-400/30 transition-all duration-300">
                <h3 className="text-xl font-medium text-white mb-3">Integrated CRM</h3>
                <p className="text-slate-200">
                  Track leads, manage customer relationships, and automate follow-ups. Everything 
                  connects to your existing tools and workflows. No learning curve, no feature creep, 
                  just a system that works the way you do.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-slate-700 border border-cyan-500/10 hover:border-cyan-400/30 transition-all duration-300">
                <h3 className="text-xl font-medium text-white mb-3">Your Data, Your Way</h3>
                <p className="text-slate-200">
                  Whether it's sales data from Stripe, marketing metrics from social platforms, 
                  or operational data from internal systems, I'll bring it all together into a 
                  single source of truth.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-slate-700 border border-cyan-500/10 hover:border-cyan-400/30 transition-all duration-300">
                <h3 className="text-xl font-medium text-white mb-3">Fast Implementation</h3>
                <p className="text-slate-200">
                  We're not building enterprise software here. We're building exactly what you need 
                  to run your business better. That means weeks to deployment, not months of 
                  configuration and training.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div id="demo" className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light text-white mb-6">See It In Action</h2>
          <p className="text-lg text-slate-200 mb-10">
            Check out these demo dashboards to get a sense of what's possible. Each one is 
            completely custom-built for different business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/demo/automati" 
              className="px-8 py-4 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all duration-200 text-lg text-center shadow-lg border border-cyan-500/30 hover:border-cyan-400/50"
            >
              Automati Dashboard
            </Link>
            <Link 
              to="/demo/algae-marketing" 
              className="px-8 py-4 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all duration-200 text-lg text-center shadow-lg border border-cyan-500/30 hover:border-cyan-400/50"
            >
              Algae Marketing Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-white mb-8 text-center">How It Works</h2>
          <div className="relative bg-slate-800 rounded-3xl border border-cyan-500/20 shadow-lg p-8">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="text-2xl text-cyan-400 font-light bg-cyan-500/10 rounded-full w-12 h-12 flex items-center justify-center">1</div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">We Talk</h3>
                  <p className="text-slate-200">
                    I'll learn about your business, what metrics matter, what processes you want to 
                    streamline, and what tools you're already using.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-2xl text-cyan-400 font-light bg-cyan-500/10 rounded-full w-12 h-12 flex items-center justify-center">2</div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">I Build</h3>
                  <p className="text-slate-200">
                    Using React, Tailwind, and Supabase, I'll create your custom dashboard and CRM. 
                    I'll integrate your existing tools and set up automated data flows.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-2xl text-cyan-400 font-light bg-cyan-500/10 rounded-full w-12 h-12 flex items-center justify-center">3</div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">You Grow</h3>
                  <p className="text-slate-200">
                    With clear visibility into your business metrics and streamlined customer management, 
                    you can focus on what matters: growing your business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="cta" className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light text-white mb-6">Ready to Build Something Better?</h2>
          <p className="text-lg text-slate-200 mb-8">
            Let's talk about how custom software can help you move faster and smarter than 
            your competition.
          </p>
          <a 
            href="https://automatisolutions.com/#contact" 
            className="inline-block px-8 py-4 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all duration-200 text-lg font-medium shadow-lg border border-cyan-500/30 hover:border-cyan-400/50"
          >
            Get Started
          </a>
          <p className="text-sm text-slate-400 mt-6">
            A product of <a href="https://automatisolutions.com" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200">Automati Solutions</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home