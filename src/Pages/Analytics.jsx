import { Eye, MousePointerClick, TrendingDown, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const trafficData = [
    { name: "Direct", value: 4000 }, { name: "Organic", value: 3000 }, { name: "Referral", value: 2000 }, { name: "Social", value: 1000 }
];
const COLORS = ["#10b981", "#1C1C1C", "#a8a29e", "#3b82f6"];

const activityData = [
    { name: "00:00", users: 120 }, { name: "04:00", users: 50 }, { name: "08:00", users: 400 },
    { name: "12:00", users: 800 }, { name: "16:00", users: 650 }, { name: "20:00", users: 900 }, { name: "23:59", users: 300 }
];

export default function Analytics() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#1C1C1D] dark:text-white">Analytics</h2>
                <p className="text-sm text-stone-500 dark:text-neutral-500 mt-1">Track website performance and user behavior.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Page Views", value: "124,533", change: "+12.4%", up: true, icon: Eye },
                    { title: "Click Rate", value: "4.5%", change: "-0.2%", up: false, icon: MousePointerClick },
                    { title: "Bounce Rate", value: "34.1%", change: "-5.1%", up: true, icon: TrendingDown },
                    { title: "Avg. Session", value: "4m 32s", change: "+18.2%", up: true, icon: TrendingUp },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-[#0A0A0A] border border-stone-200 dark:border-stone-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-neutral-500">{stat.title}</span>
                            <stat.icon size={16} className="text-stone-400 dark:text-neutral-600" />
                        </div>
                        <p className="text-3xl font-bold text-[#1C1C1D] dark:text-white">{stat.value}</p>
                        <p className={`text-sm font-medium mt-2 ${stat.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>{stat.change}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className="bg-white dark:bg-[#0A0A0A] border border-stone-200 dark:border-stone-800 rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-[#1C1C1D] dark:text-white mb-6">Traffic Sources</h3>
                    <div className="h-[300px] flex items-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={trafficData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value">
                                    {trafficData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="stroke-transparent" />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1C1C1C', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#a8a29e' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Line Chart */}
                <div className="bg-white dark:bg-[#0A0A0A] border border-stone-200 dark:border-stone-800 rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-[#1C1C1D] dark:text-white mb-6">User Activity (24h)</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" className="dark:opacity-20" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a8a29e' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a8a29e' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#1C1C1C', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}