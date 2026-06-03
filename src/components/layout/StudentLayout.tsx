import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { LogOut, UserCircle, Menu, BookOpen } from 'lucide-react';
import { useState } from 'react';

export const StudentLayout = () => {
  const { currentUser, logout } = useStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!currentUser || currentUser.role !== 'STUDENT') {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b border-gray-200 text-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-green-600 p-2 rounded-md">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl uppercase tracking-tight text-gray-900 hidden sm:inline-block">JS Treinamentos</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <UserCircle className="h-5 w-5" />
                <span>Olá, {currentUser.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-gray-600">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-50 px-4 py-3 space-y-3 border-t border-gray-200">
            <div className="flex items-center gap-2 font-medium text-gray-700">
              <UserCircle className="h-5 w-5" />
              <span>Olá, {currentUser.name}</span>
            </div>
            <Link to="/aluno/dashboard" className="block font-medium text-gray-600 hover:text-green-700">Dashboard</Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 font-medium text-gray-600 hover:text-green-700 w-full text-left"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-gray-400 py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} JS Treinamentos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};
