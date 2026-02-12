
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Timer, 
  Calendar, 
  Menu, 
  X, 
  MessageSquare,
  ShieldCheck,
  UserCircle,
  BookOpen,
  Info
} from 'lucide-react';
import { Language } from '../types.ts';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const navItems = [
    { path: '/', label: 'Tableau de Bord', icon: LayoutDashboard },
    { path: '/subjects', label: 'Cours & Programmes', icon: BookOpen },
    { path: '/exams', label: 'Examens Nationaux', icon: FileText },
    { path: '/pomodoro', label: 'Focus Timer', icon: Timer },
    { path: '/planner', label: 'Planning BAC', icon: Calendar },
    { path: '/ai-tutor', label: 'Tuteur IA', icon: MessageSquare },
    { path: '/profile', label: 'Profil & Analytics', icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row font-medium text-slate-100">
      {/* Mobile Top Bar */}
      <header className="lg:hidden sticky top-0 z-[60] flex items-center justify-between px-6 h-18 bg-black/80 backdrop-blur-2xl border-b border-white/5">
        <button onClick={toggleSidebar} className="p-2 -ml-2 text-slate-300 active:scale-95 transition-transform">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-1.5">
           <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-[10px] shadow-[0_0_15px_rgba(37,99,235,0.4)]">N</div>
           <span className="text-lg font-black text-white tracking-tighter uppercase">Najah</span>
        </div>
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center border border-white/5">
           <UserCircle className="w-5 h-5 text-slate-400" />
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:sticky top-0 inset-y-0 left-0 z-[70] w-72 bg-black border-r border-white/5 transform transition-all duration-500 ease-in-out lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 px-8 h-24">
            <Link to="/" className="flex items-center gap-2.5 group" onClick={closeSidebar}>
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform">N</div>
              <span className="text-2xl font-black text-white tracking-tighter uppercase">NAJAH<span className="text-blue-600">.</span></span>
            </Link>
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar pt-2">
            <p className="px-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 mt-2">Navigation</p>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`
                    flex items-center justify-between px-6 py-3.5 rounded-2xl transition-all duration-300 group
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-[0_10px_30px_-5px_rgba(37,99,235,0.4)] ring-1 ring-white/10' 
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'}
                  `}
                >
                  <div className="flex items-center">
                    <item.icon className={`w-5 h-5 mr-3.5 transition-all duration-300 ${isActive ? 'scale-110 text-white' : 'group-hover:scale-110'}`} />
                    <span className="font-bold text-sm tracking-tight">{item.label}</span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                </Link>
              );
            })}
            
            <p className="px-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 mt-10">Assistance</p>
            <Link to="/about" onClick={closeSidebar} className="flex items-center px-6 py-3.5 rounded-2xl text-slate-400 hover:bg-slate-900 transition-all">
              <Info className="w-5 h-5 mr-3.5" />
              <span className="font-bold text-sm">À propos</span>
            </Link>
            <Link to="/admin" onClick={closeSidebar} className="flex items-center px-6 py-3.5 rounded-2xl text-slate-400 hover:bg-slate-900 transition-all">
              <ShieldCheck className="w-5 h-5 mr-3.5" />
              <span className="font-bold text-sm text-glow">Admin</span>
            </Link>
          </nav>

          <div className="p-6">
            <div className="glass-card rounded-3xl p-5 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-blue-500/10 transition-colors" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-xs border border-white/5 shadow-inner">AH</div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-tighter">Abdelhamid Haji</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Developer</p>
                </div>
              </div>
              <a href="https://wa.me/212601898477" target="_blank" className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-[0_5px_15px_-3px_rgba(37,99,235,0.4)]">
                Support WA
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen relative bg-black">
        <div className="sticky top-0 z-40 hidden lg:flex items-center justify-between px-12 h-20 bg-black/50 backdrop-blur-md">
           <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
             Session: <span className="text-blue-400">BAC 2025</span>
           </div>
           <div className="flex items-center gap-4">
             <div className="h-10 px-4 bg-slate-900 border border-white/5 rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Cloud Active
             </div>
             <button className="w-10 h-10 bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-all">
               <UserCircle className="w-5 h-5" />
             </button>
           </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 lg:py-4">
          {children}
        </div>
        
        {/* Deep Ambient Background Effects */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-black">
           <div className="absolute top-[5%] left-[5%] w-[40%] h-[40%] bg-blue-600/10 blur-[150px] rounded-full bg-glow" />
           <div className="absolute bottom-[5%] right-[5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full bg-glow" style={{ animationDelay: '-5s' }} />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[65] lg:hidden animate-in fade-in duration-300"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};

export default Layout;
