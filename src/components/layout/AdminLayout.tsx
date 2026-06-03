import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { LogOut, Users, BookOpen, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export const AdminLayout = () => {
  const { currentUser, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Alunos', path: '/admin/alunos', icon: Users },
    { name: 'Cursos', path: '/admin/cursos', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out lg:transform-none flex flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-4 bg-gray-950 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-1.5 rounded-md">
              <BookOpen className="h-5 w-5 text-gray-900" />
            </div>
            <span className="font-bold text-lg text-green-600 uppercase tracking-tight">JS Treinamentos</span>
          </div>
          <button className="lg:hidden p-1 text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-green-600 text-gray-900" 
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="mb-4 px-2">
            <p className="text-sm text-gray-400">Logado como</p>
            <p className="font-medium truncate">{currentUser.name}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white shadow-sm flex items-center px-4 lg:px-8 border-b border-gray-200 shrink-0">
          <button 
            className="lg:hidden p-2 mr-4 text-gray-600 hover:bg-gray-100 rounded-md"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            {navLinks.find(l => location.pathname.startsWith(l.path))?.name || 'Painel'}
          </h1>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
