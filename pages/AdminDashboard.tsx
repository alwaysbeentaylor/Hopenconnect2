import React, { useState, useMemo } from 'react';
import { 
  Download, 
  Mail, 
  TrendingUp, 
  ArrowLeft,
  RefreshCw,
  Trash2,
  FileDown,
  Eye,
  MousePointer,
  Filter,
  Lock,
  Sparkles,
  LogOut,
  MessageCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  getStatistics, 
  clearAnalyticsData, 
  exportToCSV,
  EmailSubmission,
  AIGuideGeneration,
  ChatConversation
} from '../services/analyticsService';

type DateFilter = 'all' | 'today' | 'week' | 'month' | 'custom';

// Admin password - in production, use proper authentication
const ADMIN_PASSWORD = 'hopeconnects2025';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'emails' | 'pageviews' | 'downloads' | 'aiguide' | 'chats'>('overview');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
      sessionStorage.setItem('adminAuth', 'true');
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
  };

  // Check session on mount
  React.useEffect(() => {
    if (sessionStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Calculate date range based on filter
  const dateRange = useMemo(() => {
    const now = new Date();
    let startDate: Date | undefined;
    let endDate: Date | undefined = new Date(now.setHours(23, 59, 59, 999));

    switch (dateFilter) {
      case 'today':
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'month':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'custom':
        startDate = customStartDate ? new Date(customStartDate) : undefined;
        endDate = customEndDate ? new Date(customEndDate + 'T23:59:59') : undefined;
        break;
      default:
        startDate = undefined;
        endDate = undefined;
    }

    return { startDate, endDate };
  }, [dateFilter, customStartDate, customEndDate]);

  const stats = useMemo(() => {
    return getStatistics(dateRange.startDate, dateRange.endDate);
  }, [dateRange, refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleClearData = () => {
    clearAnalyticsData();
    setShowDeleteConfirm(false);
    handleRefresh();
  };

  const handleExportCSV = (type: 'pageViews' | 'downloadClicks' | 'emailSubmissions' | 'aiGuideGenerations') => {
    const csv = exportToCSV(type);
    if (!csv) {
      alert('Geen data om te exporteren');
      return;
    }
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('nl-BE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-400/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-2xl font-semibold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Voer het wachtwoord in om toegang te krijgen</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                }}
                placeholder="Wachtwoord"
                className={`w-full px-4 py-4 bg-slate-900 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors ${
                  passwordError ? 'border-red-500' : 'border-slate-700'
                }`}
              />
              {passwordError && (
                <p className="text-red-400 text-sm mt-2">Onjuist wachtwoord</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-amber-400 text-slate-900 font-semibold rounded-lg hover:bg-amber-300 transition-colors"
            >
              Inloggen
            </button>
          </form>
          
          <Link 
            to="/" 
            className="mt-6 flex items-center justify-center gap-2 text-slate-500 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft size={16} />
            Terug naar site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900/50 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors"
              >
                <ArrowLeft size={18} />
                <span className="text-sm">Terug naar site</span>
              </Link>
              <div className="h-6 w-px bg-slate-700" />
              <h1 className="text-xl font-semibold text-white">
                Hope Connects <span className="text-amber-400">Analytics</span>
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                title="Vernieuwen"
              >
                <RefreshCw size={18} />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-all"
                title="Data wissen"
              >
                <Trash2 size={18} />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-all"
                title="Uitloggen"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Filter */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Filter size={18} />
            <span className="text-sm font-medium">Filter op datum:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'Alles' },
              { value: 'today', label: 'Vandaag' },
              { value: 'week', label: 'Afgelopen week' },
              { value: 'month', label: 'Afgelopen maand' },
              { value: 'custom', label: 'Aangepast' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setDateFilter(value as DateFilter)}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  dateFilter === value
                    ? 'bg-amber-400 text-slate-900 font-medium'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          
          {dateFilter === 'custom' && (
            <div className="flex items-center gap-2 ml-auto">
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-amber-400"
              />
              <span className="text-slate-500">tot</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          <StatCard
            icon={<Eye className="text-blue-400" size={20} />}
            label="Bezoekers"
            value={stats.totalPageViews}
            sublabel={`${stats.uniqueVisitors} uniek`}
            color="blue"
          />
          <StatCard
            icon={<MousePointer className="text-emerald-400" size={20} />}
            label="Downloads"
            value={stats.totalDownloadClicks}
            sublabel={`${stats.downloadConversionRate}%`}
            color="emerald"
          />
          <StatCard
            icon={<Mail className="text-amber-400" size={20} />}
            label="Emails"
            value={stats.totalEmailSubmissions}
            sublabel={`${stats.emailConversionRate}%`}
            color="amber"
          />
          <StatCard
            icon={<Sparkles className="text-purple-400" size={20} />}
            label="AI Gidsen"
            value={stats.totalAIGuideGenerations}
            sublabel="gegenereerd"
            color="purple"
          />
          <StatCard
            icon={<MessageCircle className="text-cyan-400" size={20} />}
            label="Chats"
            value={stats.totalChatConversations || 0}
            sublabel="gesprekken"
            color="cyan"
          />
          <StatCard
            icon={<TrendingUp className="text-rose-400" size={20} />}
            label="Leads"
            value={stats.totalEmailSubmissions + stats.totalAIGuideGenerations + (stats.totalChatConversations || 0)}
            sublabel="totaal"
            color="rose"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-slate-900 p-1 rounded-xl w-fit overflow-x-auto">
          {[
            { id: 'overview', label: 'Overzicht', icon: <TrendingUp size={16} /> },
            { id: 'emails', label: 'Emails', icon: <Mail size={16} /> },
            { id: 'aiguide', label: 'AI Gidsen', icon: <Sparkles size={16} /> },
            { id: 'chats', label: 'Chats', icon: <MessageCircle size={16} /> },
            { id: 'pageviews', label: 'Bezoekers', icon: <Eye size={16} /> },
            { id: 'downloads', label: 'Downloads', icon: <Download size={16} /> }
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          {activeTab === 'overview' && (
            <OverviewTab stats={stats} formatDate={formatDate} />
          )}
          
          {activeTab === 'emails' && (
            <EmailsTab 
              emails={stats.emailSubmissions} 
              formatDate={formatDate} 
              onExport={() => handleExportCSV('emailSubmissions')}
            />
          )}

          {activeTab === 'aiguide' && (
            <AIGuideTab 
              guides={stats.aiGuideGenerations} 
              formatDate={formatDate}
              onExport={() => handleExportCSV('aiGuideGenerations')}
            />
          )}
          
          {activeTab === 'pageviews' && (
            <PageViewsTab 
              pageViews={stats.pageViews} 
              formatDate={formatDate}
              onExport={() => handleExportCSV('pageViews')}
            />
          )}
          
          {activeTab === 'downloads' && (
            <DownloadsTab 
              downloads={stats.downloadClicks} 
              formatDate={formatDate}
              onExport={() => handleExportCSV('downloadClicks')}
            />
          )}

          {activeTab === 'chats' && (
            <ChatsTab 
              conversations={stats.chatConversations || []} 
              formatDate={formatDate}
            />
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full animate-scale-in">
            <h3 className="text-xl font-semibold text-white mb-2">Data Wissen?</h3>
            <p className="text-slate-400 mb-6">
              Weet je zeker dat je alle analytics data wilt wissen? Dit kan niet ongedaan worden gemaakt.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Annuleren
              </button>
              <button
                onClick={handleClearData}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Ja, wissen
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sublabel: string;
  color: 'blue' | 'emerald' | 'amber' | 'purple' | 'rose' | 'cyan';
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, sublabel, color }) => {
  const colorClasses = {
    blue: 'from-blue-500/10 to-blue-500/5 border-blue-500/20',
    emerald: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20',
    cyan: 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/20',
    amber: 'from-amber-500/10 to-amber-500/5 border-amber-500/20',
    purple: 'from-purple-500/10 to-purple-500/5 border-purple-500/20',
    rose: 'from-rose-500/10 to-rose-500/5 border-rose-500/20'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-2xl p-5`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-slate-900/50 rounded-lg">
          {icon}
        </div>
        <span className="text-xs text-slate-400 uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{sublabel}</div>
    </div>
  );
};

// Overview Tab
const OverviewTab: React.FC<{ stats: ReturnType<typeof getStatistics>; formatDate: (date: string) => string }> = ({ stats, formatDate }) => {
  const recentEmails = stats.emailSubmissions.slice(-5).reverse();
  const recentGuides = stats.aiGuideGenerations.slice(-5).reverse();

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Emails */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Mail size={18} className="text-amber-400" />
            Recente Email Inschrijvingen
          </h3>
          {recentEmails.length > 0 ? (
            <div className="space-y-3">
              {recentEmails.map((email) => (
                <div key={email.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{email.email}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      email.source === 'contact_form' 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : email.source === 'ai_guide'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {email.source === 'contact_form' ? 'Contact' : email.source === 'ai_guide' ? 'AI Gids' : 'Popup'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-2">{formatDate(email.timestamp)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-slate-500 text-center py-8">Nog geen emails</div>
          )}
        </div>

        {/* Recent AI Guides */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-purple-400" />
            Recente AI Gids Generaties
          </h3>
          {recentGuides.length > 0 ? (
            <div className="space-y-3">
              {recentGuides.map((guide) => (
                <div key={guide.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{guide.userName}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                      {guide.region}
                    </span>
                  </div>
                  <div className="text-sm text-slate-400 mt-1">{guide.userEmail}</div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">{guide.budget}</span>
                    <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">{guide.experience}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-2">{formatDate(guide.timestamp)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-slate-500 text-center py-8">Nog geen AI gids generaties</div>
          )}
        </div>
      </div>
    </div>
  );
};

// Emails Tab
const EmailsTab: React.FC<{ emails: EmailSubmission[]; formatDate: (date: string) => string; onExport: () => void }> = ({ emails, formatDate, onExport }) => {
  const sortedEmails = [...emails].reverse();

  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <h3 className="text-lg font-semibold text-white">
          Alle Email Inschrijvingen ({emails.length})
        </h3>
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-amber-400 text-slate-900 rounded-lg text-sm font-medium hover:bg-amber-300 transition-colors"
        >
          <FileDown size={16} />
          CSV
        </button>
      </div>
      
      {sortedEmails.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="text-left text-xs uppercase tracking-wider text-slate-400 px-4 py-3">Email</th>
                <th className="text-left text-xs uppercase tracking-wider text-slate-400 px-4 py-3">Naam</th>
                <th className="text-left text-xs uppercase tracking-wider text-slate-400 px-4 py-3">Info</th>
                <th className="text-left text-xs uppercase tracking-wider text-slate-400 px-4 py-3">Bron</th>
                <th className="text-left text-xs uppercase tracking-wider text-slate-400 px-4 py-3">Datum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sortedEmails.map((email) => (
                <tr key={email.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-4 text-white">{email.email}</td>
                  <td className="px-4 py-4 text-slate-300">{email.name || '-'}</td>
                  <td className="px-4 py-4 text-slate-300 text-sm max-w-xs truncate">{email.projectType || '-'}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      email.source === 'contact_form' 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : email.source === 'ai_guide'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {email.source === 'contact_form' ? 'Contact' : email.source === 'ai_guide' ? 'AI Gids' : 'Popup'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-400 text-sm">{formatDate(email.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-slate-500 text-center py-12">
          <Mail size={48} className="mx-auto mb-4 opacity-50" />
          <p>Nog geen email inschrijvingen</p>
        </div>
      )}
    </div>
  );
};

// AI Guide Tab
const AIGuideTab: React.FC<{ guides: AIGuideGeneration[]; formatDate: (date: string) => string; onExport: () => void }> = ({ guides, formatDate, onExport }) => {
  const sortedGuides = [...guides].reverse();

  // Stats
  const regionStats = guides.reduce((acc, g) => {
    acc[g.region] = (acc[g.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const budgetStats = guides.reduce((acc, g) => {
    acc[g.budget] = (acc[g.budget] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <h3 className="text-lg font-semibold text-white">
          Alle AI Gids Generaties ({guides.length})
        </h3>
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-amber-400 text-slate-900 rounded-lg text-sm font-medium hover:bg-amber-300 transition-colors"
        >
          <FileDown size={16} />
          CSV
        </button>
      </div>

      {/* Stats breakdown */}
      {guides.length > 0 && (
        <div className="p-4 border-b border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-500 mb-2 block">Per Regio</span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(regionStats).map(([region, count]) => (
                <div key={region} className="bg-slate-800 rounded-lg px-3 py-1.5 text-sm">
                  <span className="text-slate-400">{region}:</span>
                  <span className="text-white font-semibold ml-1">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-500 mb-2 block">Per Budget</span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(budgetStats).map(([budget, count]) => (
                <div key={budget} className="bg-slate-800 rounded-lg px-3 py-1.5 text-sm">
                  <span className="text-slate-400">{budget}:</span>
                  <span className="text-white font-semibold ml-1">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {sortedGuides.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="text-left text-xs uppercase tracking-wider text-slate-400 px-4 py-3">Naam</th>
                <th className="text-left text-xs uppercase tracking-wider text-slate-400 px-4 py-3">Email</th>
                <th className="text-left text-xs uppercase tracking-wider text-slate-400 px-4 py-3">Regio</th>
                <th className="text-left text-xs uppercase tracking-wider text-slate-400 px-4 py-3">Budget</th>
                <th className="text-left text-xs uppercase tracking-wider text-slate-400 px-4 py-3">Ervaring</th>
                <th className="text-left text-xs uppercase tracking-wider text-slate-400 px-4 py-3">Datum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sortedGuides.map((guide) => (
                <tr key={guide.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-4 text-white font-medium">{guide.userName}</td>
                  <td className="px-4 py-4 text-slate-300">{guide.userEmail}</td>
                  <td className="px-4 py-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                      {guide.region}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-300">{guide.budget}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      guide.experience === 'beginner' 
                        ? 'bg-green-500/20 text-green-400' 
                        : guide.experience === 'intermediate'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {guide.experience}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-400 text-sm">{formatDate(guide.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-slate-500 text-center py-12">
          <Sparkles size={48} className="mx-auto mb-4 opacity-50" />
          <p>Nog geen AI gids generaties</p>
        </div>
      )}
    </div>
  );
};

// Page Views Tab
const PageViewsTab: React.FC<{ pageViews: ReturnType<typeof getStatistics>['pageViews']; formatDate: (date: string) => string; onExport: () => void }> = ({ pageViews, formatDate, onExport }) => {
  const sortedViews = [...pageViews].reverse();

  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <h3 className="text-lg font-semibold text-white">
          Alle Pagina Weergaven ({pageViews.length})
        </h3>
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-amber-400 text-slate-900 rounded-lg text-sm font-medium hover:bg-amber-300 transition-colors"
        >
          <FileDown size={16} />
          CSV
        </button>
      </div>
      
      {sortedViews.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="text-left text-xs uppercase tracking-wider text-slate-400 px-4 py-3">Pagina</th>
                <th className="text-left text-xs uppercase tracking-wider text-slate-400 px-4 py-3">Referrer</th>
                <th className="text-left text-xs uppercase tracking-wider text-slate-400 px-4 py-3">Datum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sortedViews.slice(0, 50).map((view) => (
                <tr key={view.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-4 text-white">{view.page}</td>
                  <td className="px-4 py-4 text-slate-300 truncate max-w-xs">{view.referrer}</td>
                  <td className="px-4 py-4 text-slate-400 text-sm">{formatDate(view.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {sortedViews.length > 50 && (
            <div className="text-center py-4 text-slate-500 text-sm">
              Tonen: 50 van {sortedViews.length}
            </div>
          )}
        </div>
      ) : (
        <div className="text-slate-500 text-center py-12">
          <Eye size={48} className="mx-auto mb-4 opacity-50" />
          <p>Nog geen pagina weergaven</p>
        </div>
      )}
    </div>
  );
};

// Downloads Tab
const DownloadsTab: React.FC<{ downloads: ReturnType<typeof getStatistics>['downloadClicks']; formatDate: (date: string) => string; onExport: () => void }> = ({ downloads, formatDate, onExport }) => {
  const sortedDownloads = [...downloads].reverse();

  const sourceStats = downloads.reduce((acc, d) => {
    acc[d.source] = (acc[d.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <h3 className="text-lg font-semibold text-white">
          Alle Download Clicks ({downloads.length})
        </h3>
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-amber-400 text-slate-900 rounded-lg text-sm font-medium hover:bg-amber-300 transition-colors"
        >
          <FileDown size={16} />
          CSV
        </button>
      </div>

      {Object.keys(sourceStats).length > 0 && (
        <div className="p-4 border-b border-slate-800 flex flex-wrap gap-3">
          {Object.entries(sourceStats).map(([source, count]) => (
            <div key={source} className="bg-slate-800 rounded-lg px-3 py-2">
              <span className="text-slate-400 text-sm">{source}:</span>
              <span className="text-white font-semibold ml-2">{count}</span>
            </div>
          ))}
        </div>
      )}
      
      {sortedDownloads.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="text-left text-xs uppercase tracking-wider text-slate-400 px-4 py-3">Bron</th>
                <th className="text-left text-xs uppercase tracking-wider text-slate-400 px-4 py-3">Datum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sortedDownloads.slice(0, 50).map((download) => (
                <tr key={download.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-4">
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">
                      {download.source}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-400 text-sm">{formatDate(download.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-slate-500 text-center py-12">
          <Download size={48} className="mx-auto mb-4 opacity-50" />
          <p>Nog geen download clicks</p>
        </div>
      )}
    </div>
  );
};

// Chats Tab
const ChatsTab: React.FC<{ conversations: ChatConversation[]; formatDate: (date: string) => string }> = ({ conversations, formatDate }) => {
  const [expandedChat, setExpandedChat] = useState<string | null>(null);
  const sortedConversations = [...conversations].sort((a, b) => 
    new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  );

  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <h3 className="text-lg font-semibold text-white">
          Alle Chat Gesprekken ({conversations.length})
        </h3>
      </div>
      
      {sortedConversations.length > 0 ? (
        <div className="divide-y divide-slate-800">
          {sortedConversations.map((conv) => (
            <div key={conv.id} className="hover:bg-slate-800/30 transition-colors">
              {/* Chat Header */}
              <button
                onClick={() => setExpandedChat(expandedChat === conv.id ? null : conv.id)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <MessageCircle size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{conv.userName}</div>
                    <div className="text-sm text-slate-400">{conv.userEmail}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-slate-300">{conv.messageCount} berichten</div>
                    <div className="text-xs text-slate-500">{formatDate(conv.startedAt)}</div>
                  </div>
                  {expandedChat === conv.id ? (
                    <ChevronUp size={20} className="text-slate-400" />
                  ) : (
                    <ChevronDown size={20} className="text-slate-400" />
                  )}
                </div>
              </button>
              
              {/* Chat Messages */}
              {expandedChat === conv.id && (
                <div className="px-4 pb-4">
                  <div className="bg-slate-800/50 rounded-xl p-4 space-y-3 max-h-96 overflow-y-auto">
                    {conv.messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-xl ${
                            msg.role === 'user'
                              ? 'bg-cyan-500/20 text-cyan-100'
                              : 'bg-slate-700 text-slate-200'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs opacity-50 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-slate-500 text-center py-12">
          <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
          <p>Nog geen chat gesprekken</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
