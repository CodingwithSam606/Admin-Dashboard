import { TrendingUp, Users, CreditCard } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// The raw data
const revenueData = [
    { name: "Jan", revenue: 4000 }, { name: "Feb", revenue: 3000 }, { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 4500 }, { name: "May", revenue: 6000 }, { name: "Jun", revenue: 6500 },
    { name: "Jul", revenue: 7000 }, { name: "Aug", revenue: 8200 }, { name: "Sep", revenue: 7800 },
];

const ordersData = [
    { name: "Mon", orders: 40 }, { name: "Tue", orders: 65 }, { name: "Wed", orders: 55 },
    { name: "Thu", orders: 80 }, { name: "Fri", orders: 95 }, { name: "Sat", orders: 60 }, { name: "Sun", orders: 30 },
];

// Calculate the exact totals from the charts above!
const totalRevenue = revenueData.reduce((total, item) => total + item.revenue, 0);
const totalOrders = ordersData.reduce((total, item) => total + item.orders, 0);

const stats = [
    { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: CreditCard, change: "+20.1%", color: "text-emerald-600 dark:text-emerald-400", iconBg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { title: "Active Users", value: "2,350", icon: Users, change: "+180.1%", color: "text-blue-600 dark:text-blue-400", iconBg: "bg-blue-50 dark:bg-blue-500/10" },
    { title: "Total Orders", value: totalOrders.toString(), icon: TrendingUp, change: "+12.5%", color: "text-fuchsia-600 dark:text-fuchsia-400", iconBg: "bg-fuchsia-50 dark:bg-fuchsia-500/10" },
];

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="group bg-white dark:bg-[#0A0A0A] border border-stone-200 dark:border-stone-800 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/50 dark:hover:shadow-black/20 hover:-translate-y-1 cursor-default">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-neutral-500">{stat.title}</span>
                            <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                                <stat.icon size={18} />
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <p className="text-3xl font-bold tracking-tight text-[#1C1C1D] dark:text-white">{stat.value}</p>
                            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{stat.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Revenue Area Chart */}
                <div className="xl:col-span-2 bg-white dark:bg-[#0A0A0A] border border-stone-200 dark:border-stone-800 rounded-2xl p-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-bold tracking-tight text-[#1C1C1D] dark:text-white">Revenue Overview</h2>
                        <p className="text-sm text-stone-500 dark:text-neutral-500 mt-1">Monthly revenue performance</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" className="dark:opacity-20" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a8a29e' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a8a29e' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#1C1C1C', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Orders Bar Chart */}
                <div className="bg-white dark:bg-[#0A0A0A] border border-stone-200 dark:border-stone-800 rounded-2xl p-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-bold tracking-tight text-[#1C1C1D] dark:text-white">Recent Orders</h2>
                        <p className="text-sm text-stone-500 dark:text-neutral-500 mt-1">Daily breakdown</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ordersData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" className="dark:opacity-20" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a8a29e' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a8a29e' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#1C1C1C', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                                <Bar dataKey="orders" fill="#1C1C1C" className="dark:fill-white" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}