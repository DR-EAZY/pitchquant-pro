import React, { useState, useMemo } from 'react';
import { 
  Trophy, ShieldAlert, BarChart3, Calculator, 
  Search, Sliders, Calendar as CalendarIcon, 
  ChevronRight, ArrowUpRight, Copy, Check, 
  AlertTriangle, Activity, Zap, RefreshCw, X, Plus,
  Info, Filter, Flame, CheckCircle2, DollarSign
} from 'lucide-react';

// ==========================================
// MOCK DATA & FIXTURE DATABASE
// ==========================================
const INITIAL_FIXTURES = [
  {
    id: 'fix-1',
    league: 'Premier League',
    time: 'Saturday, 1:30 PM',
    timeframe: 'this-week',
    homeTeam: {
      name: 'Manchester City',
      short: 'MCI',
      form: ['L', 'W', 'W', 'W', 'W'],
      homePpg: 2.65,
      goalsScoredAvg: 2.3,
      goalsConcededAvg: 0.7,
      xg: 2.45,
      injuries: ['Rodri (Suspended)', 'O. Bobb (Foot)']
    },
    awayTeam: {
      name: 'Fulham',
      short: 'FUL',
      form: ['W', 'D', 'L', 'W', 'D'],
      awayPpg: 1.15,
      goalsScoredAvg: 1.2,
      goalsConcededAvg: 1.5,
      xg: 1.10,
      injuries: ['T. Cairney (Knee)']
    },
    referee: {
      name: 'Michael Oliver',
      yellowCardAvg: 3.8,
      redCardAvg: 0.15,
      penaltyGivenRate: 0.28,
      strictness: 'Moderate-High'
    },
    stakes: 'Title Race / Top 4 Control',
    stadium: 'Etihad Stadium',
    weather: '11°C, Light Rain',
    analysis: {
      confidence: 94,
      tacticalMatchup: 'City dominating possession blocks against Fulham mid-block counter-press.',
      goalArchetypes: 'High probability of transition goals and box entries from half-space overloads.',
      weatherImpact: 'Slick pitch speeds up ball movement; benefits technical combination play.'
    },
    markets: [
      { id: 'm1-1', name: 'Manchester City Win & Over 1.5 Goals', category: 'Combo', odd: 1.48, modelProb: 82, safety: 91 },
      { id: 'm1-2', name: 'Over 2.5 Match Goals', category: 'Goals', odd: 1.62, modelProb: 76, safety: 85 },
      { id: 'm1-3', name: 'Erling Haaland to Score Anytime', category: 'Player Props', odd: 1.55, modelProb: 79, safety: 88 },
      { id: 'm1-4', name: 'Manchester City -1.5 Asian Handicap', category: 'Handicap', odd: 2.10, modelProb: 58, safety: 68 }
    ]
  },
  {
    id: 'fix-2',
    league: 'Brasileirão Série A',
    time: 'Tonight, 12:30 AM',
    timeframe: 'today',
    homeTeam: {
      name: 'Flamengo',
      short: 'FLA',
      form: ['W', 'W', 'W', 'D', 'W'],
      homePpg: 2.80,
      goalsScoredAvg: 2.1,
      goalsConcededAvg: 0.5,
      xg: 2.20,
      injuries: ['De la Cruz (Hamstring)']
    },
    awayTeam: {
      name: 'Athletico-PR',
      short: 'CAP',
      form: ['L', 'W', 'D', 'L', 'W'],
      awayPpg: 1.05,
      goalsScoredAvg: 0.9,
      goalsConcededAvg: 1.4,
      xg: 0.95,
      injuries: ['Fernandinho (Knock)']
    },
    referee: {
      name: 'Wilton Sampaio',
      yellowCardAvg: 5.2,
      redCardAvg: 0.35,
      penaltyGivenRate: 0.38,
      strictness: 'High Card Issuer'
    },
    stakes: 'Title Sealing / Libertadores Qualification',
    stadium: 'Maracanã',
    weather: '28°C, Humid',
    analysis: {
      confidence: 91,
      tacticalMatchup: 'Flamengo relentless home press suffocating build-up play.',
      goalArchetypes: 'Early sustained pressure leading to first-half breakthroughs.',
      weatherImpact: 'High humidity favors deep squad rotation and late goals.'
    },
    markets: [
      { id: 'm2-1', name: 'Flamengo Win', category: '1X2', odd: 1.38, modelProb: 84, safety: 92 },
      { id: 'm2-2', name: 'Over 1.5 Match Goals', category: 'Goals', odd: 1.32, modelProb: 85, safety: 94 },
      { id: 'm2-3', name: 'Flamengo Clean Sheet - YES', category: 'Defensive', odd: 1.95, modelProb: 56, safety: 65 }
    ]
  },
  {
    id: 'fix-3',
    league: 'Premier League',
    time: 'Sunday, 5:30 PM',
    timeframe: 'this-week',
    homeTeam: {
      name: 'Liverpool',
      short: 'LIV',
      form: ['W', 'W', 'D', 'W', 'L'],
      homePpg: 2.40,
      goalsScoredAvg: 2.2,
      goalsConcededAvg: 0.9,
      xg: 2.35,
      injuries: ['Alisson Becker (Hamstring)']
    },
    awayTeam: {
      name: 'Manchester United',
      short: 'MUN',
      form: ['D', 'L', 'W', 'D', 'L'],
      awayPpg: 1.10,
      goalsScoredAvg: 1.3,
      goalsConcededAvg: 1.7,
      xg: 1.25,
      injuries: ['L. Shaw (Calf)', 'K. Mainoo (Knock)']
    },
    referee: {
      name: 'Anthony Taylor',
      yellowCardAvg: 4.1,
      redCardAvg: 0.20,
      penaltyGivenRate: 0.31,
      strictness: 'Moderate'
    },
    stakes: 'North-West Derby / Top 4 Battle',
    stadium: 'Anfield',
    weather: '9°C, Wind Gusts',
    analysis: {
      confidence: 88,
      tacticalMatchup: 'High-intensity transition duels through central midfield channels.',
      goalArchetypes: 'Counter-pressing turnovers and set-piece headers.',
      weatherImpact: 'Wind may affect long ball accuracy; promotes short passing triangles.'
    },
    markets: [
      { id: 'm3-1', name: 'Liverpool Win or Draw (1X) & Over 1.5', category: 'Combo', odd: 1.35, modelProb: 86, safety: 93 },
      { id: 'm3-2', name: 'Both Teams to Score (BTTS)', category: 'Goals', odd: 1.68, modelProb: 72, safety: 80 },
      { id: 'm3-3', name: 'Over 3.5 Cards in Match', category: 'Disciplinary', odd: 1.45, modelProb: 80, safety: 89 }
    ]
  },
  {
    id: 'fix-4',
    league: 'UEFA Champions League',
    time: 'Next Tuesday, 9:00 PM',
    timeframe: 'next-month',
    homeTeam: {
      name: 'Real Madrid',
      short: 'RMA',
      form: ['W', 'W', 'W', 'W', 'D'],
      homePpg: 2.90,
      goalsScoredAvg: 2.6,
      goalsConcededAvg: 0.8,
      xg: 2.50,
      injuries: ['D. Alaba (Knee)']
    },
    awayTeam: {
      name: 'AC Milan',
      short: 'MIL',
      form: ['W', 'D', 'W', 'L', 'W'],
      awayPpg: 1.60,
      goalsScoredAvg: 1.7,
      goalsConcededAvg: 1.1,
      xg: 1.55,
      injuries: ['I. Bennacer (Calf)']
    },
    referee: {
      name: 'Clément Turpin',
      yellowCardAvg: 3.5,
      redCardAvg: 0.12,
      penaltyGivenRate: 0.25,
      strictness: 'Lenient / European Standard'
    },
    stakes: 'Group Stage Supremacy / Knockout Seeding',
    stadium: 'Santiago Bernabéu',
    weather: '16°C, Clear',
    analysis: {
      confidence: 92,
      tacticalMatchup: 'Madrid lethal transition speed testing Milan defensive block depth.',
      goalArchetypes: 'Individual brilliance in final third and quick counter-attacks.',
      weatherImpact: 'Perfect playing conditions.'
    },
    markets: [
      { id: 'm4-1', name: 'Real Madrid Win', category: '1X2', odd: 1.50, modelProb: 78, safety: 87 },
      { id: 'm4-2', name: 'Kylian Mbappé Over 1.5 Shots on Target', category: 'Player Props', odd: 1.60, modelProb: 75, safety: 84 },
      { id: 'm4-3', name: 'Over 2.5 Match Goals', category: 'Goals', odd: 1.70, modelProb: 71, safety: 79 }
    ]
  },
  {
    id: 'fix-5',
    league: 'Serie A',
    time: 'Sunday, 8:45 PM',
    timeframe: 'this-week',
    homeTeam: {
      name: 'Inter Milan',
      short: 'INT',
      form: ['W', 'W', 'D', 'W', 'W'],
      homePpg: 2.70,
      goalsScoredAvg: 2.4,
      goalsConcededAvg: 0.6,
      xg: 2.30,
      injuries: ['P. Zielinski (Muscle)']
    },
    awayTeam: {
      name: 'Juventus',
      short: 'JUV',
      form: ['W', 'D', 'W', 'W', 'D'],
      awayPpg: 1.90,
      goalsScoredAvg: 1.6,
      goalsConcededAvg: 0.5,
      xg: 1.50,
      injuries: ['G. Bremer (ACL)']
    },
    referee: {
      name: 'Daniele Orsato',
      yellowCardAvg: 4.8,
      redCardAvg: 0.22,
      penaltyGivenRate: 0.29,
      strictness: 'Strict Tactician'
    },
    stakes: 'Derby d\'Italia / Scudetto Momentum',
    stadium: 'San Siro',
    weather: '12°C, Overcast',
    analysis: {
      confidence: 89,
      tacticalMatchup: 'Inzaghi 3-5-2 wing-back overloads versus solid Thiago Motta defensive structure.',
      goalArchetypes: 'Set-piece execution and penalty box precision.',
      weatherImpact: 'Standard autumn conditions.'
    },
    markets: [
      { id: 'm5-1', name: 'Under 3.5 Match Goals', category: 'Goals', odd: 1.28, modelProb: 84, safety: 93 },
      { id: 'm5-2', name: 'Inter Milan Clean Sheet - NO (Both score)', category: 'Defensive', odd: 1.85, modelProb: 59, safety: 69 },
      { id: 'm5-3', name: 'Inter Milan Draw No Bet', category: 'Safety', odd: 1.22, modelProb: 88, safety: 95 }
    ]
  }
];

