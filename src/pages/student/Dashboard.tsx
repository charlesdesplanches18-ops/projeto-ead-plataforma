import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { BookOpen, CheckCircle, Clock, TrendingUp, Target, Award } from 'lucide-react';

export const StudentDashboard = () => {
  const { currentUser, courses, progress, modules } = useStore();

  if (!currentUser) return null;

  // Filtrar os progressos deste aluno
  const myProgress = progress.filter(p => p.studentId === currentUser.id);
  
  // Pegar APENAS o curso em que ele está matriculado
  const myCourses = currentUser.courseId ? courses.filter(c => c.id === currentUser.courseId) : [];

  // Função auxiliar para calcular progresso
  const getCourseProgress = (courseId: string) => {
    const courseModules = modules.filter(m => m.courseId === courseId);
    const courseProgress = myProgress.find(p => p.courseId === courseId);
    
    if (!courseModules.length) return 0;
    if (!courseProgress) return 0;
    
    return Math.round((courseProgress.completedModuleIds.length / courseModules.length) * 100);
  };

  // Calcular progresso total
  const totalProgress = myCourses.length > 0 
    ? Math.round(myCourses.reduce((sum, course) => sum + getCourseProgress(course.id), 0) / myCourses.length)
    : 0;

  // Calcular módulos completados
  const completedModulesCount = myProgress.reduce((sum, p) => sum + p.completedModuleIds.length, 0);
  const totalModulesCount = myCourses.reduce((sum, course) => {
    return sum + modules.filter(m => m.courseId === course.id).length;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Institutional Banner */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-xl shadow-md overflow-hidden relative">
        <div className="relative z-10 p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Bem-vindo, {currentUser.name}!</h1>
              <p className="text-lg text-green-50 mb-4">
                Portal do Aluno - JS Treinamentos
              </p>
              <p className="text-green-100 text-sm md:text-base">
                Treinamento profissional para operadores de máquinas pesadas, equipamentos industriais e segurança do trabalho.
              </p>
            </div>
            <div className="hidden md:flex bg-white bg-opacity-95 p-6 rounded-xl shadow-lg items-center justify-center flex-col">
              <BookOpen className="h-12 w-12 text-green-600 mb-2" />
              <span className="font-bold text-xl uppercase tracking-tight text-gray-900 text-center">JS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Progresso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <span className="text-2xl font-bold text-green-600">{totalProgress}%</span>
          </div>
          <p className="text-sm font-medium text-gray-600">Progresso Geral</p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${totalProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="h-6 w-6 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">{completedModulesCount}</span>
          </div>
          <p className="text-sm font-medium text-gray-600">Aulas Concluídas</p>
          <p className="text-xs text-gray-500 mt-2">de {totalModulesCount} aulas no total</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Target className="h-6 w-6 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">{myCourses.length}</span>
          </div>
          <p className="text-sm font-medium text-gray-600">Cursos em Andamento</p>
          <p className="text-xs text-gray-500 mt-2">Matriculado e estudando</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900">Meus Cursos</h2>
        <p className="text-gray-600 mt-1">Acompanhe seu progresso e acesse os materiais de estudo.</p>
      </div>

      {myCourses.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Nenhum curso vinculado</h3>
          <p className="text-gray-500 mt-1">Nenhum curso vinculado ao seu cadastro. Entre em contato com o instrutor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourses.map((course) => {
            const progressPercent = getCourseProgress(course.id);
            const isCompleted = progressPercent === 100;
            
            return (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                {course.imageUrl ? (
                  <div className="h-48 w-full bg-gray-200 relative">
                    <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                    {isCompleted && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Concluído
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 w-full bg-green-600 flex items-center justify-center relative">
                    <BookOpen className="h-16 w-16 text-green-700" />
                    {isCompleted && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Concluído
                      </div>
                    )}
                  </div>
                )}
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span className="text-gray-500 font-medium">Progresso</span>
                      <span className="font-bold text-gray-900">{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className={`h-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-green-600'}`} 
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                    
                    <Link 
                      to={`/aluno/curso/${course.id}`}
                      className="w-full block text-center bg-gray-900 text-white py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
                    >
                      Acessar Conteúdo
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
