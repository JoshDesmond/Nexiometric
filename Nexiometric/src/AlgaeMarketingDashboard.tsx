import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Zap, Droplets } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  color?: string;
}

interface SegmentData {
  name: string;
  icon: string;
  color: string;
  metrics: {
    leads: number;
    conversion_rate: number;
    avg_deal_size: number;
    ltv: number;
    cac: number;
    top_content: string;
    top_channel: string;
  };
}

interface SegmentCardProps {
  segment: string;
  data: SegmentData;
}

const AlgaeMarketingDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  
  // Mock data that demonstrates multi-market attribution
  const mockData = {
    segments: {
      health_conscious: {
        name: "Health-Conscious Consumers",
        icon: "💚",
        color: "bg-green-500",
        metrics: {
          leads: 1247,
          conversion_rate: 3.2,
          avg_deal_size: 89,
          ltv: 267,
          cac: 23,
          top_content: "Algae Benefits Blog Series",
          top_channel: "Instagram + Email"
        }
      },
      fitness_enthusiasts: {
        name: "Fitness Enthusiasts", 
        icon: "💪",
        color: "bg-orange-500",
        metrics: {
          leads: 892,
          conversion_rate: 4.1,
          avg_deal_size: 124,
          ltv: 342,
          cac: 31,
          top_content: "Workout + Algae Videos",
          top_channel: "TikTok + YouTube"
        }
      },
      biohackers: {
        name: "Biohackers/Nootropics",
        icon: "🧠", 
        color: "bg-purple-500",
        metrics: {
          leads: 423,
          conversion_rate: 7.8,
          avg_deal_size: 198,
          ltv: 524,
          cac: 67,
          top_content: "Bioavailability Research",
          top_channel: "Reddit + Podcasts"
        }
      },
      poultry_farms: {
        name: "Poultry Operations",
        icon: "🐔",
        color: "bg-yellow-500", 
        metrics: {
          leads: 34,
          conversion_rate: 23.5,
          avg_deal_size: 12400,
          ltv: 89000,
          cac: 890,
          top_content: "Farm Efficiency Whitepapers",
          top_channel: "LinkedIn + Trade Shows"
        }
      }
    },
    
    contentAttribution: [
      { content: "Algae Smoothie Recipe Video", segment: "fitness", views: 45600, conversions: 187, channel: "TikTok" },
      { content: "Bioavailability Deep Dive", segment: "biohackers", views: 8900, conversions: 89, channel: "YouTube" },
      { content: "Farm Feed Efficiency Study", segment: "poultry", views: 1200, conversions: 8, channel: "LinkedIn" },
      { content: "Morning Routine Blog Post", segment: "health_conscious", views: 23400, conversions: 76, channel: "Instagram" },
      { content: "Podcast: Future of Nutrition", segment: "biohackers", views: 5600, conversions: 34, channel: "Spotify" }
    ],
    
    multiTouchJourneys: [
      { 
        journey: "TikTok Video → Email → Purchase",
        segment: "fitness",
        count: 156,
        avg_time_to_convert: "3.2 days",
        revenue: 19344
      },
      {
        journey: "LinkedIn Ad → Whitepaper → Demo → Deal",
        segment: "poultry", 
        count: 8,
        avg_time_to_convert: "45 days",
        revenue: 99200
      },
      {
        journey: "Reddit Post → Blog → Email Series → Purchase",
        segment: "biohackers",
        count: 43,
        avg_time_to_convert: "12 days", 
        revenue: 8514
      }
    ]
  };

  const totalRevenue = Object.values(mockData.segments).reduce((sum, segment) => 
    sum + (segment.metrics.leads * segment.metrics.conversion_rate / 100 * segment.metrics.avg_deal_size), 0
  );

  const totalLeads = Object.values(mockData.segments).reduce((sum, segment) => sum + segment.metrics.leads, 0);

  const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, color = "text-blue-600" }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {Math.abs(change)}% vs last month
            </div>
          )}
        </div>
        <Icon className={`h-8 w-8 ${color}`} />
      </div>
    </div>
  );

  const SegmentCard: React.FC<SegmentCardProps> = ({ data }) => {
    const roi = ((data.metrics.ltv - data.metrics.cac) / data.metrics.cac * 100).toFixed(0);
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">{data.icon}</span>
          <h3 className="text-lg font-semibold text-gray-900">{data.name}</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Leads</p>
            <p className="text-xl font-bold">{data.metrics.leads.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Conversion Rate</p>
            <p className="text-xl font-bold">{data.metrics.conversion_rate}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Avg Deal Size</p>
            <p className="text-xl font-bold">${data.metrics.avg_deal_size}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">ROI</p>
            <p className={`text-xl font-bold ${parseInt(roi) > 200 ? 'text-green-600' : 'text-orange-600'}`}>
              {roi}%
            </p>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-1">Top Content:</p>
          <p className="text-sm font-medium text-gray-900">{data.metrics.top_content}</p>
          <p className="text-sm text-gray-600 mt-2 mb-1">Top Channel:</p>
          <p className="text-sm font-medium text-gray-900">{data.metrics.top_channel}</p>
        </div>
        
        <div className="mt-4">
          <div className={`h-2 rounded-full ${data.color} opacity-20`}>
            <div 
              className={`h-2 rounded-full ${data.color}`}
              style={{ width: `${Math.min(data.metrics.conversion_rate * 10, 100)}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Droplets className="h-8 w-8 text-green-600 mr-3" />
                Algae Supplement Marketing Intelligence
              </h1>
              <p className="text-gray-600 mt-2">Red Bull-style multi-market attribution & performance tracking</p>
            </div>
            <select 
              className="px-4 py-2 border rounded-lg bg-white"
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            title="Total Revenue" 
            value={`$${Math.round(totalRevenue).toLocaleString()}`}
            change={23.5}
            icon={DollarSign}
            color="text-green-600"
          />
          <MetricCard 
            title="Total Leads" 
            value={totalLeads.toLocaleString()}
            change={18.2}
            icon={Users}
            color="text-blue-600"
          />
          <MetricCard 
            title="Active Campaigns" 
            value="12"
            change={33.3}
            icon={Target}
            color="text-purple-600"
          />
          <MetricCard 
            title="Avg Response Time" 
            value="2.3 hrs"
            change={-15.6}
            icon={Zap}
            color="text-orange-600"
          />
        </div>

        {/* Market Segments Performance */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Segments Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(mockData.segments).map(([key, data]) => (
              <SegmentCard key={key} segment={key} data={data} />
            ))}
          </div>
        </div>

        {/* Content Attribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Content Attribution by Segment</h3>
            <div className="space-y-4">
              {mockData.contentAttribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.content}</p>
                    <p className="text-sm text-gray-600">{item.channel} • {item.views.toLocaleString()} views</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{item.conversions} conversions</p>
                    <p className="text-sm text-gray-600">
                      {((item.conversions / item.views) * 100).toFixed(2)}% CVR
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Multi-Touch Customer Journeys</h3>
            <div className="space-y-4">
              {mockData.multiTouchJourneys.map((journey, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">{journey.journey}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Count</p>
                      <p className="font-bold">{journey.count}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Avg. Time</p>
                      <p className="font-bold">{journey.avg_time_to_convert}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revenue</p>
                      <p className="font-bold text-green-600">${journey.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Alerts */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Marketing Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <p className="text-green-800">
                <strong>Biohacker segment</strong> conversion rate up 45% after podcast mention
              </p>
              <span className="ml-auto text-sm text-green-600">2 min ago</span>
            </div>
            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <p className="text-blue-800">
                <strong>New B2B lead</strong> from Iowa poultry farm - Deal value: $18,500
              </p>
              <span className="ml-auto text-sm text-blue-600">5 min ago</span>
            </div>
            <div className="flex items-center p-3 bg-orange-50 border border-orange-200 rounded">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
              <p className="text-orange-800">
                <strong>TikTok video</strong> going viral - 15K views in 2 hours (fitness segment)
              </p>
              <span className="ml-auto text-sm text-orange-600">12 min ago</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Built with React + TypeScript + Tailwind • Real-time data via Supabase + PostgreSQL</p>
          <p className="mt-1">Total cost: ~$50/month vs $500+/month for equivalent SaaS stack</p>
        </div>
      </div>
    </div>
  );
};

export default AlgaeMarketingDashboard;
