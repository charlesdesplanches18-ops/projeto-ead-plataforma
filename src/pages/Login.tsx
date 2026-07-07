import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { HardHat, Lock, User as UserIcon } from 'lucide-react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, currentUser } = useStore();
  const navigate = useNavigate();

  // Se já estiver logado, redireciona
  if (currentUser) {
    if (currentUser.role === 'ADMIN') navigate('/admin/dashboard');
    else navigate('/aluno/dashboard');
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(username, password)) {
      const user = useStore.getState().currentUser;
      if (user?.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/aluno/dashboard');
      }
    } else {
      setError('Usuário ou senha incorretos.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-green-600 rounded-full blur-3xl mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-green-700 rounded-full blur-3xl mix-blend-screen"></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden relative z-10">
        <div className="bg-white p-8 text-center border-b border-gray-100">
          <h1 className="text-3xl font-bold text-green-700 uppercase tracking-tight mb-2">JS Treinamentos</h1>
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Plataforma de Apoio</h2>
          <p className="text-gray-500 mt-1 font-medium text-sm">Acesso exclusivo para alunos e instrutores</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuário
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600 bg-gray-50 text-gray-900"
                  placeholder="Seu usuário de acesso"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600 bg-gray-50 text-gray-900"
                  placeholder="Sua senha"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors"
            >
              Entrar na Plataforma
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Precisa de acesso? Fale com seu instrutor.</p>
            <p className="mt-2 text-xs">Admin: 1234 / 123 | Aluno: 123 / 1234</p>
          </div>
        </div>
      </div>
    </div>
  );
};
