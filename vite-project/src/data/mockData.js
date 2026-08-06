export const dashboardStats = {
  totalCountries: 195,
  activeEvents: 47,
  avgRiskScore: 3.2,
  recommendationsCount: 12
};

export const eventTrends = [
  { day: 'Mon', events: 12 },
  { day: 'Tue', events: 18 },
  { day: 'Wed', events: 15 },
  { day: 'Thu', events: 22 },
  { day: 'Fri', events: 25 },
  { day: 'Sat', events: 19 },
  { day: 'Sun', events: 16 }
];

export const recentEvents = [
  { id: 1, title: 'US-China Trade Talks Stall', country: 'China', type: 'Trade', sentiment: 'negative', time: '2h ago' },
  { id: 2, title: 'EU Sanctions on Russia Expanded', country: 'Russia', type: 'Sanctions', sentiment: 'negative', time: '4h ago' },
  { id: 3, title: 'India-Pakistan Border Skirmish', country: 'India', type: 'Military', sentiment: 'high', time: '6h ago' },
  { id: 4, title: 'Saudi Oil Production Cut', country: 'Saudi Arabia', type: 'Energy', sentiment: 'neutral', time: '8h ago' },
  { id: 5, title: 'Brazil Election Tensions Rise', country: 'Brazil', type: 'Politics', sentiment: 'medium', time: '12h ago' }
];

export const topCountries = [
  { rank: 1, country: 'China', score: 8.5, events: 12, trend: '+2%', risk: 'high' },
  { rank: 2, country: 'Russia', score: 7.9, events: 9, trend: '-1%', risk: 'high' },
  { rank: 3, country: 'US', score: 7.2, events: 8, trend: 'stable', risk: 'medium' },
  { rank: 4, country: 'India', score: 6.8, events: 11, trend: '+5%', risk: 'medium' },
  { rank: 5, country: 'Iran', score: 6.5, events: 7, trend: '+3%', risk: 'high' },
  { rank: 6, country: 'Brazil', score: 5.9, events: 6, trend: '-2%', risk: 'low' },
  { rank: 7, country: 'Saudi Arabia', score: 5.4, events: 5, trend: 'stable', risk: 'medium' },
  { rank: 8, country: 'Turkey', score: 5.1, events: 4, trend: '+1%', risk: 'medium' }
];

export const countryCompareData = [
  { country: 'US', stability: 85, gdp: 25.5, events: 8, rank: 1, risk: 'low' },
  { country: 'China', stability: 72, gdp: 18.3, events: 12, rank: 2, risk: 'medium' },
  { country: 'Germany', stability: 92, gdp: 4.3, events: 3, rank: 4, risk: 'low' },
  { country: 'India', stability: 68, gdp: 3.4, events: 11, rank: 5, risk: 'medium' },
  { country: 'Brazil', stability: 74, gdp: 1.9, events: 6, rank: 6, risk: 'low' }
];

export const marketData = {
  stocks: [
    { name: 'S&P 500', value: 5287, change: '+1.2%' },
    { name: 'Dow Jones', value: 41785, change: '-0.3%' },
    { name: 'NASDAQ', value: 16786, change: '+2.1%' }
  ],
  metals: [
    { name: 'Gold', price: 2385, change: '+0.8%' },
    { name: 'Silver', price: 28.5, change: '-0.5%' },
    { name: 'Oil WTI', price: 82.3, change: '+1.5%' }
  ],
  trends: [
    { day: 'Mon', value: 5200 },
    { day: 'Tue', value: 5230 },
    { day: 'Wed', value: 5250 },
    { day: 'Thu', value: 5270 },
    { day: 'Fri', value: 5287 },
    { day: 'Sat', value: 5290 },
    { day: 'Sun', value: 5285 }
  ]
};

export const fundData = [
  { sector: 'Tech', allocated: 250, spent: 210, utilization: 84, status: 'green' },
  { sector: 'Energy', allocated: 180, spent: 165, utilization: 92, status: 'yellow' },
  { sector: 'Defense', allocated: 120, spent: 110, utilization: 92, status: 'green' },
  { sector: 'Agriculture', allocated: 90, spent: 75, utilization: 83, status: 'green' }
];

export const recommendations = [
  { id: 1, title: 'Increase Russian assets hedge', description: 'Energy prices rising despite sanctions.', priority: 'high', confidence: 92, country: 'Russia', time: '2024-04-14' },
  { id: 2, title: 'Middle East volatility watch', description: 'Oil production cuts affecting funds.', priority: 'high', confidence: 89, country: 'Saudi Arabia', time: '2024-04-12' },
  { id: 3, title: 'Diversify from China exposure', description: 'Reduce allocation due to escalating trade tensions.', priority: 'medium', confidence: 87, country: 'China', time: '2024-04-15' },
  { id: 4, title: 'Indian market entry opportunity', description: 'Growth stable amid regional tensions.', priority: 'low', confidence: 78, country: 'India', time: '2024-04-13' },
  { id: 5, title: 'Latin America stabilization', description: 'Brazil elections stabilizing markets.', priority: 'low', confidence: 81, country: 'Brazil', time: '2024-04-11' }
];

export const simulationResult = {
  riskScore: 6.8,
  marketVolatility: 'high',
  tradeDrop: 12.5,
  diplomaticTalks: 'ongoing'
};

export const chatHistory = [
  { id: 1, role: 'user', text: "What's the risk in China markets right now?", time: '10:30' },
  { id: 2, role: 'ai', text: 'High risk due to ongoing trade tensions and Taiwan Strait activity. Recommend 15-20% hedge allocation.', time: '10:32' },
  { id: 3, role: 'user', text: 'Russia outlook for energy markets?', time: '10:35' },
  { id: 4, role: 'ai', text: 'Sanctions tightening but oil/gas rerouting via India/Turkey successful. European prices up 18%. Medium risk.', time: '10:37' },
  { id: 5, role: 'user', text: 'India border situation?', time: '10:40' }
];

export const adminSources = [
  { name: 'Reuters API', type: 'news', lastFetched: '2024-04-15 09:00', frequency: 'hourly', status: 'active' },
  { name: 'World Bank Data', type: 'economic', lastFetched: '2024-04-14 16:00', frequency: 'daily', status: 'active' },
  { name: 'StockTwits', type: 'social', lastFetched: '2024-04-15 08:30', frequency: 'realtime', status: 'paused' },
  { name: 'Quandl', type: 'financial', lastFetched: '2024-04-15 07:45', frequency: 'hourly', status: 'active' },
  { name: 'Twitter Geopolitics', type: 'social', lastFetched: '2024-04-15 10:00', frequency: 'realtime', status: 'active' }
];

export const adminUsers = [
  { id: 1, name: 'John Admin', role: 'admin', status: 'active', email: 'john@geopolitics.ai' },
  { id: 2, name: 'Jane Analyst', role: 'user', status: 'active', email: 'jane@geopolitics.ai' },
  { id: 3, name: 'Bob User', role: 'user', status: 'inactive', email: 'bob@geopolitics.ai' },
  { id: 4, name: 'Alice Trader', role: 'user', status: 'active', email: 'alice@geopolitics.ai' }
];
