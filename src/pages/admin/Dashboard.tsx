import { useStore } from '../../store/useStore';
import { Users, BookOpen, Layers, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
  const { users, courses, modules, progress } = useStore();

  const students = users.filter(u => u.role === 'STUDENT');
  const activeStudents = students.filter(u => progress.some(p => p.studentId === u.id));
  
  const totalProgress = progress.length > 0 
    ? Math.round(progress.reduce((sum, p) => sum + (p.completedModuleIds.length / (modules.filter(m => m.courseId === p.courseId).length || 1)), 0) / progress.length * 100)
    : 0;

  const stats = [
    { name: 'Total de Alunos', value: students.length, icon: Users, color: 'bg-blue-500', link: '/admin/alunos', subtitle: `${activeStudents.length} ativos` },
    { name: 'Cursos Ativos', value: courses.length, icon: BookOpen, color: 'bg-green-500', link: '/admin/cursos', subtitle: 'Disponíveis' },
    { name: 'Total de Módulos', value: modules.length, icon: Layers, color: 'bg-purple-500', link: '/admin/cursos', subtitle: 'Conteúdos' },
  ];

  return (
    <div className="space-y-6">
      {/* Header com banner institucional */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-xl shadow-md p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-green-100">Bem-vindo ao sistema de gestão de treinamentos JS Treinamentos</p>
          </div>
          <div className="hidden md:block text-6xl opacity-20">📊</div>
        </div>
      </div>

      {/* Cards de Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.name} to={stat.link}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-green-300 transition-all cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {stat.subtitle}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Card de Progresso Geral */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-bold text-gray-900">Progresso Geral da Plataforma</h2>
          </div>
          <span className="text-2xl font-bold text-green-600">{totalProgress}%</span>
        </div>
        <div className="p-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Conclusão média dos alunos</span>
              <span className="font-semibold text-gray-900">{totalProgress}% completo</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-600 to-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {progress.length} alunos em progresso em {courses.length} cursos diferentes
          </p>
        </div>
      </div>

      {/* Atalhos Rápidos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
          <Award className="h-5 w-5 text-green-600" />
          <h2 className="text-lg font-bold text-gray-900">Atalhos Rápidos</h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/admin/alunos" className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-green-600 hover:shadow-sm hover:bg-green-50 transition-all group">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-md group-hover:bg-green-200 transition-colors">
                <Users className="h-5 w-5 text-blue-600 group-hover:text-green-700" />
              </div>
              <div>
                <span className="font-medium text-gray-900 block">Gerenciar Alunos</span>
                <span className="text-xs text-gray-500">Adicionar e editar alunos</span>
              </div>
            </div>
            <span className="text-gray-400 group-hover:text-green-700">&rarr;</span>
          </Link>
          
          <Link to="/admin/cursos" className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-green-600 hover:shadow-sm hover:bg-green-50 transition-all group">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-md group-hover:bg-green-200 transition-colors">
                <BookOpen className="h-5 w-5 text-green-600 group-hover:text-green-700" />
              </div>
              <div>
                <span className="font-medium text-gray-900 block">Gerenciar Cursos</span>
                <span className="text-xs text-gray-500">Criar e editar conteúdos</span>
              </div>
            </div>
            <span className="text-gray-400 group-hover:text-green-700">&rarr;</span>
          </Link>

          <Link to="/admin/cursos" className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-green-600 hover:shadow-sm hover:bg-green-50 transition-all group">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-md group-hover:bg-green-200 transition-colors">
                <Layers className="h-5 w-5 text-purple-600 group-hover:text-green-700" />
              </div>
              <div>
                <span className="font-medium text-gray-900 block">Gerenciar Módulos</span>
                <span className="text-xs text-gray-500">Organizar aulas e conteúdo</span>
              </div>
            </div>
            <span className="text-gray-400 group-hover:text-green-700">&rarr;</span>
          </Link>

          <Link to="/admin/alunos" className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-green-600 hover:shadow-sm hover:bg-green-50 transition-all group">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-md group-hover:bg-green-200 transition-colors">
                <TrendingUp className="h-5 w-5 text-amber-600 group-hover:text-green-700" />
              </div>
              <div>
                <span className="font-medium text-gray-900 block">Acompanhar Progresso</span>
                <span className="text-xs text-gray-500">Ver desempenho dos alunos</span>
              </div>
            </div>
            <span className="text-gray-400 group-hover:text-green-700">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
