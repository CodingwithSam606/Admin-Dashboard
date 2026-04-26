import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Menu, Moon, Sun, Bell, CheckCircle } from "lucide-react";
import Sidebar from "./Sidebar";

// Mock notifications data
const notifications = [
    { id: 1, title: "New User Registered", desc: "Olivia Martin just created an account.", time: "2 min ago", read: false },
    { id: 2, title: "Server Update", desc: "Deployment v2.1.0 was successful.", time: "1 hour ago", read: false },
    { id: 3, title: "Payment Received", desc: "$1,999.00 from Jackson Lee.", time: "3 hours ago", read: true },
];

export default function Layout({ isDark, theme, setTheme }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    const notifRef = useRef(null); // Used to detect clicks outside the dropdown

    // Close notification if clicking anywhere else on the screen
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleTheme = () => {
        // Quickly toggle between light and dark if clicking the header icon
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[#F9F8F4] dark:bg-[#050505]">
            {isMobileOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
            )}

            <Sidebar isDark={isDark} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

            <main className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
                <header className="sticky top-0 z-30 bg-[#F9F8F4]/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-stone-200 dark:border-stone-800/50 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsMobileOpen(true)} className="md:hidden p-2 rounded-xl text-stone-600 dark:text-neutral-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer">
                            <Menu size={20} />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-[#1C1C1D] dark:text-white">Dashboard</h1>
                            <p className="text-xs text-stone-500 dark:text-neutral-500 hidden sm:block">Welcome back, Samuel.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* NOTIFICATION BELL */}
                        <div className="relative" ref={notifRef}>
                            <button
                                onClick={() => setIsNotifOpen(!isNotifOpen)}
                                className="relative p-2.5 rounded-xl text-stone-500 dark:text-neutral-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                            >
                                <Bell size={18} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full"></span>
                            </button>

                            {/* NOTIFICATION DROPDOWN */}
                            {isNotifOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#111] border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl shadow-stone-200/50 dark:shadow-black/50 overflow-hidden z-50">
                                    <div className="px-4 py-3 border-b border-stone-100 dark:border-stone-800">
                                        <p className="text-sm font-semibold text-[#1C1C1D] dark:text-white">Notifications</p>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {notifications.map((notif) => (
                                            <div key={notif.id} className={`px-4 py-3 flex gap-3 hover:bg-stone-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer border-b border-stone-50 dark:border-stone-800/50 last:border-0 ${!notif.read ? 'bg-emerald-50/50 dark:bg-emerald-500/5' : ''}`}>
                                                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${!notif.read ? 'bg-emerald-500' : 'bg-transparent'}`} />
                                                <div>
                                                    <p className="text-sm font-medium text-[#1C1C1D] dark:text-white">{notif.title}</p>
                                                    <p className="text-xs text-stone-500 dark:text-neutral-500 mt-0.5">{notif.desc}</p>
                                                    <p className="text-xs text-stone-400 dark:text-neutral-600 mt-1">{notif.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full px-4 py-2.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-stone-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer text-center">
                                        View all notifications
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="h-6 w-px bg-stone-200 dark:bg-stone-800 mx-1 hidden sm:block"></div>

                        <button onClick={toggleTheme} className="p-2.5 rounded-xl text-stone-500 dark:text-neutral-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer">
                            {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}