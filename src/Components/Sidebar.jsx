import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, BarChart3, Settings, Users, LogOut, X, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function Sidebar({ isDark, isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { icon: LayoutDashboard, label: "Dashboard", link: "/dashboard" },
    { icon: Users, label: "Users", link: "/users" },
    { icon: BarChart3, label: "Analytics", link: "/analytics" },
    { icon: Settings, label: "Settings", link: "/settings" },
  ];

  const handleLogout = () => {
    // In a real app, you would clear auth tokens here
    navigate('/login');
  };

  return (
    <aside className={`fixed md:relative z-50 h-full flex flex-col bg-white dark:bg-[#0A0A0A] border-r border-stone-200 dark:border-stone-800 transition-all duration-300 ease-in-out ${isMobileOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0'} ${isCollapsed && !isMobileOpen ? 'md:w-20' : 'md:w-64'}`}>
      <div className={`h-16 flex items-center border-b border-stone-200 dark:border-stone-800 px-4 ${isCollapsed && !isMobileOpen ? 'md:justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 min-w-[2.25rem] bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
          <span className={`text-lg font-semibold tracking-tight text-[#1C1C1C] dark:text-white whitespace-nowrap transition-opacity duration-200 ${isCollapsed && !isMobileOpen ? 'md:opacity-0 md:w-0' : 'opacity-100'}`}>SamAdmin</span>
        </div>
        <button onClick={() => setIsMobileOpen(false)} className="md:hidden text-stone-400 hover:text-[#1C1C1C] dark:hover:text-white cursor-pointer"><X size={20} /></button>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {navLinks.map((item) => (
          <button key={item.label} onClick={() => { navigate(item.link); setIsMobileOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative cursor-pointer ${location.pathname === item.link ? 'bg-[#1C1C1C] dark:bg-white text-white dark:text-black' : 'text-stone-500 dark:text-neutral-400 hover:bg-stone-100 dark:hover:bg-white/5 hover:text-[#1C1C1C] dark:hover:text-white'} ${isCollapsed && !isMobileOpen ? 'md:justify-center' : ''}`}>
            <item.icon size={20} className="min-w-[20px]" />
            <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${isCollapsed && !isMobileOpen ? 'md:opacity-0 md:w-0' : 'opacity-100'}`}>{item.label}</span>
            {isCollapsed && !isMobileOpen && (<div className="absolute left-full ml-3 px-2 py-1 bg-[#1C1C1C] dark:bg-white dark:text-black text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-lg z-50">{item.label}</div>)}
          </button>
        ))}
      </nav>

      <div className="mt-auto p-3 border-t border-stone-200 dark:border-stone-800 space-y-1">
        <button onClick={() => setIsCollapsed(!isCollapsed)} className={`hidden md:flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-stone-500 dark:text-neutral-400 hover:bg-stone-100 dark:hover:bg-white/5 hover:text-[#1C1C1C] dark:hover:text-white transition-all duration-200 cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}>
          {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
          <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>Collapse</span>
        </button>
        <button onClick={handleLogout} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-stone-500 dark:text-neutral-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 cursor-pointer ${isCollapsed && !isMobileOpen ? 'md:justify-center' : ''}`}>
          <LogOut size={20} className="min-w-[20px]" />
          <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${isCollapsed && !isMobileOpen ? 'md:opacity-0 md:w-0' : 'opacity-100'}`}>Logout</span>
        </button>
      </div>
    </aside>
  );
}