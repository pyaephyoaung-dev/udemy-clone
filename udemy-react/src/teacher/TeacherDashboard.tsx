import {
    LayoutDashboard,
    PlusCircle,
    FilePlus,
    LogOut,
    ChevronRight,
    Search,
} from 'lucide-react';
import {Link, Outlet} from "react-router-dom";

export default function TeacherDashboard() {
    // Note: I've added active/inactive classes directly to show the UI potential.
    // You can replace these with dynamic template literals when you add routing later.
    const activeLinkClass = "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-white/10 rounded-xl transition-all duration-200 shadow-sm";
    const inactiveLinkClass = "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-indigo-200 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 group";

    return (
        <div className="flex h-screen bg-slate-50/50 font-sans antialiased text-slate-800">

            {/* --- SIDEBAR --- */}
            <aside className="w-66 bg-gradient-to-b from-indigo-950 to-indigo-900 text-white flex flex-col justify-between shadow-2xl border-r border-indigo-950">
                <div>
                    {/* Logo / Brand */}
                    <Link to="/teacher" className="p-6 border-b border-indigo-800/40 flex items-center gap-3.5">
                        <div className="bg-gradient-to-tr from-indigo-500 to-violet-500 text-white h-10 w-10 flex items-center justify-center rounded-xl font-black text-xl tracking-wider shadow-md shadow-indigo-500/20">
                            E
                        </div>
                        <div>
                            <h1 className="font-bold text-base leading-tight tracking-wide text-white">EduStudio</h1>
                            <p className="text-xs font-medium text-indigo-300/80 mt-0.5">Instructor Dashboard</p>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="p-4 space-y-1.5">
                        {/* Example Active Link */}
                        <button className={activeLinkClass}>
                            <LayoutDashboard size={18} className="text-indigo-400" />
                            <span>My Courses</span>
                        </button>

                        <Link to="/teacher/create-course" className={inactiveLinkClass}>
                            <PlusCircle size={18} className="text-indigo-300 group-hover:text-white transition-colors" />
                            <span>Create Course</span>
                        </Link>

                        <button className={inactiveLinkClass}>
                            <FilePlus size={18} className="text-indigo-300 group-hover:text-white transition-colors" />
                            <span>Create Lesson</span>
                        </button>
                    </nav>
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-indigo-800/40 bg-indigo-950/20">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-indigo-300 hover:text-rose-200 rounded-xl hover:bg-rose-500/10 transition-all duration-200 group">
                        <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
                        <span>Back to Student Mode</span>
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 flex flex-col overflow-y-auto">

                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm shadow-slate-100/40">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-slate-400">
                        <span>Instructor</span>
                        <ChevronRight size={14} className="text-slate-300" />
                        <span className="text-indigo-600 font-bold">Overview</span>
                    </div>

                    {/* Search & Profile */}
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search anything..."
                                className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 w-64 transition-all duration-200 shadow-inner"
                            />
                        </div>

                        {/* Profile Indicator */}
                        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 border border-indigo-200/60 flex items-center justify-center font-bold text-indigo-700 text-sm shadow-sm">
                                JD
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-semibold text-slate-700 leading-none">John Doe</p>
                                <p className="text-[11px] font-medium text-slate-400 mt-1">Instructor Account</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Dynamic Views */}
                <div className="p-8 max-w-6xl w-full mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}