
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Timer, 
  Calendar, 
  Menu, 
  X, 
  MessageSquare,
  ShieldCheck,
  UserCircle,
  Info,
  Sparkles,
  Command,
  LayoutGrid,
  Cloud
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/library', label: 'Bibliothèque', icon: Cloud },
    { path: '/pomodoro', label: 'Focus Zone', icon: Timer },
    { path: '/planner', label: 'Planning', icon: Calendar },
    { path: '/ai-tutor', label: 'Najah IA', icon: MessageSquare },
    { path: '/profile', label: 'Analytics', icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row font-medium text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Premium Mobile Header */}
      <header className="lg:hidden sticky top-0 z-[60] flex items-center justify-between px-6 h-20 bg-black/80 backdrop-blur-3xl border-b border-white/5 shadow-2xl">
        <button onClick={toggleSidebar} className="p-3 bg-white/5 rounded-2xl text-slate-300 active:scale-90 transition-transform">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-blue-600 rounded-[1rem] flex items-center justify-center text-white font-black text-sm shadow-glow">N</div>
           <span className="text-2xl font-black text-white tracking-tighter uppercase">Najah</span>
        </div>
        <Link to="/profile" className="w-12 h-12 bg-slate-900/50 rounded-2xl flex items-center justify-center border border-white/5">
           <UserCircle className="w-6 h-6 text-slate-500" />
        </Link>
      </header>

      {/* Sidebar - OLED Glass Style */}
      <aside className={`
        fixed lg:sticky top-0 inset-y-0 left-0 z-[70] w-80 bg-black lg:bg-black/40 lg:backdrop-blur-3xl border-r border-white/10 transform transition-all duration-700 lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-4 px-10 h-24">
            <Link to="/" className="flex items-center gap-4 group" onClick={closeSidebar}>
              <div className="w-12 h-12 bg-blue-600 rounded-[1.25rem] flex items-center justify-center text-white font-black text-lg shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all group-hover:rotate-[15deg] group-hover:scale-110">N</div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tighter uppercase leading-none">NAJAH<span className="text-blue-600">.</span></span>
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-1">Plateforme Étudiante</span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-5 space-y-2 overflow-y-auto custom-scrollbar pt-4">
            <p className="px-8 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] mb-6 mt-2">Core System</p>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`
                    flex items-center px-8 py-5 rounded-[2.5rem] transition-all duration-500 group relative overflow-hidden
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-[0_12px_24px_-8px_rgba(37,99,235,0.5)] translate-x-2' 
                      : 'text-slate-500 hover:text-white hover:bg-white/5 hover:translate-x-2'}
                  `}
                >
                  <item.icon className={`w-6 h-6 mr-5 transition-transform duration-700 ${isActive ? 'scale-110 rotate-3' : 'group-hover:scale-125 group-hover:-rotate-3'}`} />
                  <span className="font-black text-sm tracking-tight uppercase tracking-wider">{item.label}</span>
                  {isActive && (
                    <div className="absolute left-1.5 w-1.5 h-8 bg-white rounded-full shadow-[0_0_12px_white]" />
                  )}
                </Link>
              );
            })}
            
            <p className="px-8 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] mb-6 mt-14">Platform Tools</p>
            <Link to="/about" onClick={closeSidebar} className="flex items-center px-8 py-4.5 rounded-[2.5rem] text-slate-600 hover:text-white hover:bg-white/5 transition-all group">
              <Info className="w-6 h-6 mr-5 group-hover:scale-120 transition-transform" />
              <span className="font-black text-sm uppercase tracking-widest">Manifesto</span>
            </Link>
            <Link to="/admin" onClick={closeSidebar} className="flex items-center px-8 py-4.5 rounded-[2.5rem] text-slate-600 hover:text-white hover:bg-white/5 transition-all group">
              <ShieldCheck className="w-6 h-6 mr-5 group-hover:scale-120 transition-transform" />
              <span className="font-black text-sm uppercase tracking-widest">Secure Access</span>
            </Link>
          </nav>

          <div className="p-8">
            <div className="bg-slate-900/40 rounded-[2.75rem] p-8 border border-white/5 relative overflow-hidden group transition-all hover:border-blue-500/20 shadow-2xl">
              <Sparkles className="absolute -top-6 -right-6 w-20 h-20 text-blue-500/5 group-hover:scale-150 transition-transform duration-[3000ms]" />
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10 shadow-inner font-black text-sm">AH</div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-tighter">Abdelhamid Haji</p>
                  <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em]">Software Architect</p>
                </div>
              </div>
              <a 
                href="https://wa.me/212601898477" 
                target="_blank" 
                className="flex items-center justify-center gap-3 w-full py-4.5 bg-blue-600 text-white rounded-[1.75rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-700 active:scale-95 transition-all shadow-glow"
              >
                Support Hub
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Experience */}
      <main className="flex-1 min-h-screen relative bg-black">
        {/* Desktop Pro Header */}
        <div className="sticky top-0 z-40 hidden lg:flex items-center justify-between px-16 h-24 bg-black/40 backdrop-blur-3xl border-b border-white/10">
           <div className="flex items-center gap-12">
              <div className="flex items-center gap-3 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
                <Command className="w-4 h-4 text-blue-500" />
                System: <span className="text-blue-500 text-glow">High Efficiency</span>
              </div>
              <div className="h-5 w-[1px] bg-white/10" />
              <div className="flex items-center gap-3 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
                <LayoutGrid className="w-4 h-4 text-slate-700" />
                Network: <span className="text-white">BAC 2025 HUB</span>
              </div>
           </div>
           
           <div className="flex items-center gap-6">
             <div className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 shadow-inner group cursor-default">
                <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse" /> 
                Cloud Sync Optimized
             </div>
             <Link to="/profile" className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-500 hover:text-white transition-all shadow-inner hover:rotate-[360deg] duration-1000">
               <UserCircle className="w-7 h-7" />
             </Link>
           </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
          {children}
        </div>
        
        {/* Deep Atmosphere Backgrounds */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
           <div className="absolute -top-[15%] -left-[10%] w-[65%] h-[65%] bg-blue-600/5 blur-[220px] rounded-full animate-pulse-subtle" />
           <div className="absolute -bottom-[15%] -right-[10%] w-[65%] h-[65%] bg-indigo-600/5 blur-[220px] rounded-full animate-pulse-subtle" style={{ animationDelay: '-6s' }} />
           
           {/* Pro Grid Overlay */}
           <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '45px 45px' }} />
        </div>
      </main>

      {/* Sidebar Mask */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-[65] lg:hidden animate-in fade-in duration-500"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};

export default Layout;
