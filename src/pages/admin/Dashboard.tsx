import { useStore } from '../../store/useStore';
import { Users, BookOpen, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
  const { users, courses, modules } = useStore();

  const students = users.filter(u => u.role === 'STUDENT');

  const stats = [
    { name: 'Total de Alunos', value: students.length, icon: Users, color: 'bg-blue-500', link: '/admin/alunos' },
    { name: 'Cursos Ativos', value: courses.length, icon: BookOpen, color: 'bg-green-500', link: '/admin/cursos' },
    { name: 'Total de Módulos', value: modules.length, icon: Layers, color: 'bg-purple-500', link: '/admin/cursos' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Visão Geral</h1>
        <p className="text-gray-600 mt-1">Bem-vindo ao painel administrativo da JS Treinamentos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
              <div className={`p-4 rounded-lg ${stat.color} text-white mr-4`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <Link to={stat.link} className="text-sm font-medium text-green-700 hover:underline mt-auto">
                Ver todos
              </Link>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Atalhos Rápidos</h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/admin/alunos" className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-green-600 hover:shadow-sm transition-all group">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-md group-hover:bg-green-100 transition-colors">
                <Users className="h-5 w-5 text-gray-600 group-hover:text-green-700" />
              </div>
              <span className="font-medium text-gray-900">Cadastrar Novo Aluno</span>
            </div>
            <span className="text-gray-400 group-hover:text-green-700">&rarr;</span>
          </Link>
          
          <Link to="/admin/cursos" className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-green-600 hover:shadow-sm transition-all group">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-md group-hover:bg-green-100 transition-colors">
                <BookOpen className="h-5 w-5 text-gray-600 group-hover:text-green-700" />
              </div>
              <span className="font-medium text-gray-900">Gerenciar Cursos</span>
            </div>
            <span className="text-gray-400 group-hover:text-green-700">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
