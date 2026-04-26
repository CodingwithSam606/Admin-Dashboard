import { useState } from "react";
import { Sun, Moon, Monitor, CheckCircle } from "lucide-react";

export default function Settings({ theme, setTheme }) {
    const [saved, setSaved] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    // Options for the theme selector
    const themeOptions = [
        { id: 'light', label: 'Light', icon: Sun },
        { id: 'system', label: 'System', icon: Monitor },
        { id: 'dark', label: 'Dark', icon: Moon },
    ];

    return (
        <div className="space-y-8 max-w-3xl">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#1C1C1D] dark:text-white">Settings</h2>
                <p className="text-sm text-stone-500 dark:text-neutral-500 mt-1">Manage your account preferences.</p>
            </div>

            {/* Smooth Notification */}
            <div className={`overflow-hidden transition-all duration-500 ease-out ${saved ? 'max-h-20 opacity-100 mb-2' : 'max-h-0 opacity-0'}`}>
                <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-xl text-sm font-medium">
                    <CheckCircle size={16} />
                    Profile saved successfully!
                </div>
            </div>

            <form onSubmit={handleSave}>
                <div className="bg-white dark:bg-[#0A0A0A] border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-400 dark:text-neutral-500">Profile</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-stone-600 dark:text-neutral-400 mb-1">First Name</label>
                            <input type="text" defaultValue="Samuel" className="w-full px-4 py-2.5 bg-stone-50 dark:bg-[#111] border border-stone-200 dark:border-stone-800 rounded-xl text-sm text-[#1C1C1D] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-stone-600 dark:text-neutral-400 mb-1">Last Name</label>
                            <input type="text" defaultValue="Admin" className="w-full px-4 py-2.5 bg-stone-50 dark:bg-[#111] border border-stone-200 dark:border-stone-800 rounded-xl text-sm text-[#1C1C1D] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-600 dark:text-neutral-400 mb-1">Email</label>
                        <input type="email" defaultValue="sam@samadmin.com" className="w-full px-4 py-2.5 bg-stone-50 dark:bg-[#111] border border-stone-200 dark:border-stone-800 rounded-xl text-sm text-[#1C1C1D] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                </div>

                <div className="bg-white dark:bg-[#0A0A0A] border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-6 mt-6">
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-400 dark:text-neutral-500">Appearance</h3>
                        <p className="text-xs text-stone-500 dark:text-neutral-500 mt-1">Select your preferred theme for the dashboard.</p>
                    </div>

                    {/* The 3-Way Theme Picker */}
                    <div className="grid grid-cols-3 gap-3">
                        {themeOptions.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => setTheme(option.id)} // Instantly applies the theme!
                                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${theme === option.id
                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-600 dark:text-neutral-400'
                                    }`}
                            >
                                <option.icon size={20} />
                                <span className="text-xs font-semibold">{option.label}</span>
                                {theme === option.id && <CheckCircle size={14} className="text-emerald-500" />}
                            </button>
                        ))}
                    </div>
                </div>

                <button type="submit" className="mt-6 bg-[#1C1C1C] dark:bg-white text-white dark:text-black text-sm font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity cursor-pointer">
                    Save Changes
                </button>
            </form>
        </div>
    );
}