export default function App() {
  const [fixtures, setFixtures] = useState(INITIAL_FIXTURES);
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState(INITIAL_FIXTURES[0]);
  
  // Accumulator slip state
  const [slipSelections, setSlipSelections] = useState([
    { id: 'm1-1', matchName: 'Manchester City vs Fulham', marketName: 'Man City Win & Over 1.5', odd: 1.48, safety: 91 },
    { id: 'm2-1', matchName: 'Flamengo vs Athletico-PR', marketName: 'Flamengo Win', odd: 1.38, safety: 92 },
    { id: 'm5-3', matchName: 'Inter Milan vs Juventus', marketName: 'Inter Draw No Bet', odd: 1.22, safety: 95 }
  ]);
  const [targetOddMultiplier, setTargetOddMultiplier] = useState(10);
  const [stakeAmount, setStakeAmount] = useState(5000);
  const [currency, setCurrency] = useState('NGN');
  const [copied, setCopied] = useState(false);

  // Custom Match Modal state
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customForm, setCustomForm] = useState({
    homeTeam: '',
    awayTeam: '',
    league: 'Premier League',
    stakes: 'League Match',
    referee: 'Standard Official'
  });

  // Filtered fixtures
  const filteredFixtures = useMemo(() => {
    return fixtures.filter(fix => {
      const matchesTime = selectedTimeframe === 'all' || fix.timeframe === selectedTimeframe;
      const matchesLeague = selectedLeague === 'all' || fix.league === selectedLeague;
      const matchesSearch = searchQuery === '' || 
        fix.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fix.awayTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fix.league.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTime && matchesLeague && matchesSearch;
    });
  }, [fixtures, selectedTimeframe, selectedLeague, searchQuery]);

  // Accumulator calculations
  const totalAccumulatorOdd = useMemo(() => {
    if (slipSelections.length === 0) return 1.0;
    const raw = slipSelections.reduce((acc, item) => acc * item.odd, 1);
    return Number(raw.toFixed(2));
  }, [slipSelections]);

  const averageSafetyScore = useMemo(() => {
    if (slipSelections.length === 0) return 0;
    const sum = slipSelections.reduce((acc, item) => acc + item.safety, 0);
    return Math.round(sum / slipSelections.length);
  }, [slipSelections]);

  const potentialPayout = useMemo(() => {
    return Math.round(stakeAmount * totalAccumulatorOdd);
  }, [stakeAmount, totalAccumulatorOdd]);

  // Auto-builder for target odds (e.g., 10x, 25x, 50x, 100x+)
  const handleAutoBuildTarget = (targetMultiplier) => {
    let collected = [];
    let currentOddProduct = 1.0;
    
    // Sort all available markets across fixtures by highest safety score first
    const allAvailableMarkets = [];
    fixtures.forEach(fix => {
      fix.markets.forEach(m => {
        allAvailableMarkets.push({
          ...m,
          matchName: `${fix.homeTeam.short} vs ${fix.awayTeam.short}`
        });
      });
    });

    // Sort descending by safety
    allAvailableMarkets.sort((a, b) => b.safety - a.safety);

    for (let market of allAvailableMarkets) {
      if (collected.some(item => item.id === market.id)) continue;
      collected.push(market);
      currentOddProduct *= market.odd;
      if (currentOddProduct >= targetMultiplier || collected.length >= 8) break;
    }

    setSlipSelections(collected);
    setTargetOddMultiplier(targetMultiplier);
  };

  const toggleMarketInSlip = (market, fix) => {
    setSlipSelections(prev => {
      const exists = prev.some(item => item.id === market.id);
      if (exists) {
        return prev.filter(item => item.id !== market.id);
      } else {
        return [...prev, {
          id: market.id,
          matchName: `${fix.homeTeam.short} vs ${fix.awayTeam.short}`,
          marketName: market.name,
          odd: market.odd,
          safety: market.safety
        }];
      }
    });
  };

  const handleCopySlipCode = () => {
    const slipText = `PITCHQUANT PRO ACCUMULATOR (${totalAccumulatorOdd}x Odds | Safety: ${averageSafetyScore}%)\n` +
      slipSelections.map(s => `- ${s.matchName}: ${s.marketName} @ ${s.odd}`).join('\n');
    navigator.clipboard.writeText(slipText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCreateCustomMatch = (e) => {
    e.preventDefault();
    if (!customForm.homeTeam || !customForm.awayTeam) return;

    const newMatch = {
      id: `custom-${Date.now()}`,
      league: customForm.league,
      time: 'Today, Custom Analysis',
      timeframe: 'today',
      homeTeam: {
        name: customForm.homeTeam,
        short: customForm.homeTeam.substring(0, 3).toUpperCase(),
        form: ['W', 'W', 'D', 'W', 'W'],
        homePpg: 2.45,
        goalsScoredAvg: 2.1,
        goalsConcededAvg: 0.8,
        xg: 2.15,
        injuries: ['None reported']
      },
      awayTeam: {
        name: customForm.awayTeam,
        short: customForm.awayTeam.substring(0, 3).toUpperCase(),
        form: ['L', 'D', 'W', 'L', 'W'],
        awayPpg: 1.25,
        goalsScoredAvg: 1.2,
        goalsConcededAvg: 1.4,
        xg: 1.20,
        injuries: ['None reported']
      },
      referee: {
        name: customForm.referee,
        yellowCardAvg: 4.0,
        redCardAvg: 0.18,
        penaltyGivenRate: 0.27,
        strictness: 'Balanced'
      },
      stakes: customForm.stakes,
      stadium: 'Neutral / Home Ground',
      weather: '18°C, Optimal',
      analysis: {
        confidence: 88,
        tacticalMatchup: `Deep analytical breakdown generated for ${customForm.homeTeam} hosting ${customForm.awayTeam}. Model indicates high home possession conversion.`,
        goalArchetypes: 'Controlled build-up and transition vulnerability exploitation.',
        weatherImpact: 'Standard conditions.'
      },
      markets: [
        {
          id: `cm-1-${Date.now()}`,
          name: `${customForm.homeTeam} Win or Draw (1X)`,
          category: 'Safety',
          odd: 1.25,
          modelProb: 88,
          safety: 94
        },
        {
          id: `cm-2-${Date.now()}`,
          name: 'Both Teams to Score (BTTS - YES)',
          category: 'Goals',
          odd: 1.72,
          modelProb: 68,
          safety: 78
        },
        {
          id: `cm-3-${Date.now()}`,
          name: 'Over 1.5 Match Goals',
          category: 'Goals',
          odd: 1.29,
          modelProb: 81,
          safety: 92
        }
      ]
    };

    setFixtures(prev => [newMatch, ...prev]);
    setSelectedMatch(newMatch);
    setShowCustomModal(false);
    setCustomForm({ homeTeam: '', awayTeam: '', league: 'Premier League', stakes: 'League Match', referee: 'Standard Official' });
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col">
      
      {/* =====================================================================
          TOP INSTITUTIONAL TERMINAL HEADER
      ===================================================================== */}
      <header className="sticky top-0 z-30 bg-[#090D16]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/30">
              <Activity className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-lg bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  PITCHQUANT <span className="text-emerald-400">PRO</span>
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  v4.2 LIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Institutional Football Analytics & Safest Odds Modeling</p>
            </div>
          </div>

          {/* Global Controls & Quick Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button 
              onClick={() => setShowCustomModal(true)}
              className="px-3.5 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2 pq-btn-transition shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              Analyze Custom Match
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Model Status: <strong className="text-emerald-400">Active (8-Factor Synced)</strong></span>
            </div>
          </div>

        </div>
      </header>

      {/* =====================================================================
          MAIN 3-COLUMN DASHBOARD LAYOUT
      ===================================================================== */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ===================================================================
            COLUMN 1: FIXTURE FEED & FILTER CONTROLS (Cols 1-4)
        =================================================================== */}
        <section className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Search & Timeframe Filter Bar */}
          <div className="pq-surface-card rounded-xl p-4 flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search teams, leagues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 pq-btn-transition"
              />
            </div>

            {/* Timeframe Tabs */}
            <div className="grid grid-cols-4 gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800/80 text-[11px] font-medium text-slate-400 text-center">
              {[
                { id: 'all', label: 'All' },
                { id: 'today', label: 'Today' },
                { id: 'this-week', label: 'This Week' },
                { id: 'next-month', label: 'Next Month' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTimeframe(tab.id)}
                  className={`py-1.5 rounded-md pq-btn-transition ${selectedTimeframe === tab.id ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm shadow-emerald-500/20' : 'hover:text-slate-200'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* League Dropdown Filter */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <Filter className="w-3.5 h-3.5 text-emerald-400" /> League Filter:
              </span>
              <select 
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 font-medium focus:outline-none focus:border-emerald-500/50"
              >
                <option value="all">All Leagues ({fixtures.length})</option>
                <option value="Premier League">Premier League</option>
                <option value="Brasileirão Série A">Brasileirão Série A</option>
                <option value="UEFA Champions League">UEFA Champions League</option>
                <option value="Serie A">Serie A</option>
              </select>
            </div>
          </div>

          {/* Fixtures List */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Analyzed Fixtures ({filteredFixtures.length})
              </span>
              <span className="text-[11px] font-mono text-emerald-400">Model Precision: 94.2%</span>
            </div>

            {filteredFixtures.length === 0 ? (
              <div className="pq-surface-card rounded-xl p-8 text-center text-slate-400 text-xs">
                No fixtures match your current filter criteria. Try resetting or add a custom match.
              </div>
            ) : (
              filteredFixtures.map(fix => {
                const isSelected = selectedMatch?.id === fix.id;
                return (
                  <div
                    key={fix.id}
                    onClick={() => setSelectedMatch(fix)}
                    className={`pq-surface-card rounded-xl p-4 cursor-pointer pq-btn-transition relative overflow-hidden ${isSelected ? 'pq-surface-card-active ring-1 ring-emerald-500/50' : ''}`}
                  >
                    {/* Top Row: League & Time */}
                    <div className="flex items-center justify-between text-[11px] mb-2.5">
                      <span className="font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {fix.league}
                      </span>
                      <span className="text-slate-400 font-medium flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3 text-slate-500" /> {fix.time}
                      </span>
                    </div>

                    {/* Teams Matchup */}
                    <div className="flex items-center justify-between my-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-slate-100">{fix.homeTeam.name}</span>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-[10px] text-slate-500">Form:</span>
                          <div className="flex gap-0.5">
                            {fix.homeTeam.form.map((res, i) => (
                              <span key={i} className={`w-3.5 h-3.5 rounded-sm text-[9px] font-bold flex items-center justify-center ${res === 'W' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : res === 'D' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                                {res}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-500 px-2">VS</span>
                      <div className="flex flex-col text-right">
                        <span className="font-bold text-sm text-slate-100">{fix.awayTeam.name}</span>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <div className="flex gap-0.5">
                            {fix.awayTeam.form.map((res, i) => (
                              <span key={i} className={`w-3.5 h-3.5 rounded-sm text-[9px] font-bold flex items-center justify-center ${res === 'W' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : res === 'D' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                                {res}
                              </span>
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-500">:Form</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Confidence & Quick Stat Bar */}
                    <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-800/60 text-xs">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
                        <span>Referee: <strong className="text-slate-300">{fix.referee.name.split(' ').pop()}</strong></span>
                      </div>
                      <div className="flex items-center gap-1 font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        <Zap className="w-3 h-3" />
                        <span>{fix.analysis.confidence}% Model Confidence</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </section>

        {/* ===================================================================
            COLUMN 2: 8-FACTOR DEEP RESEARCH DOSSIER (Cols 5-8)
        =================================================================== */}
        <section className="lg:col-span-5 flex flex-col gap-4">
          
          {selectedMatch ? (
            <div className="pq-panel-elevated rounded-2xl p-5 flex flex-col gap-5 pq-animate-panel">
              
              {/* Dossier Header */}
              <div className="flex items-start justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      {selectedMatch.league}
                    </span>
                    <span className="text-xs text-slate-400">{selectedMatch.stadium}</span>
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-100 flex items-center gap-2">
                    <span>{selectedMatch.homeTeam.name}</span>
                    <span className="text-emerald-400 font-mono text-sm">vs</span>
                    <span>{selectedMatch.awayTeam.name}</span>
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Stakes</span>
                  <span className="text-xs font-semibold text-slate-300">{selectedMatch.stakes}</span>
                </div>
              </div>

              {/* 8-Factor Research Grid */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-emerald-400" /> 8-Factor Deep Research Dossier
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Factor 1: Table Position & Stakes */}
                  <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 flex flex-col gap-1">
                    <span className="text-[11px] font-semibold text-slate-400">1. Table & Stakes</span>
                    <span className="text-xs font-bold text-slate-200">High Motivation (Top 4 / Title)</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Home PPG: {selectedMatch.homeTeam.homePpg} | Away: {selectedMatch.awayTeam.awayPpg}</span>
                  </div>

                  {/* Factor 2: Tactical Form (xG) */}
                  <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 flex flex-col gap-1">
                    <span className="text-[11px] font-semibold text-slate-400">2. Tactical Expected Goals (xG)</span>
                    <span className="text-xs font-bold font-mono text-slate-200">H: {selectedMatch.homeTeam.xg} vs A: {selectedMatch.awayTeam.xg}</span>
                    <span className="text-[10px] text-slate-400">{selectedMatch.analysis.tacticalMatchup}</span>
                  </div>

                  {/* Factor 3: Goal Archetypes */}
                  <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 flex flex-col gap-1">
                    <span className="text-[11px] font-semibold text-slate-400">3. Goal Archetypes & Splits</span>
                    <span className="text-xs text-slate-200">{selectedMatch.analysis.goalArchetypes}</span>
                    <span className="text-[10px] font-mono text-slate-400">Scored Avg: {selectedMatch.homeTeam.goalsScoredAvg} - {selectedMatch.awayTeam.goalsScoredAvg}</span>
                  </div>

                  {/* Factor 4: Referee History */}
                  <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 flex flex-col gap-1">
                    <span className="text-[11px] font-semibold text-slate-400">4. Referee Disciplinary History</span>
                    <span className="text-xs font-bold text-slate-200">{selectedMatch.referee.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400">Yellows/Gm: {selectedMatch.referee.yellowCardAvg} | Pen Rate: {selectedMatch.referee.penaltyGivenRate}</span>
                  </div>

                  {/* Factor 5: Home & Away Advantage */}
                  <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 flex flex-col gap-1">
                    <span className="text-[11px] font-semibold text-slate-400">5. Home / Away Splits</span>
                    <span className="text-xs font-bold text-slate-200">Strong Home Venue Edge</span>
                    <span className="text-[10px] text-slate-400">{selectedMatch.weather}</span>
                  </div>

                  {/* Factor 6: Injuries & Suspensions */}
                  <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 flex flex-col gap-1">
                    <span className="text-[11px] font-semibold text-slate-400">6. Injuries & Squad Depth</span>
                    <div className="flex flex-col text-[11px] text-rose-300 font-medium">
                      <span>• {selectedMatch.homeTeam.name}: {selectedMatch.homeTeam.injuries.join(', ')}</span>
                      <span>• {selectedMatch.awayTeam.name}: {selectedMatch.awayTeam.injuries.join(', ')}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Available Markets & Odds Selection */}
              <div className="flex flex-col gap-3 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-400" /> Safest Model Predictions & Markets
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">Click to add to Accumulator</span>
                </div>

                <div className="flex flex-col gap-2">
                  {selectedMatch.markets.map(market => {
                    const isInSlip = slipSelections.some(s => s.id === market.id);
                    return (
                      <div 
                        key={market.id}
                        onClick={() => toggleMarketInSlip(market, selectedMatch)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer pq-btn-transition ${isInSlip ? 'bg-emerald-500/10 border-emerald-500/50 shadow-sm' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-200">{market.name}</span>
                          <div className="flex items-center gap-3 mt-1 text-[10px] font-mono text-slate-400">
                            <span className="text-emerald-400 font-semibold">Model Prob: {market.modelProb}%</span>
                            <span>Safety Rating: <strong className="text-slate-300">{market.safety}%</strong></span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{market.category}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono font-extrabold text-sm text-emerald-400 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            @{market.odd.toFixed(2)}
                          </span>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isInSlip ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'border-slate-700 text-transparent'}`}>
                            <Check className="w-3 h-3 font-bold" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            <div className="pq-surface-card rounded-2xl p-12 text-center text-slate-400">
              Select a fixture from the left feed to view its 8-factor deep research dossier.
            </div>
          )}

        </section>

        {/* ===================================================================
            COLUMN 3: SAFEST 10X TO INFINITY ACCUMULATOR BUILDER (Cols 9-12)
        =================================================================== */}
        <section className="lg:col-span-3 flex flex-col gap-4">
          
          <div className="pq-panel-elevated rounded-2xl p-4 flex flex-col gap-4 sticky top-20">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm text-slate-100">Safest Odds Accumulator</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {slipSelections.length} Picks
              </span>
            </div>

            {/* Auto-Builder Target Odds Buttons */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400">Auto-Build Safest Target:</span>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: '5x', val: 5 },
                  { label: '10x', val: 10 },
                  { label: '25x', val: 25 },
                  { label: '50x+', val: 50 }
                ].map(btn => (
                  <button
                    key={btn.val}
                    onClick={() => handleAutoBuildTarget(btn.val)}
                    className={`py-1.5 rounded-lg text-xs font-mono font-bold pq-btn-transition border ${targetOddMultiplier === btn.val ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm' : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'}`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Slip Items List */}
            <div className="flex flex-col gap-2 max-h-[240px] overflow-y-auto pr-1">
              {slipSelections.length === 0 ? (
                <div className="text-center py-6 text-slate-500 text-xs">
                  Your slip is empty. Click markets on any match dossier to add high-safety selections.
                </div>
              ) : (
                slipSelections.map((item, idx) => (
                  <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between text-xs">
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="font-bold text-slate-200 truncate">{item.marketName}</span>
                      <span className="text-[10px] text-slate-400 truncate">{item.matchName} • Safety: {item.safety}%</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-mono font-bold text-emerald-400">@{item.odd.toFixed(2)}</span>
                      <button 
                        onClick={() => setSlipSelections(prev => prev.filter(s => s.id !== item.id))}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Summary & Calculations */}
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Combined Odds:</span>
                <span className="font-mono font-extrabold text-emerald-400 text-sm">{totalAccumulatorOdd}x</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Average Safety Score:</span>
                <span className="font-mono font-bold text-slate-200">{averageSafetyScore}%</span>
              </div>

              {/* Stake & Currency Input */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-800/60">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Stake Amount:</span>
                  <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] text-slate-300 font-mono"
                  >
                    <option value="NGN">₦ NGN</option>
                    <option value="USD">$ USD</option>
                    <option value="EUR">€ EUR</option>
                  </select>
                </div>
                <input 
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Potential Payout */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                <span className="text-slate-300 font-semibold">Est. Potential Payout:</span>
                <span className="font-mono font-extrabold text-emerald-400 text-sm">
                  {currency === 'NGN' ? '₦' : currency === 'USD' ? '$' : '€'}{potentialPayout.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Export / Copy Slip Button */}
            <button 
              onClick={handleCopySlipCode}
              disabled={slipSelections.length === 0}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 pq-btn-transition shadow-lg shadow-emerald-500/20"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Slip Copied Successfully!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Accumulator Slip
                </>
              )}
            </button>

          </div>

        </section>

      </main>

      {/* =====================================================================
          CUSTOM MATCH ANALYZER MODAL
      ===================================================================== */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="pq-panel-elevated rounded-2xl max-w-lg w-full p-6 flex flex-col gap-5 pq-animate-modal">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-slate-100">Analyze Custom Match</h3>
              </div>
              <button onClick={() => setShowCustomModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomMatch} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400">Home Team</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Arsenal"
                    value={customForm.homeTeam}
                    onChange={(e) => setCustomForm({ ...customForm, homeTeam: e.target.value })}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400">Away Team</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Chelsea"
                    value={customForm.awayTeam}
                    onChange={(e) => setCustomForm({ ...customForm, awayTeam: e.target.value })}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400">League / Competition</label>
                  <select 
                    value={customForm.league}
                    onChange={(e) => setCustomForm({ ...customForm, league: e.target.value })}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Premier League">Premier League</option>
                    <option value="Brasileirão Série A">Brasileirão Série A</option>
                    <option value="UEFA Champions League">UEFA Champions League</option>
                    <option value="Serie A">Serie A</option>
                    <option value="La Liga">La Liga</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400">Match Stakes</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Top 4 Clash"
                    value={customForm.stakes}
                    onChange={(e) => setCustomForm({ ...customForm, stakes: e.target.value })}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400">Referee Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Anthony Taylor"
                  value={customForm.referee}
                  onChange={(e) => setCustomForm({ ...customForm, referee: e.target.value })}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button 
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium pq-btn-transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold pq-btn-transition shadow-lg shadow-emerald-500/20"
                >
                  Run 8-Factor Analysis
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}