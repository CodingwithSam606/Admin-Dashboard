import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Moon, Sun } from "lucide-react";

export default function Login({ isDark, setTheme }) {
    // Removed local isDark state, now using global props!
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Used to redirect after login

    const handleSubmit = (e) => {
        e.preventDefault();
        // In the real world, this would hit your .NET Identity API.
        // For now, we just redirect to the dashboard.
        navigate("/dashboard");
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#F9F8F4] dark:bg-[#050505] text-[#1C1C1D] dark:text-white">

            {/* Global Dark Mode Toggle */}
            <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="absolute top-6 right-6 p-2.5 rounded-xl text-stone-500 dark:text-neutral-400 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
                {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>

            {/* Login Card */}
            <div className="w-full max-w-md p-10 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#111] mx-4">
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">✨</div>
                    <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
                    <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Sign in to your dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1C1C1C] text-[#1C1C1D] dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors duration-300 text-sm"
                            placeholder="you@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1C1C1C] text-[#1C1C1D] dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors duration-300 text-sm"
                            placeholder="•••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-[#1C1C1C] dark:bg-white dark:text-black text-white text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-150 cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>
            </div>

            <p className="text-center text-sm text-stone-400 dark:text-stone-600 mt-6">
                Don't have an account?{' '}
                <a href="#" className="text-emerald-600 hover:underline">Contact me</a>
            </p>
        </div>
    );
}