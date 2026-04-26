import { useState } from "react";
import { Search, Trash2, Edit3, Check, X } from "lucide-react";

const initialUsers = [
    { id: 1, name: "Olivia Martin", email: "olivia@email.com", role: "Admin", status: "Active", amount: "$1,999.00" },
    { id: 2, name: "Jackson Lee", email: "jackson@email.com", role: "Editor", status: "Active", amount: "$39.00" },
    { id: 3, name: "Isabella Nguyen", email: "isabella@email.com", role: "User", status: "Inactive", amount: "$299.00" },
];

export default function UsersPage() {
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");

    // States for Adding and Editing
    const [isAdding, setIsAdding] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "User", status: "Active", amount: "$0.00" });

    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleAdd = () => {
        if (!newUser.name || !newUser.email) return alert("Please fill out name and email");
        setUsers([{ id: Date.now(), ...newUser }, ...users]);
        setNewUser({ name: "", email: "", role: "User", status: "Active", amount: "$0.00" });
        setIsAdding(false);
    };

    const handleSaveEdit = () => {
        setUsers(users.map(u => u.id === editingId ? editData : u));
        setEditingId(null);
    };

    const handleDelete = (id) => {
        setUsers(users.filter(u => u.id !== id));
    };

    // Reusable Input Style
    const inputStyle = "w-full px-2 py-1 bg-stone-50 dark:bg-[#111] border border-stone-200 dark:border-stone-700 rounded-lg text-sm text-[#1C1C1D] dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500";

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-[#1C1C1D] dark:text-white">Users</h2>
                    <p className="text-sm text-stone-500 dark:text-neutral-500 mt-1">Manage your team members.</p>
                </div>
                <button onClick={() => setIsAdding(true)} className="bg-[#1C1C1C] dark:bg-white text-white dark:text-black text-sm font-medium px-4 py-2 rounded-xl hover:opacity-90 transition-opacity cursor-pointer w-fit">
                    + Add User
                </button>
            </div>

            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-neutral-500" size={16} />
                <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0A0A0A] border border-stone-200 dark:border-stone-800 rounded-xl text-sm text-[#1C1C1D] dark:text-white placeholder-stone-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
            </div>

            <div className="bg-white dark:bg-[#0A0A0A] border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-stone-100 dark:border-stone-800/50">
                                <th className="px-6 py-4 text-xs font-medium text-stone-500 dark:text-neutral-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-medium text-stone-500 dark:text-neutral-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-medium text-stone-500 dark:text-neutral-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-medium text-stone-500 dark:text-neutral-500 uppercase tracking-wider text-right">Spent</th>
                                <th className="px-6 py-4 w-24"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* INLINE ADD ROW */}
                            {isAdding && (
                                <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-white/[0.02]">
                                    <td className="px-6 py-3 space-y-2">
                                        <input value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} placeholder="Name" className={inputStyle} />
                                        <input value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} placeholder="Email" className={inputStyle} />
                                    </td>
                                    <td className="px-6 py-3"><input value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} className={inputStyle} /></td>
                                    <td className="px-6 py-3"><input value={newUser.status} onChange={e => setNewUser({ ...newUser, status: e.target.value })} className={inputStyle} /></td>
                                    <td className="px-6 py-3"><input value={newUser.amount} onChange={e => setNewUser({ ...newUser, amount: e.target.value })} className={`${inputStyle} text-right`} /></td>
                                    <td className="px-6 py-3 text-right space-x-1">
                                        <button onClick={handleAdd} className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg cursor-pointer"><Check size={16} /></button>
                                        <button onClick={() => setIsAdding(false)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg cursor-pointer"><X size={16} /></button>
                                    </td>
                                </tr>
                            )}

                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-stone-50 dark:border-stone-800/30 last:border-0 hover:bg-stone-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                    {editingId === user.id ? (
                                        // INLINE EDIT MODE
                                        <>
                                            <td className="px-6 py-3 space-y-2">
                                                <input value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} className={inputStyle} />
                                                <input value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} className={inputStyle} />
                                            </td>
                                            <td className="px-6 py-3"><input value={editData.role} onChange={e => setEditData({ ...editData, role: e.target.value })} className={inputStyle} /></td>
                                            <td className="px-6 py-3"><input value={editData.status} onChange={e => setEditData({ ...editData, status: e.target.value })} className={inputStyle} /></td>
                                            <td className="px-6 py-3"><input value={editData.amount} onChange={e => setEditData({ ...editData, amount: e.target.value })} className={`${inputStyle} text-right`} /></td>
                                            <td className="px-6 py-3 text-right space-x-1">
                                                <button onClick={handleSaveEdit} className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg cursor-pointer"><Check size={16} /></button>
                                                <button onClick={() => setEditingId(null)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg cursor-pointer"><X size={16} /></button>
                                            </td>
                                        </>
                                    ) : (
                                        // NORMAL VIEW MODE
                                        <>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-xs font-bold text-stone-500 dark:text-stone-300">{user.name.split(' ').map(n => n[0]).join('')}</div>
                                                    <div>
                                                        <p className="text-sm font-medium text-[#1C1C1D] dark:text-white">{user.name}</p>
                                                        <p className="text-xs text-stone-400 dark:text-neutral-500">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-stone-600 dark:text-neutral-400">{user.role}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-neutral-400'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-stone-400'}`} />{user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-[#1C1C1D] dark:text-white text-right">{user.amount}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button onClick={() => { setEditingId(user.id); setEditData(user); }} className="p-1.5 text-stone-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"><Edit3 size={14} /></button>
                                                    <button onClick={() => handleDelete(user.id)} className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"><Trash2 size={14} /></button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}