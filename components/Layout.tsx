
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Timer, 
  Calendar, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  MessageSquare,
  ShieldCheck,
  Heart,
  UserCircle,
  Globe,
  Info,
  BookOpen
} from 'lucide-react';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lang, setLang] = useState<Language>('FR');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

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
    { path: '/about', label: 'Mission & Crédits', icon: Info },
    { path: '/admin', label: 'Admin Panel', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200 flex flex-col lg:flex-row">
      <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between px-6 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <button onClick={toggleSidebar} className="p-2 -ml-2 text-slate-600 dark:text-slate-300">
          <Menu className="w-6 h-6" />
        </button>
        <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">NAJAH<span className="text-blue-600">.</span></span>
        <div className="flex items-center gap-2">
           <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-slate-600 dark:text-slate-300">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <aside className={`
        fixed lg:sticky top-0 inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800 transform transition-transform duration-500 lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-8 h-24">
            <Link to="/" className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter" onClick={closeSidebar}>
              NAJAH<span className="text-blue-600">.</span>
            </Link>
            <button onClick={toggleSidebar} className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-xl">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar pt-2">
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Menu Principal</p>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`
                    flex items-center px-4 py-3.5 rounded-[1.25rem] transition-all group
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'}
                  `}
                >
                  <item.icon className={`w-5 h-5 mr-3 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="font-bold text-sm tracking-tight">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-6 space-y-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                  AH
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-white tracking-tight">Abdelhamid Haji</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Développeur BAC Success</p>
                </div>
              </div>
              <a href="https://wa.me/212601898477" target="_blank" className="flex items-center justify-center gap-2 w-full py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all">
                <MessageSquare className="w-3.5 h-3.5" /> Support WhatsApp
              </a>
            </div>
            
            <p className="text-[10px] text-center text-slate-400 font-bold uppercase flex items-center justify-center gap-1.5">
              Fait avec <Heart className="w-3 h-3 text-red-500 fill-red-500" /> pour le Maroc
            </p>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-12 h-screen overflow-y-auto custom-scrollbar relative">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};

export default Layout;
