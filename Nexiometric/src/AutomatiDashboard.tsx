import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Target, AlertCircle, CheckCircle } from 'lucide-react';

const ConsultingDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Current KPIs
  const currentKPIs = {
    timeActive: 54, // days since May 25 to July 17
    impressions: 2000,
    networkingEvents: 3,
    leads: 5,
    qualifiedProspects: 4,
    opportunities: 0,
    contracts: 0,
    mentorContacts: 3,
    burnRate: 2500,
    potentialRevenue: { min: 600, max: 1000 } // Two prospects at $300-500 each
  };

  // Derived metrics
  const derivedMetrics = {
    leadConversionRate: (currentKPIs.qualifiedProspects / currentKPIs.leads * 100).toFixed(1),
    leadsPerEvent: (currentKPIs.leads / currentKPIs.networkingEvents).toFixed(1),
    costPerLead: (currentKPIs.burnRate * 2 / currentKPIs.leads).toFixed(0), // ~2 months of burn
    daysPerLead: (currentKPIs.timeActive / currentKPIs.leads).toFixed(1),
    impressionToLeadRate: (currentKPIs.leads / currentKPIs.impressions * 100).toFixed(2)
  };

  // Funnel data - In Person Events
  const inPersonFunnelData = [
    { stage: 'Networking Events', value: 3, percentage: 100 },
    { stage: 'Leads', value: 5, percentage: 166.7 },
    { stage: 'Qualified Prospects', value: 4, percentage: 133.3 },
    { stage: 'Opportunities', value: 0, percentage: 0 },
    { stage: 'Contracts', value: 0, percentage: 0 }
  ];

  // Funnel data - Online Leads (LinkedIn)
  const onlineFunnelData = [
    { stage: 'Impressions', value: 2000, percentage: 100 },
    { stage: 'Connections', value: 1, percentage: 0.05 }, // Estimated - need to track this
    { stage: 'Leads', value: 0, percentage: 0 },
    { stage: 'Qualified Prospects', value: 0, percentage: 0 },
    { stage: 'Opportunities', value: 0, percentage: 0 },
    { stage: 'Contracts', value: 0, percentage: 0 }
  ];



  // Lead source data
  const leadSourceData = [
    { source: 'Networking Events', value: 5 },
    { source: 'LinkedIn', value: 0 }
  ];

  // Projection scenarios
  const projectionData = [
    { month: 'Jul', pessimistic: 0, realistic: 0, optimistic: 500 },
    { month: 'Aug', pessimistic: 0, realistic: 600, optimistic: 1000 },
    { month: 'Sep', pessimistic: 300, realistic: 900, optimistic: 1500 },
    { month: 'Oct', pessimistic: 600, realistic: 1500, optimistic: 2500 },
    { month: 'Nov', pessimistic: 900, realistic: 2100, optimistic: 3500 },
    { month: 'Dec', pessimistic: 1200, realistic: 2700, optimistic: 4500 }
  ];

  // Break-even analysis
  const breakEvenData = [
    { contracts: 0, revenue: 0, expenses: 2500, profit: -2500 },
    { contracts: 1, revenue: 400, expenses: 2500, profit: -2100 },
    { contracts: 2, revenue: 800, expenses: 2500, profit: -1700 },
    { contracts: 3, revenue: 1200, expenses: 2500, profit: -1300 },
    { contracts: 4, revenue: 1600, expenses: 2500, profit: -900 },
    { contracts: 5, revenue: 2000, expenses: 2500, profit: -500 },
    { contracts: 6, revenue: 2400, expenses: 2500, profit: -100 },
    { contracts: 7, revenue: 2800, expenses: 2500, profit: 300 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Solo Consulting KPI Dashboard</h1>
        
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('funnel')}
            className={`px-4 py-2 rounded ${activeTab === 'funnel' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            Sales Funnel
          </button>
          <button
            onClick={() => setActiveTab('projections')}
            className={`px-4 py-2 rounded ${activeTab === 'projections' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            Projections
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-4 py-2 rounded ${activeTab === 'analysis' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            Analysis
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Monthly Burn Rate</h3>
                <DollarSign className="w-4 h-4 text-red-500" />
              </div>
              <p className="text-2xl font-bold text-red-600">${currentKPIs.burnRate}</p>
              <p className="text-xs text-gray-500">Need to cover monthly</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Leads Generated</h3>
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">{currentKPIs.leads}</p>
              <p className="text-xs text-gray-500">{derivedMetrics.leadsPerEvent} per event</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Conversion Rate</h3>
                <Target className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold">{derivedMetrics.leadConversionRate}%</p>
              <p className="text-xs text-gray-500">Leads to prospects</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Days Active</h3>
                <TrendingUp className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-2xl font-bold">{currentKPIs.timeActive}</p>
              <p className="text-xs text-gray-500">{derivedMetrics.daysPerLead} days per lead</p>
            </div>
          </div>
        )}

        {/* Funnel Tab */}
        {activeTab === 'funnel' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">In-Person Sales Funnel</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={inPersonFunnelData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 text-sm text-gray-600">
                  <p><strong>Conversion Rates:</strong></p>
                  <ul className="mt-1 space-y-1">
                    <li>• Events to Leads: 166.7% (5 leads from 3 events)</li>
                    <li>• Leads to Prospects: 80% (4 of 5 leads qualified)</li>
                    <li>• Prospects to Opportunities: 0% (needs improvement)</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Online Sales Funnel (LinkedIn)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={onlineFunnelData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 text-sm text-gray-600">
                  <p><strong>Note:</strong> Small values (1 connection) are barely visible at this scale.</p>
                  <p><strong>Conversion Rates:</strong></p>
                  <ul className="mt-1 space-y-1">
                    <li>• Impressions to Connections: 0.05% (1 of 2000)</li>
                    <li>• Connections to Leads: 0% (no leads from online)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Lead Sources Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={leadSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => `${entry.source}: ${entry.value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Array.from({ length: leadSourceData.length }, (_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Projections Tab */}
        {activeTab === 'projections' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Revenue Projections (6 Months)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pessimistic" stroke="#ef4444" name="Pessimistic" />
                  <Line type="monotone" dataKey="realistic" stroke="#3b82f6" name="Realistic" />
                  <Line type="monotone" dataKey="optimistic" stroke="#10b981" name="Optimistic" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Break-Even Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={breakEvenData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="contracts" label={{ value: 'Number of Contracts', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" name="Revenue" />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" />
                  <Line type="monotone" dataKey="profit" stroke="#3b82f6" name="Profit/Loss" />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-600 mt-2">Break-even at ~7 contracts per month (assuming $400 average)</p>
            </div>
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Performance Analysis</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Strong Lead Quality</h4>
                    <p className="text-sm text-gray-600">80% lead-to-prospect conversion rate shows excellent qualification</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Effective Networking</h4>
                    <p className="text-sm text-gray-600">1.67 leads per event is strong for B2B consulting</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Conversion Bottleneck</h4>
                    <p className="text-sm text-gray-600">0% prospect-to-opportunity conversion needs immediate attention</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">LinkedIn Underutilized</h4>
                    <p className="text-sm text-gray-600">2000 impressions yielded 0 leads - content strategy needs work</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Key Metrics to Hit for Profitability</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium">Minimum Monthly Targets</h4>
                  <ul className="text-sm text-gray-600 space-y-1 mt-2">
                    <li>• 7 contracts @ $400 avg</li>
                    <li>• OR 5 contracts @ $600 avg</li>
                    <li>• OR 3 contracts @ $1000 avg</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium">Activity Metrics Needed</h4>
                  <ul className="text-sm text-gray-600 space-y-1 mt-2">
                    <li>• 35 leads/month (5x current rate)</li>
                    <li>• 28 qualified prospects/month</li>
                    <li>• 10-12 networking events/month</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Immediate Action Items</h4>
                <ol className="text-sm text-yellow-700 space-y-1">
                  <li>1. Follow up with 4 qualified prospects to convert to opportunities</li>
                  <li>2. Increase networking frequency to 3-4 events per week</li>
                  <li>3. Develop LinkedIn content strategy for lead generation</li>
                  <li>4. Consider raising rates to $600-800 minimum</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultingDashboard; 
